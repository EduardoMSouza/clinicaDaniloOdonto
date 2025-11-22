package consultorio.api.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PlanoDentalRequest {
    @NotBlank(message = "O dente é obrigatório")
    private String dente;

    @NotBlank(message = "O procedimento é obrigatório")
    private String procedimento;

    @NotNull(message = "O valor é obrigatório")
    private Double valor;

    @NotNull(message = "O paciente é obrigatório")
    private Long pacienteId;
}
