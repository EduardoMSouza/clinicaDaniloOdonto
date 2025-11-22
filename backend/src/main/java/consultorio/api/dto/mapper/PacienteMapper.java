package consultorio.api.dto.mapper;


import consultorio.api.dto.request.PacienteRequest;
import consultorio.api.dto.response.PacienteResponse;
import consultorio.domain.entity.Paciente;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class PacienteMapper {

    private final ModelMapper mapper;

    public Paciente toEntity(PacienteRequest request){
        return mapper.map(request, Paciente.class);
    }

    public PacienteResponse toEntityResponse(Paciente paciente){
        return mapper.map(paciente, PacienteResponse.class);
    }

    public List<PacienteResponse> toEntityResponseList(List<Paciente> pacientes){
        return pacientes.stream()
                .map(this::toEntityResponse)
                .collect(Collectors.toList());
    }

    public void updateFromRequest(PacienteRequest request, Paciente paciente){
        Paciente tempPaciente = toEntity(request);

        mapper.map(tempPaciente, paciente);
    }
}