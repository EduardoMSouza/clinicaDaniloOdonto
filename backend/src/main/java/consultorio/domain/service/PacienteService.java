package consultorio.domain.service;

import consultorio.api.dto.mapper.PacienteMapper;
import consultorio.api.dto.request.PacienteRequest;
import consultorio.api.dto.response.PacienteResponse;
import consultorio.domain.entity.Paciente;
import consultorio.domain.repository.PacienteRepository;
import consultorio.domain.repository.projection.PacienteResumoProjection;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PacienteService {

    private final PacienteRepository pacienteRepository;
    private final PacienteMapper pacienteMapper;

    @Transactional
    public PacienteResponse create(PacienteRequest request) {
        // Verifica se CPF já existe
        if (pacienteRepository.existsByCpf(request.getCpf())) {
            throw new RuntimeException("Já existe um paciente cadastrado com este CPF: " + request.getCpf());
        }

        // Verifica se RG já existe (se informado)
        if (request.getRg() != null && !request.getRg().isBlank() &&
                pacienteRepository.existsByRg(request.getRg())) {
            throw new RuntimeException("Já existe um paciente cadastrado com este RG: " + request.getRg());
        }

        // Verifica se número de prontuário já existe (se informado)
        if (request.getProntuarioNumero() != null && !request.getProntuarioNumero().isBlank() &&
                pacienteRepository.existsByProntuarioNumero(request.getProntuarioNumero())) {
            throw new RuntimeException("Já existe um paciente cadastrado com este número de prontuário: " + request.getProntuarioNumero());
        }

        Paciente paciente = pacienteMapper.toEntity(request);
        Paciente savedPaciente = pacienteRepository.save(paciente);
        return pacienteMapper.toEntityResponse(savedPaciente);
    }

    @Transactional(readOnly = true)
    public List<PacienteResponse> findAll() {
        List<Paciente> pacientes = pacienteRepository.findAll();
        return pacienteMapper.toEntityResponseList(pacientes);
    }

    @Transactional(readOnly = true)
    public List<PacienteResumoProjection> findAllResumo() {
        return pacienteRepository.findAllResumo();
    }

    @Transactional(readOnly = true)
    public PacienteResponse findByProntuario(String prontuarioNumero) {
        Paciente paciente = pacienteRepository.findByProntuarioNumero(prontuarioNumero)
                .orElseThrow(() -> new RuntimeException("Paciente não encontrado com prontuário: " + prontuarioNumero));
        return pacienteMapper.toEntityResponse(paciente);
    }

    @Transactional(readOnly = true)
    public PacienteResponse findById(Long id) {
        Paciente paciente = pacienteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Paciente não encontrado com id: " + id));
        return pacienteMapper.toEntityResponse(paciente);
    }

    @Transactional(readOnly = true)
    public PacienteResponse findByCpf(String cpf) {
        Paciente paciente = pacienteRepository.findByCpf(cpf)
                .orElseThrow(() -> new RuntimeException("Paciente não encontrado com CPF: " + cpf));
        return pacienteMapper.toEntityResponse(paciente);
    }

    @Transactional
    public PacienteResponse update(Long id, PacienteRequest request) {
        Paciente existingPaciente = pacienteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Paciente não encontrado com id: " + id));

        // Verifica se o CPF já existe em outro paciente
        if (request.getCpf() != null && !request.getCpf().equals(existingPaciente.getCpf())) {
            if (pacienteRepository.existsByCpfAndIdNot(request.getCpf(), id)) {
                throw new RuntimeException("Já existe outro paciente cadastrado com este CPF: " + request.getCpf());
            }
        }

        // Verifica se o RG já existe em outro paciente (se informado)
        if (request.getRg() != null && !request.getRg().isBlank() &&
                !request.getRg().equals(existingPaciente.getRg())) {
            if (pacienteRepository.existsByRgAndIdNot(request.getRg(), id)) {
                throw new RuntimeException("Já existe outro paciente cadastrado com este RG: " + request.getRg());
            }
        }

        // Verifica se o número de prontuário já existe em outro paciente (se informado)
        if (request.getProntuarioNumero() != null && !request.getProntuarioNumero().isBlank() &&
                !request.getProntuarioNumero().equals(existingPaciente.getProntuarioNumero())) {
            if (pacienteRepository.existsByProntuarioNumeroAndIdNot(request.getProntuarioNumero(), id)) {
                throw new RuntimeException("Já existe outro paciente cadastrado com este número de prontuário: " + request.getProntuarioNumero());
            }
        }

        pacienteMapper.updateFromRequest(request, existingPaciente);
        Paciente updatedPaciente = pacienteRepository.save(existingPaciente);
        return pacienteMapper.toEntityResponse(updatedPaciente);
    }

    @Transactional
    public void delete(Long id) {
        if (!pacienteRepository.existsById(id)) {
            throw new RuntimeException("Paciente não encontrado com id: " + id);
        }
        pacienteRepository.deleteById(id);
    }

    @Transactional
    public PacienteResponse inactivate(Long id) {
        Paciente paciente = pacienteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Paciente não encontrado com id: " + id));

        paciente.setStatus(false);
        Paciente updatedPaciente = pacienteRepository.save(paciente);
        return pacienteMapper.toEntityResponse(updatedPaciente);
    }

    @Transactional
    public PacienteResponse activate(Long id) {
        Paciente paciente = pacienteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Paciente não encontrado com id: " + id));

        paciente.setStatus(true);
        Paciente updatedPaciente = pacienteRepository.save(paciente);
        return pacienteMapper.toEntityResponse(updatedPaciente);
    }

    @Transactional(readOnly = true)
    public List<PacienteResponse> findByStatus(Boolean status) {
        List<Paciente> pacientes = pacienteRepository.findByStatus(status);
        return pacienteMapper.toEntityResponseList(pacientes);
    }

    @Transactional(readOnly = true)
    public List<PacienteResponse> findByNomeContaining(String nome) {
        List<Paciente> pacientes = pacienteRepository.findByNomeContainingIgnoreCase(nome);
        return pacienteMapper.toEntityResponseList(pacientes);
    }

    @Transactional(readOnly = true)
    public boolean existsByCpf(String cpf) {
        return pacienteRepository.existsByCpf(cpf);
    }

    @Transactional(readOnly = true)
    public boolean existsByRg(String rg) {
        return pacienteRepository.existsByRg(rg);
    }
}