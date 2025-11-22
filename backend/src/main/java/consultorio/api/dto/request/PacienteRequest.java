package consultorio.api.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PacienteRequest {

    // Dados básicos
    private String prontuarioNumero;

    @NotBlank(message = "Nome é obrigatório")
    @Size(max = 100, message = "Nome deve ter no máximo 100 caracteres")
    private String nome;

    private String telefone;
    private String rg;
    private String orgaoExpedidor;
    private String cpf;
    private LocalDate dataNascimento;
    private String naturalidade;
    private String nacionalidade;
    private String profissao;
    private String enderecoResidencial;
    private String indicadoPor;
    private Boolean status = true;

    // Responsável pelo tratamento
    private String nomeResponsavel;
    private String rgResponsavel;
    private String orgaoExpedidorResponsavel;
    private String cpfResponsavel;
    private String estadoCivilResponsavel;
    private String conjugeResponsavel;
    private String rgConjuge;
    private String orgaoExpedidorConjuge;
    private String cpfConjuge;

    // Anamnese
    private Boolean febreReumatica;
    private Boolean hepatite;
    private Boolean diabetes;
    private Boolean hipertensaoArterialSistemica;
    private Boolean portadorHiv;
    private Boolean alteracaoCoagulacaoSanguinea;
    private Boolean reacoesAlergicas;
    private Boolean doencasSistemicas;
    private Boolean internacaoRecente;
    private Boolean utilizandoMedicacao;
    private Boolean fumante;
    private String fumanteQuantidade;
    private String tempoFumo;
    private Boolean bebidasAlcoolicas;
    private Boolean problemasCardiacos;
    private Boolean problemasRenais;
    private Boolean problemasGastricos;
    private Boolean problemasRespiratorios;
    private Boolean problemasAlergicos;
    private String problemasAlergicosQuais;
    private Boolean problemasArticularesOuReumatismo;
    private String queixaPrincipal;
    private String evolucaoDoencaAtual;

    // Convênio médico
    private String convenio;
    private String numeroInscricao;

    // Inspeção bucal
    private String lingua;
    private String mucosa;
    private String palato;
    private String labios;
    private String gengivas;
    private String nariz;
    private String face;
    private String ganglios;
    private String glandulasSalivares;
    private Boolean alteracaoOclusao;
    private String alteracaoOclusaoTipo;
    private Boolean protese;
    private String proteseTipo;
    private String outrasObservacoes;

    // Questionário saúde
    private Boolean sofreDoenca;
    private String sofreDoencaQuais;
    private Boolean tratamentoMedicoAtual;
    private Boolean gravidez;
    private Boolean usoMedicacao;
    private String usoMedicacaoQuais;
    private String medicoAssistenteTelefone;
    private Boolean teveAlergia;
    private String teveAlergiaQuais;
    private Boolean foiOperado;
    private String foiOperadoQuais;
    private Boolean problemasCicatrizacao;
    private Boolean problemasAnestesia;
    private Boolean problemasHemorragia;
    private String habitos;
    private String antecedentesFamiliares;
}