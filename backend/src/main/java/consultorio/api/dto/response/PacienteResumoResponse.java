package consultorio.api.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PacienteResumoResponse{
    private Long id;
    private String nome;
    private String cpf;
    private LocalDate dataNascimento;
    private LocalDateTime criadoEm;
    private String prontuarioNumero;
}
