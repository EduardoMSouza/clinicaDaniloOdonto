package consultorio.api.dto.mapper;

import consultorio.api.dto.request.AgendamentoRequest;
import consultorio.api.dto.response.AgendamentoResponse;
import consultorio.domain.entity.Agendamento;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class AgendamentoMapper {

    private final ModelMapper mapper;

    public Agendamento toEntity(AgendamentoRequest request) {
        return mapper.map(request, Agendamento.class);
    }

    public AgendamentoResponse toEntityResponse(Agendamento agendamento) {
        return mapper.map(agendamento, AgendamentoResponse.class);
    }

    public List<AgendamentoResponse> toEntityResponseList(List<Agendamento> agendamentos) {
        return agendamentos.stream()
                .map(this::toEntityResponse)
                .collect(Collectors.toList());
    }

    public void updateFromRequest(AgendamentoRequest request, Agendamento agendamento) {
        Agendamento tempAgendamento = toEntity(request);
        mapper.map(tempAgendamento, agendamento);
    }
}