package consultorio.api.dto.mapper;

import consultorio.api.dto.request.EvolucaoTratamentoRequest;
import consultorio.api.dto.response.EvolucaoTratamentoResponse;
import consultorio.domain.entity.EvolucaoTratamento;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class EvolucaoTratamentoMapper {

    private final ModelMapper mapper;

    public EvolucaoTratamento toEntity(EvolucaoTratamentoRequest request){
        return mapper.map(request, EvolucaoTratamento.class);
    }

    public EvolucaoTratamentoResponse toResponse(EvolucaoTratamento evolucao){
        return mapper.map(evolucao, EvolucaoTratamentoResponse.class);
    }

    public List<EvolucaoTratamentoResponse> toResponseList(List<EvolucaoTratamento> evolucoes){
        return evolucoes.stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public void updateFromRequest(EvolucaoTratamentoRequest request, EvolucaoTratamento evolucao){
        EvolucaoTratamento temp = toEntity(request);
        mapper.map(temp, evolucao);
    }
}
