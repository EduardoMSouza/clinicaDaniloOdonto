package consultorio.domain.service;

import consultorio.api.dto.mapper.DentistaMapper;
import consultorio.api.dto.request.DentistaRequest;
import consultorio.api.dto.response.DentistaResponse;
import consultorio.domain.entity.Dentista;
import consultorio.domain.entity.HorarioTrabalho;
import consultorio.domain.entity.enums.StatusAgendamento;
import consultorio.domain.repository.AgendamentoRepository;
import consultorio.domain.repository.DentistaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.*;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DentistaService {

    private final DentistaRepository dentistaRepository;
    private final AgendamentoRepository agendamentoRepository;
    private final DentistaMapper dentistaMapper;

    private static final int DURACAO_PADRAO_MINUTOS = 30;

    // ====================== CREATE ======================
    @Transactional
    public DentistaResponse create(DentistaRequest request) {

        validarUnicidade(request.getCro(), request.getEmail(), null);

        Dentista dentista = dentistaMapper.toEntity(request);
        Dentista saved = dentistaRepository.save(dentista);

        //horarios padrão automatico
        configurarHorarioPadrao(saved.getId());

        //retorna com horarios já preenchidos
        return dentistaMapper.toEntityResponse(
                dentistaRepository.findById(saved.getId()).orElseThrow()
        );
    }

    // ====================== READ ======================
    @Transactional(readOnly = true)
    public List<DentistaResponse> findAll() {
        return dentistaMapper.toEntityResponseList(dentistaRepository.findAll());
    }

    @Transactional(readOnly = true)
    public DentistaResponse findById(Long id) {
        Dentista dentista = findDentistaOrThrow(id);
        return dentistaMapper.toEntityResponse(dentista);
    }

    @Transactional(readOnly = true)
    public DentistaResponse findByCro(String cro) {
        Dentista dentista = dentistaRepository.findByCro(cro)
                .orElseThrow(() -> new RuntimeException("Dentista não encontrado com CRO: " + cro));
        return dentistaMapper.toEntityResponse(dentista);
    }

    @Transactional(readOnly = true)
    public DentistaResponse findByEmail(String email) {
        Dentista dentista = dentistaRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Dentista não encontrado com email: " + email));
        return dentistaMapper.toEntityResponse(dentista);
    }

    @Transactional(readOnly = true)
    public List<DentistaResponse> findByStatus(Boolean ativo) {
        return ativo ?
                dentistaMapper.toEntityResponseList(dentistaRepository.findByAtivoTrue()) :
                dentistaMapper.toEntityResponseList(dentistaRepository.findByAtivoFalse());
    }

    @Transactional(readOnly = true)
    public List<DentistaResponse> findByEspecialidade(String especialidade) {
        return dentistaMapper.toEntityResponseList(
                dentistaRepository.findByEspecialidadeContainingIgnoreCase(especialidade));
    }

    @Transactional(readOnly = true)
    public List<DentistaResponse> findByNomeContaining(String nome) {
        return dentistaMapper.toEntityResponseList(
                dentistaRepository.findByNomeContainingIgnoreCaseAndAtivo(nome));
    }

    @Transactional(readOnly = true)
    public boolean existsByCro(String cro) {
        return dentistaRepository.existsByCro(cro);
    }

    @Transactional(readOnly = true)
    public boolean existsByEmail(String email) {
        return dentistaRepository.existsByEmail(email);
    }

    // ====================== UPDATE ======================
    @Transactional
    public DentistaResponse update(Long id, DentistaRequest request) {
        Dentista dentista = findDentistaOrThrow(id);
        validarUnicidade(request.getCro(), request.getEmail(), id);

        dentistaMapper.updateFromRequest(request, dentista);
        Dentista updated = dentistaRepository.save(dentista);
        return dentistaMapper.toEntityResponse(updated);
    }

    // ====================== STATUS ======================
    @Transactional
    public DentistaResponse activate(Long id) {
        Dentista dentista = findDentistaOrThrow(id);
        dentista.setAtivo(true);
        return dentistaMapper.toEntityResponse(dentistaRepository.save(dentista));
    }

    @Transactional
    public DentistaResponse inactivate(Long id) {
        Dentista dentista = findDentistaOrThrow(id);
        if (temAgendamentosFuturos(dentista)) {
            throw new RuntimeException("Não é possível inativar dentista com agendamentos futuros");
        }
        dentista.setAtivo(false);
        return dentistaMapper.toEntityResponse(dentistaRepository.save(dentista));
    }

    // ====================== DELETE ======================
    @Transactional
    public void delete(Long id) {
        Dentista dentista = findDentistaOrThrow(id);
        if (temAgendamentosFuturos(dentista)) {
            throw new RuntimeException("Não é possível excluir dentista com agendamentos futuros");
        }
        dentistaRepository.delete(dentista);
    }

    // ====================== HORÁRIOS ======================
    @Transactional
    public void configurarHorarioPadrao(Long dentistaId) {
        Dentista dentista = findDentistaOrThrow(dentistaId);

        List<HorarioTrabalho> horariosPadrao = List.of(
                criarHorario(DayOfWeek.MONDAY, LocalTime.of(9,0), LocalTime.of(12,0), LocalTime.of(14,0), LocalTime.of(18,0)),
                criarHorario(DayOfWeek.TUESDAY, LocalTime.of(9,0), LocalTime.of(12,0), LocalTime.of(14,0), LocalTime.of(18,0)),
                criarHorario(DayOfWeek.WEDNESDAY, LocalTime.of(9,0), LocalTime.of(12,0), LocalTime.of(14,0), LocalTime.of(18,0)),
                criarHorario(DayOfWeek.THURSDAY, LocalTime.of(9,0), LocalTime.of(12,0), LocalTime.of(14,0), LocalTime.of(18,0)),
                criarHorario(DayOfWeek.FRIDAY, LocalTime.of(9,0), LocalTime.of(12,0), LocalTime.of(14,0), LocalTime.of(18,0)),
                criarHorario(DayOfWeek.SATURDAY, LocalTime.of(8,0), LocalTime.of(12,0), null, null)
        );

        dentista.getHorarios().clear();
        dentista.getHorarios().addAll(horariosPadrao);
        dentistaRepository.save(dentista);
    }

    @Transactional
    public void atualizarHorarioDia(Long dentistaId, DayOfWeek diaSemana,
                                    LocalTime inicioManha, LocalTime fimManha,
                                    LocalTime inicioTarde, LocalTime fimTarde) {
        Dentista dentista = findDentistaOrThrow(dentistaId);

        HorarioTrabalho horario = dentista.getHorarios().stream()
                .filter(h -> h.getDiaSemana() == diaSemana)
                .findFirst()
                .orElseGet(() -> {
                    HorarioTrabalho novo = new HorarioTrabalho();
                    novo.setDiaSemana(diaSemana);
                    dentista.getHorarios().add(novo);
                    return novo;
                });

        horario.setHoraInicioManha(inicioManha);
        horario.setHoraFimManha(fimManha);
        horario.setHoraInicioTarde(inicioTarde);
        horario.setHoraFimTarde(fimTarde);
        horario.setAtivo(inicioManha != null || inicioTarde != null);

        dentistaRepository.save(dentista);
    }

    @Transactional(readOnly = true)
    public List<LocalDateTime> consultarHorariosDisponiveis(Long dentistaId, LocalDate data) {
        Dentista dentista = findDentistaOrThrow(dentistaId);
        DayOfWeek dia = data.getDayOfWeek();

        HorarioTrabalho horario = dentista.getHorarios().stream()
                .filter(h -> h.getDiaSemana() == dia && h.getAtivo())
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Dentista não atende neste dia: " + dia));

        List<LocalDateTime> slots = new ArrayList<>();

        // Manhã
        if (horario.getHoraInicioManha() != null && horario.getHoraFimManha() != null) {
            slots.addAll(gerarSlotsDoTurno(dentistaId, data, horario.getHoraInicioManha(), horario.getHoraFimManha()));
        }

        // Tarde
        if (horario.getHoraInicioTarde() != null && horario.getHoraFimTarde() != null) {
            slots.addAll(gerarSlotsDoTurno(dentistaId, data, horario.getHoraInicioTarde(), horario.getHoraFimTarde()));
        }

        return slots;
    }

    private List<LocalDateTime> gerarSlotsDoTurno(Long dentistaId, LocalDate data, LocalTime inicio, LocalTime fim) {
        List<LocalDateTime> slots = new ArrayList<>();
        LocalTime atual = inicio;

        while (!atual.plusMinutes(DURACAO_PADRAO_MINUTOS).isAfter(fim)) {
            LocalDateTime slot = LocalDateTime.of(data, atual);

            boolean ocupado = agendamentoRepository.existsConflitoHorario(
                    dentistaId,
                    slot,
                    slot.plusMinutes(DURACAO_PADRAO_MINUTOS),
                    List.of(StatusAgendamento.AGENDADO, StatusAgendamento.CONFIRMADO, StatusAgendamento.EM_ATENDIMENTO),
                    null
            );

            if (!ocupado) {
                slots.add(slot);
            }

            atual = atual.plusMinutes(DURACAO_PADRAO_MINUTOS);
        }
        return slots;
    }

    private HorarioTrabalho criarHorario(DayOfWeek dia, LocalTime im, LocalTime fm, LocalTime it, LocalTime ft) {
        HorarioTrabalho h = new HorarioTrabalho();
        h.setDiaSemana(dia);
        h.setHoraInicioManha(im);
        h.setHoraFimManha(fm);
        h.setHoraInicioTarde(it);
        h.setHoraFimTarde(ft);
        h.setAtivo(true);
        return h;
    }

    // ====================== UTILITÁRIOS ======================
    private Dentista findDentistaOrThrow(Long id) {
        return dentistaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Dentista não encontrado com id: " + id));
    }

    private void validarUnicidade(String cro, String email, Long excluirId) {
        if (cro != null && !cro.isBlank()) {
            boolean existe = (excluirId == null)
                    ? dentistaRepository.existsByCro(cro)
                    : dentistaRepository.existsByCroAndIdNot(cro, excluirId);
            if (existe) throw new RuntimeException("CRO já cadastrado: " + cro);
        }

        if (email != null && !email.isBlank()) {
            boolean existe = (excluirId == null)
                    ? dentistaRepository.existsByEmail(email)
                    : dentistaRepository.existsByEmailAndIdNot(email, excluirId);
            if (existe) throw new RuntimeException("Email já cadastrado: " + email);
        }
    }

    private boolean temAgendamentosFuturos(Dentista dentista) {
        return agendamentoRepository.existsAgendamentoFuturo(
                dentista.getId(),
                LocalDateTime.now(),
                List.of(StatusAgendamento.AGENDADO, StatusAgendamento.CONFIRMADO, StatusAgendamento.EM_ATENDIMENTO)
        );
    }
}