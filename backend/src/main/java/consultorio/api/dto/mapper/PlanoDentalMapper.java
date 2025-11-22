package consultorio.api.dto.mapper;


import consultorio.api.dto.request.PlanoDentalRequest;
import consultorio.api.dto.response.PlanoDentalResponse;
import consultorio.domain.entity.PlanoDental;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class PlanoDentalMapper {

    private final ModelMapper mapper;

    public PlanoDental toEntity(PlanoDentalRequest request){
        return mapper.map(request, PlanoDental.class);
    }

    public PlanoDentalResponse toResponse(PlanoDental plano){
        return mapper.map(plano, PlanoDentalResponse.class);
    }

    public List<PlanoDentalResponse> toResponseList(List<PlanoDental> planos){
        return planos.stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public void updateFromRequest(PlanoDentalRequest request, PlanoDental plano){
        PlanoDental temp = toEntity(request);
        mapper.map(temp, plano);
    }
}
