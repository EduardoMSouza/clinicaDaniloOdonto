package consultorio.api.dto.response;

import consultorio.domain.entity.enums.StatusAgendamento;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;

@Getter
@Setter
public class AgendamentoResponse {
    private Long id;
    private PacienteResumoResponse paciente;
    private DentistaResponse dentista;
    private LocalDateTime dataHora;
    private LocalDateTime dataHoraFim;
    private StatusAgendamento status;
    private String procedimento;
    private String observacoes;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
