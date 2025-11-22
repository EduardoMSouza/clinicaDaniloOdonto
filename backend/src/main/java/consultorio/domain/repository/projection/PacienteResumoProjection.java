package consultorio.domain.repository.projection;

import java.time.LocalDate;
import java.time.LocalDateTime;

public interface PacienteResumoProjection  {
    String getNome();
    String getCpf();
    LocalDate getDataNascimento();
    LocalDateTime getCriadoEm();
    String getProntuarioNumero();
}
