package consultorio.domain.service;

import consultorio.api.dto.mapper.PlanoDentalMapper;
import consultorio.api.dto.request.PlanoDentalRequest;
import consultorio.api.dto.response.PlanoDentalResponse;
import consultorio.domain.entity.Paciente;
import consultorio.domain.entity.PlanoDental;
import consultorio.domain.repository.PacienteRepository;
import consultorio.domain.repository.PlanoDentalRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PlanoDentalService {

    private final PlanoDentalRepository repository;
    private final PacienteRepository pacienteRepository;
    private final PlanoDentalMapper mapper;

    public PlanoDentalResponse criar(PlanoDentalRequest dto) {
        Paciente paciente = pacienteRepository.findById(dto.getPacienteId())
                .orElseThrow(() -> new RuntimeException("Paciente não encontrado"));

        PlanoDental entity = mapper.toEntity(dto);
        entity.setPaciente(paciente);

        repository.save(entity);

        return mapper.toResponse(entity);
    }

    public PlanoDentalResponse buscarPorId(Long id) {
        PlanoDental entity = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Plano dental não encontrado"));

        return mapper.toResponse(entity);
    }

    public List<PlanoDentalResponse> listarTodos() {
        return mapper.toResponseList(repository.findAll());
    }

    public PlanoDentalResponse atualizar(Long id, PlanoDentalRequest dto) {
        PlanoDental entity = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Plano dental não encontrado"));

        Paciente paciente = pacienteRepository.findById(dto.getPacienteId())
                .orElseThrow(() -> new RuntimeException("Paciente não encontrado"));

        mapper.updateFromRequest(dto, entity);
        entity.setPaciente(paciente);

        repository.save(entity);

        return mapper.toResponse(entity);
    }

    public void deletar(Long id) {
        PlanoDental entity = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Plano dental não encontrado"));

        repository.delete(entity);
    }
}
