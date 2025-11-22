package consultorio.api.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PlanoDentalResponse {
    private Long id;
    private String dente;
    private String procedimento;
    private Double valor;

    private Long pacienteId;
    private String nomePaciente;
}
