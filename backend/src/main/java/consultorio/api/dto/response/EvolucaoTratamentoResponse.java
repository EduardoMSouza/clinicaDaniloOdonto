package consultorio.api.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EvolucaoTratamentoResponse {
    private Long id;
    private LocalDate dataProcedimento;
    private String evolucaoIntercorrenciasTratamento;

    private Long pacienteId;
    private String nomePaciente;
}
