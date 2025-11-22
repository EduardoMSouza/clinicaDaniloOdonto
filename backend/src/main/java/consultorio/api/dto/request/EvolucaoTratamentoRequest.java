package consultorio.api.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EvolucaoTratamentoRequest {
    @NotNull(message = "A data do procedimento é obrigatória")
    private LocalDate dataProcedimento;

    private String evolucaoIntercorrenciasTratamento;

    @NotNull(message = "O paciente é obrigatório")
    private Long pacienteId;
}
