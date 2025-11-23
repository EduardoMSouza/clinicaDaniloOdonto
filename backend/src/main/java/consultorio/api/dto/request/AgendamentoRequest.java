package consultorio.api.dto.request;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class AgendamentoRequest {
    private Long pacienteId;
    private Long dentistaId;
    private LocalDateTime dataHora;
    private LocalDateTime dataHoraFim;
    private String procedimento;
    private String observacoes;
}
