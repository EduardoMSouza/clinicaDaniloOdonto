package consultorio.api.dto.request;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class AgendamentoRequest {
    private Long pacienteId;
    private Long dentistaId;
    private Integer duracaoMinutos;
    private LocalDateTime dataHora;
    private String procedimento;
    private String observacoes;

}
