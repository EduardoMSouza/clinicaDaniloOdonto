package consultorio.domain.service;

import consultorio.api.dto.mapper.EvolucaoTratamentoMapper;
import consultorio.api.dto.request.EvolucaoTratamentoRequest;
import consultorio.api.dto.response.EvolucaoTratamentoResponse;
import consultorio.domain.entity.EvolucaoTratamento;
import consultorio.domain.entity.Paciente;
import consultorio.domain.repository.EvolucaoTratamentoRepository;
import consultorio.domain.repository.PacienteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EvolucaoTratamentoService {

    private final EvolucaoTratamentoRepository repository;
    private final PacienteRepository pacienteRepository;
    private final EvolucaoTratamentoMapper mapper;

    public EvolucaoTratamentoResponse criar(EvolucaoTratamentoRequest dto) {
        Paciente paciente = pacienteRepository.findById(dto.getPacienteId())
                .orElseThrow(() -> new RuntimeException("Paciente não encontrado"));

        EvolucaoTratamento entity = mapper.toEntity(dto);
        entity.setPaciente(paciente);

        repository.save(entity);

        return mapper.toResponse(entity);
    }

    public EvolucaoTratamentoResponse buscarPorId(Long id) {
        EvolucaoTratamento entity = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Evolução não encontrada"));

        return mapper.toResponse(entity);
    }

    public List<EvolucaoTratamentoResponse> listarTodos() {
        return mapper.toResponseList(repository.findAll());
    }

    public EvolucaoTratamentoResponse atualizar(Long id, EvolucaoTratamentoRequest dto) {
        EvolucaoTratamento entity = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Evolução não encontrada"));

        Paciente paciente = pacienteRepository.findById(dto.getPacienteId())
                .orElseThrow(() -> new RuntimeException("Paciente não encontrado"));

        mapper.updateFromRequest(dto, entity);
        entity.setPaciente(paciente);

        repository.save(entity);

        return mapper.toResponse(entity);
    }

    public void deletar(Long id) {
        EvolucaoTratamento entity = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Evolução não encontrada"));

        repository.delete(entity);
    }
}
