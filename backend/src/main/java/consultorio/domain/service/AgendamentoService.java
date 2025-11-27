package consultorio.domain.service;

import consultorio.api.dto.mapper.AgendamentoMapper;
import consultorio.api.dto.request.AgendamentoRequest;
import consultorio.api.dto.response.AgendamentoResponse;
import consultorio.domain.entity.Agendamento;
import consultorio.domain.entity.Dentista;
import consultorio.domain.entity.HorarioTrabalho;
import consultorio.domain.entity.Paciente;
import consultorio.domain.entity.enums.StatusAgendamento;
import consultorio.domain.repository.AgendamentoRepository;
import consultorio.domain.repository.DentistaRepository;
import consultorio.domain.repository.PacienteRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.*;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AgendamentoService {

    private final AgendamentoRepository agendamentoRepository;
    private final PacienteRepository pacienteRepository;
    private final DentistaRepository dentistaRepository;
    private final AgendamentoMapper agendamentoMapper;
    private final DentistaService dentistaService;

    private final List<StatusAgendamento> STATUS_ATIVOS = Arrays.asList(
            StatusAgendamento.AGENDADO,
            StatusAgendamento.CONFIRMADO,
            StatusAgendamento.EM_ATENDIMENTO
    );

    private static final Integer DURACAO_PADRAO_MINUTOS = 30;

    // ====================== CREATE ======================
    @Transactional
    public AgendamentoResponse create(AgendamentoRequest request) {
        Paciente paciente = pacienteRepository.findById(request.getPacienteId())
                .orElseThrow(() -> new RuntimeException("Paciente não encontrado"));

        Dentista dentista = dentistaRepository.findById(request.getDentistaId())
                .orElseThrow(() -> new RuntimeException("Dentista não encontrado"));

        validarDataAgendamento(request.getDataHora());
        validarHorarioTrabalhoDentista(dentista, request.getDataHora());
        validarConflitoHorario(dentista.getId(), request.getDataHora(), null);

        Agendamento agendamento = Agendamento.criarAgendamento(
                paciente, dentista, request.getDataHora(), request.getProcedimento()
        );

        if (request.getDuracaoMinutos() != null && request.getDuracaoMinutos() > 0) {
            agendamento.setDuracaoMinutos(request.getDuracaoMinutos());
        } else {
            agendamento.setDuracaoMinutos(DURACAO_PADRAO_MINUTOS);
        }

        if (request.getObservacoes() != null) {
            agendamento.setObservacoes(request.getObservacoes());
        }

        agendamento.calcularCampos(); // calcula dataHoraFim

        Agendamento saved = agendamentoRepository.save(agendamento);
        return agendamentoMapper.toEntityResponse(saved);
    }

    // ====================== READ ======================
    private Agendamento findByIdOrThrow(Long id) {
        return agendamentoRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Agendamento não encontrado: " + id));
    }

    @Transactional(readOnly = true)
    public AgendamentoResponse findById(Long id) {
        return agendamentoMapper.toEntityResponse(findByIdOrThrow(id));
    }

    @Transactional(readOnly = true)
    public List<AgendamentoResponse> findAll() {
        return agendamentoMapper.toEntityResponseList(agendamentoRepository.findAll());
    }

    @Transactional(readOnly = true)
    public List<AgendamentoResponse> findByDentista(Long dentistaId) {
        return agendamentoMapper.toEntityResponseList(agendamentoRepository.findByDentistaId(dentistaId));
    }

    @Transactional(readOnly = true)
    public List<AgendamentoResponse> findByPaciente(Long pacienteId) {
        return agendamentoMapper.toEntityResponseList(agendamentoRepository.findByPacienteId(pacienteId));
    }

    // CORRIGIDO: usa início e fim do dia
    @Transactional(readOnly = true)
    public List<AgendamentoResponse> findByData(LocalDate data) {
        LocalDateTime inicio = data.atStartOfDay();
        LocalDateTime fim = data.plusDays(1).atStartOfDay();
        return agendamentoMapper.toEntityResponseList(
                agendamentoRepository.findByData(inicio, fim)
        );
    }

    // CORRIGIDO
    @Transactional(readOnly = true)
    public List<AgendamentoResponse> findByDentistaAndData(Long dentistaId, LocalDate data) {
        LocalDateTime inicio = data.atStartOfDay();
        LocalDateTime fim = data.plusDays(1).atStartOfDay();

        List<Agendamento> agendamentos = agendamentoRepository.findByDentistaIdAndData(dentistaId, inicio, fim);

        return agendamentoMapper.toEntityResponseList(agendamentos);
    }

    @Transactional(readOnly = true)
    public List<AgendamentoResponse> findByPeriodo(LocalDateTime inicio, LocalDateTime fim) {
        validarPeriodoConsulta(inicio, fim);
        return agendamentoMapper.toEntityResponseList(
                agendamentoRepository.findByDataHoraBetween(inicio, fim)
        );
    }

    @Transactional(readOnly = true)
    public List<AgendamentoResponse> findByDentistaAndPeriodo(Long dentistaId, LocalDateTime inicio, LocalDateTime fim) {
        validarPeriodoConsulta(inicio, fim);
        return agendamentoMapper.toEntityResponseList(
                agendamentoRepository.findByDentistaIdAndDataHoraBetween(dentistaId, inicio, fim)
        );
    }

    // ====================== UPDATE ======================
    @Transactional
    public AgendamentoResponse update(Long id, AgendamentoRequest request) {
        Agendamento agendamento = findByIdOrThrow(id);

        Paciente paciente = pacienteRepository.findById(request.getPacienteId())
                .orElseThrow(() -> new RuntimeException("Paciente não encontrado"));

        Dentista dentista = dentistaRepository.findById(request.getDentistaId())
                .orElseThrow(() -> new RuntimeException("Dentista não encontrado"));

        if (!dentista.getAtivo()) {
            throw new RuntimeException("Dentista não está ativo");
        }

        validarDataAgendamento(request.getDataHora());
        validarHorarioTrabalhoDentista(dentista, request.getDataHora());
        validarConflitoHorario(dentista.getId(), request.getDataHora(), id);

        agendamento.setPaciente(paciente);
        agendamento.setDentista(dentista);
        agendamento.setDataHora(request.getDataHora());
        agendamento.setProcedimento(request.getProcedimento());
        agendamento.setObservacoes(request.getObservacoes());

        if (request.getDuracaoMinutos() != null && request.getDuracaoMinutos() > 0) {
            agendamento.setDuracaoMinutos(request.getDuracaoMinutos());
        }

        agendamento.calcularCampos(); // recalcula dataHoraFim

        return agendamentoMapper.toEntityResponse(agendamentoRepository.save(agendamento));
    }

    // ====================== STATUS ======================
    @Transactional
    public AgendamentoResponse updateStatus(Long id, StatusAgendamento status) {
        Agendamento agendamento = findByIdOrThrow(id);
        agendamento.setStatus(status);
        return agendamentoMapper.toEntityResponse(agendamentoRepository.save(agendamento));
    }

    public AgendamentoResponse confirmar(Long id) { return updateStatus(id, StatusAgendamento.CONFIRMADO); }
    public AgendamentoResponse cancelar(Long id) { return updateStatus(id, StatusAgendamento.CANCELADO); }
    public AgendamentoResponse emAtendimento(Long id) { return updateStatus(id, StatusAgendamento.EM_ATENDIMENTO); }
    public AgendamentoResponse finalizar(Long id) { return updateStatus(id, StatusAgendamento.CONCLUIDO); }

    // ====================== CONSULTAS ESPECIAIS ======================
    @Transactional(readOnly = true)
    public List<AgendamentoResponse> findAgendamentosHoje() {
        return findByData(LocalDate.now());
    }

    @Transactional(readOnly = true)
    public List<AgendamentoResponse> findProximosAgendamentos() {
        return agendamentoMapper.toEntityResponseList(
                agendamentoRepository.findProximosAgendamentos(LocalDateTime.now(), STATUS_ATIVOS)
        );
    }

    @Transactional(readOnly = true)
    public List<AgendamentoResponse> findAgendamentosDoDentistaHoje(Long dentistaId) {
        LocalDateTime inicio = LocalDate.now().atStartOfDay();
        LocalDateTime fim = LocalDate.now().plusDays(1).atStartOfDay();
        return agendamentoMapper.toEntityResponseList(
                agendamentoRepository.findAgendamentosHoje(dentistaId, inicio, fim, STATUS_ATIVOS)
        );
    }

    // ====================== HORÁRIOS DISPONÍVEIS ======================
    @Transactional(readOnly = true)
    public List<LocalDateTime> consultarHorariosDisponiveis(Long dentistaId, LocalDate data) {
        Dentista dentista = dentistaRepository.findById(dentistaId)
                .orElseThrow(() -> new RuntimeException("Dentista não encontrado"));

        DayOfWeek dia = data.getDayOfWeek();
        HorarioTrabalho horario = dentista.getHorarios().stream()
                .filter(h -> h.getDiaSemana() == dia && h.getAtivo())
                .findFirst()
                .orElse(null);

        if (horario == null) return List.of();

        return gerarSlotsDisponiveis(dentistaId, data, horario);
    }

    // ====================== VALIDAÇÕES ======================
    private void validarDataAgendamento(LocalDateTime dataHora) {
        if (dataHora.isBefore(LocalDateTime.now().plusHours(1))) {
            throw new RuntimeException("Agendamento deve ter pelo menos 1 hora de antecedência");
        }
    }

    private void validarPeriodoConsulta(LocalDateTime inicio, LocalDateTime fim) {
        if (inicio.isAfter(fim)) throw new RuntimeException("Data inicial deve ser anterior à final");
        if (Duration.between(inicio, fim).toDays() > 90) {
            throw new RuntimeException("Período não pode exceder 3 meses");
        }
    }

    private void validarHorarioTrabalhoDentista(Dentista dentista, LocalDateTime dataHora) {
        if (!isDentistaDisponivelNoHorario(dentista, dataHora)) {
            throw new RuntimeException("Dentista não atende neste horário");
        }
    }

    private void validarConflitoHorario(Long dentistaId, LocalDateTime inicio, Long excluirId) {
        int duracao = DURACAO_PADRAO_MINUTOS;
        LocalDateTime fim = inicio.plusMinutes(duracao);

        if (agendamentoRepository.existsConflitoHorario(dentistaId, inicio, fim, STATUS_ATIVOS, excluirId)) {
            throw new RuntimeException("Conflito de horário: já existe agendamento neste período");
        }
    }

    private boolean isDentistaDisponivelNoHorario(Dentista dentista, LocalDateTime dataHora) {
        DayOfWeek dia = dataHora.getDayOfWeek();
        LocalTime hora = dataHora.toLocalTime();

        return dentista.getHorarios().stream()
                .filter(h -> h.getDiaSemana() == dia && h.getAtivo())
                .anyMatch(h -> {
                    boolean manha = h.getHoraInicioManha() != null && h.getHoraFimManha() != null &&
                            !hora.isBefore(h.getHoraInicioManha()) && hora.isBefore(h.getHoraFimManha());
                    boolean tarde = h.getHoraInicioTarde() != null && h.getHoraFimTarde() != null &&
                            !hora.isBefore(h.getHoraInicioTarde()) && hora.isBefore(h.getHoraFimTarde());
                    return manha || tarde;
                });
    }

    private List<LocalDateTime> gerarSlotsDisponiveis(Long dentistaId, LocalDate data, HorarioTrabalho horario) {
        List<LocalDateTime> slots = new ArrayList<>();

        if (horario.getHoraInicioManha() != null && horario.getHoraFimManha() != null) {
            slots.addAll(gerarSlotsTurno(dentistaId, data, horario.getHoraInicioManha(), horario.getHoraFimManha()));
        }
        if (horario.getHoraInicioTarde() != null && horario.getHoraFimTarde() != null) {
            slots.addAll(gerarSlotsTurno(dentistaId, data, horario.getHoraInicioTarde(), horario.getHoraFimTarde()));
        }

        return slots;
    }

    private List<LocalDateTime> gerarSlotsTurno(Long dentistaId, LocalDate data, LocalTime inicio, LocalTime fim) {
        List<LocalDateTime> slots = new ArrayList<>();
        LocalTime atual = inicio;

        while (!atual.plusMinutes(DURACAO_PADRAO_MINUTOS).isAfter(fim)) {
            LocalDateTime slot = LocalDateTime.of(data, atual);
            if (!agendamentoRepository.existsConflitoHorario(
                    dentistaId, slot, slot.plusMinutes(DURACAO_PADRAO_MINUTOS), STATUS_ATIVOS, null)) {
                slots.add(slot);
            }
            atual = atual.plusMinutes(DURACAO_PADRAO_MINUTOS);
        }
        return slots;
    }

    // ====================== OUTROS ======================
    @Transactional
    public void delete(Long id) {
        if (!agendamentoRepository.existsById(id)) {
            throw new EntityNotFoundException("Agendamento não encontrado");
        }
        agendamentoRepository.deleteById(id);
    }

    @Transactional(readOnly = true)
    public boolean pacienteTemAgendamentoFuturo(Long pacienteId) {
        return agendamentoRepository.existsAgendamentoFuturo(pacienteId, LocalDateTime.now(), STATUS_ATIVOS);
    }
}