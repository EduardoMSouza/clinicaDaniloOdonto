package consultorio.api.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;

import java.time.DayOfWeek;
import java.time.LocalTime;

@Getter
@Setter
public class HorarioTrabalhoResponse {

    private DayOfWeek diaSemana;

    @JsonFormat(pattern = "HH:mm")
    private LocalTime horaInicioManha;

    @JsonFormat(pattern = "HH:mm")
    private LocalTime horaFimManha;

    @JsonFormat(pattern = "HH:mm")
    private LocalTime horaInicioTarde;

    @JsonFormat(pattern = "HH:mm")
    private LocalTime horaFimTarde;

    private Boolean ativo;
}