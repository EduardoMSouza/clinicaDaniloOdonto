package consultorio.api.dto.response;

import java.time.LocalDate;
import java.time.LocalDateTime;

public record PacienteResumoResponse(
        String nome,
        String cpf,
        LocalDate dataNascimento,
        LocalDateTime criadoEm,
        String prontuarioNumero
) {}
