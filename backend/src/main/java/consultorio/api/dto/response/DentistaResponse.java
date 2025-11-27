package consultorio.api.dto.response;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class DentistaResponse {
    private Long id;
    private String nome;
    private String cro;
    private String especialidade;
    private String telefone;
    private String email;
    private Boolean ativo;

    // Horários de trabalho do dentista
    private List<HorarioTrabalhoResponse> horarios;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}