package consultorio.api.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DentistaRequest {
    private String nome;
    private String cro;
    private String especialidade;
    private String telefone;
    private String email;
    private Boolean ativo;
}
