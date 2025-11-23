package consultorio.api.dto.mapper;


import consultorio.api.dto.request.DentistaRequest;
import consultorio.api.dto.response.DentistaResponse;
import consultorio.domain.entity.Dentista;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class DentistaMapper {

    private final ModelMapper mapper;

    public Dentista toEntity(DentistaRequest request){
        return mapper.map(request, Dentista.class);
    }

    public DentistaResponse toEntityResponse(Dentista dentista){
        return mapper.map(dentista, DentistaResponse.class);
    }

    public List<DentistaResponse> toEntityResponseList(List<Dentista> dentistas){
        return dentistas.stream()
                .map(this::toEntityResponse)
                .collect(Collectors.toList());
    }

    public void updateFromRequest(DentistaRequest request, Dentista dentista){
        Dentista tempDentista = toEntity(request);

        mapper.map(tempDentista, dentista);
    }
}
