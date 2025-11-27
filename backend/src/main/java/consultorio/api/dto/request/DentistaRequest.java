package consultorio.api.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class DentistaRequest {

    @NotBlank(message = "Nome é obrigatório")
    private String nome;

    @NotBlank(message = "CRO é obrigatório")
    private String cro;

    @Email(message = "Email inválido")
    private String email;

    private String telefone;

    private String especialidade;

    private Boolean ativo = true;

    // Permite criar/atualizar horários ao mesmo tempo
    private List<HorarioTrabalhoRequest> horarios;
}