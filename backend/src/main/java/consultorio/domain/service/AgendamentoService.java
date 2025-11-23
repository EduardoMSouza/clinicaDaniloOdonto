package consultorio.domain.service;

import consultorio.api.dto.mapper.AgendamentoMapper;
import consultorio.api.dto.request.AgendamentoRequest;
import consultorio.api.dto.response.AgendamentoResponse;
import consultorio.domain.entity.Agendamento;
import consultorio.domain.entity.Paciente;
import consultorio.domain.entity.Dentista;
import consultorio.domain.entity.enums.StatusAgendamento;
import consultorio.domain.repository.AgendamentoRepository;
import consultorio.domain.repository.PacienteRepository;
import consultorio.domain.repository.DentistaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AgendamentoService {

    private final AgendamentoRepository agendamentoRepository;
    private final PacienteRepository pacienteRepository;
    private final DentistaRepository dentistaRepository;
    private final AgendamentoMapper agendamentoMapper;

    private final List<StatusAgendamento> STATUS_CONFLITO = Arrays.asList(
            StatusAgendamento.AGENDADO,
            StatusAgendamento.CONFIRMADO,
            StatusAgendamento.EM_ATENDIMENTO
    );

    @Transactional
    public AgendamentoResponse create(AgendamentoRequest request) {
        // Validar paciente
        Paciente paciente = pacienteRepository.findById(request.getPacienteId())
                .orElseThrow(() -> new RuntimeException("Paciente não encontrado com id: " + request.getPacienteId()));

        // Validar dentista
        Dentista dentista = dentistaRepository.findById(request.getDentistaId())
                .orElseThrow(() -> new RuntimeException("Dentista não encontrado com id: " + request.getDentistaId()));

        // Validar datas
        if (request.getDataHora().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("Não é possível agendar para datas passadas");
        }

        if (request.getDataHoraFim().isBefore(request.getDataHora())) {
            throw new RuntimeException("Data de fim deve ser após data de início");
        }

        // Verificar conflito de horário - CORRIGIDO
        boolean conflito = agendamentoRepository.existsConflitoHorario(
                request.getDentistaId(),
                request.getDataHora(),
                request.getDataHoraFim(),
                STATUS_CONFLITO,
                null // Para criação, não tem ID ainda
        );

        if (conflito) {
            throw new RuntimeException("Já existe um agendamento para este horário");
        }

        Agendamento agendamento = agendamentoMapper.toEntity(request);
        agendamento.setPaciente(paciente);
        agendamento.setDentista(dentista);

        Agendamento savedAgendamento = agendamentoRepository.save(agendamento);
        return agendamentoMapper.toEntityResponse(savedAgendamento);
    }

    @Transactional(readOnly = true)
    public List<AgendamentoResponse> findAll() {
        List<Agendamento> agendamentos = agendamentoRepository.findAll();
        return agendamentoMapper.toEntityResponseList(agendamentos);
    }

    @Transactional(readOnly = true)
    public AgendamentoResponse findById(Long id) {
        Agendamento agendamento = agendamentoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Agendamento não encontrado com id: " + id));
        return agendamentoMapper.toEntityResponse(agendamento);
    }

    @Transactional
    public AgendamentoResponse update(Long id, AgendamentoRequest request) {
        Agendamento existingAgendamento = agendamentoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Agendamento não encontrado com id: " + id));

        // Validar paciente
        Paciente paciente = pacienteRepository.findById(request.getPacienteId())
                .orElseThrow(() -> new RuntimeException("Paciente não encontrado com id: " + request.getPacienteId()));

        // Validar dentista
        Dentista dentista = dentistaRepository.findById(request.getDentistaId())
                .orElseThrow(() -> new RuntimeException("Dentista não encontrado com id: " + request.getDentistaId()));

        // Verificar conflito de horário (excluindo o próprio agendamento) - CORRIGIDO
        boolean conflito = agendamentoRepository.existsConflitoHorario(
                request.getDentistaId(),
                request.getDataHora(),
                request.getDataHoraFim(),
                STATUS_CONFLITO,
                id
        );

        if (conflito) {
            throw new RuntimeException("Já existe um agendamento para este horário");
        }

        agendamentoMapper.updateFromRequest(request, existingAgendamento);
        existingAgendamento.setPaciente(paciente);
        existingAgendamento.setDentista(dentista);

        Agendamento updatedAgendamento = agendamentoRepository.save(existingAgendamento);
        return agendamentoMapper.toEntityResponse(updatedAgendamento);
    }

    @Transactional
    public void delete(Long id) {
        if (!agendamentoRepository.existsById(id)) {
            throw new RuntimeException("Agendamento não encontrado com id: " + id);
        }
        agendamentoRepository.deleteById(id);
    }

    @Transactional
    public AgendamentoResponse updateStatus(Long id, StatusAgendamento status) {
        Agendamento agendamento = agendamentoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Agendamento não encontrado com id: " + id));

        agendamento.setStatus(status);
        Agendamento updatedAgendamento = agendamentoRepository.save(agendamento);
        return agendamentoMapper.toEntityResponse(updatedAgendamento);
    }

    @Transactional(readOnly = true)
    public List<AgendamentoResponse> findByDentistaAndPeriodo(Long dentistaId, LocalDateTime start, LocalDateTime end) {
        List<Agendamento> agendamentos = agendamentoRepository.findByDentistaIdAndDataHoraBetween(dentistaId, start, end);
        return agendamentoMapper.toEntityResponseList(agendamentos);
    }

    @Transactional(readOnly = true)
    public List<AgendamentoResponse> findByPaciente(Long pacienteId) {
        List<Agendamento> agendamentos = agendamentoRepository.findByPacienteId(pacienteId);
        return agendamentoMapper.toEntityResponseList(agendamentos);
    }

    @Transactional(readOnly = true)
    public List<AgendamentoResponse> findAgendamentosHoje() {
        // Usando o método default corrigido
        List<Agendamento> agendamentos = agendamentoRepository.findAgendamentosHoje(STATUS_CONFLITO);
        return agendamentoMapper.toEntityResponseList(agendamentos);
    }

    @Transactional(readOnly = true)
    public List<AgendamentoResponse> findAgendamentosPorData(LocalDate data) {
        List<Agendamento> agendamentos = agendamentoRepository.findAgendamentosPorData(data, STATUS_CONFLITO);
        return agendamentoMapper.toEntityResponseList(agendamentos);
    }

    @Transactional(readOnly = true)
    public List<AgendamentoResponse> findProximosAgendamentos() {
        List<Agendamento> agendamentos = agendamentoRepository
                .findByDataHoraAfterAndStatusInOrderByDataHoraAsc(LocalDateTime.now(), STATUS_CONFLITO);
        return agendamentoMapper.toEntityResponseList(agendamentos);
    }
}