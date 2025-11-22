package consultorio.domain.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "pacientes")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Paciente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;



    //Dados basicos
    @Column(name = "prontuario_numero", unique = true)
    private String prontuarioNumero;

    @Column(name = "nome_paciente")
    @NotBlank(message = "Nome é obrigatório") @Size(max = 100, message = "Nome deve ter no máximo 100 caracteres")
    private String nome;

    @Column(name = "telefone_paciente")
    private String telefone;

    @Column(name = "rg_paciente")
    private String rg;

    @Column(name = "orgao_expedidor")
    private String orgaoExpedidor;

    @Column(name = "cpf", nullable = false)
    @NotBlank(message = "CPF é obrigatório") @Pattern(regexp = "\\d{11}", message = "CPF deve conter 11 dígitos")
    private String cpf;

    @Column(name = "data_nascimento")
    @NotNull(message = "Data de nascimento é obrigatória")
    private LocalDate dataNascimento;

    @Column(name = "naturalidade_paciente")
    private String naturalidade;

    @Column(name = "nacionalidade_paciente")
    private String nacionalidade;

    @Column(name = "profissao_paciente")
    private String profissao;

    @Column(name = "endereco_residencial")
    private String enderecoResidencial;

    @Column(name = "indicado_por")
    private String indicadoPor;

    @Column(name = "status_paciente", nullable = false)
    private Boolean status = true;



    //responsavel pelo tratamento
    @Column(name = "nome_responsavel")
    private String nomeResponsavel;

    @Column(name = "rg_responsavel")
    private String rgResponsavel;

    @Column(name = "orgao_expedidor_responsavel")
    private String orgaoExpedidorResponsavel;

    @Column(name = "cpf_responsavel")
    private String cpfResponsavel;

    @Column(name = "estado_civil_responsavel")
    private String estadoCivilResponsavel;

    @Column(name = "conjuge_responsavel")
    private String conjugeResponsavel;

    @Column(name = "rg_conjuge")
    private String rgConjuge;

    @Column(name = "orgao_expedidor_conjuge")
    private String orgaoExpedidorConjuge;

    @Column(name = "cpf_conjuge")
    private String cpfConjuge;




    //Anamnese
    @Column(name = "febre_reumatica")
    private Boolean febreReumatica;

    @Column(name = "hepatite")
    private Boolean hepatite;

    @Column(name = "diabetes")
    private Boolean diabetes;

    @Column(name = "hipertensao_arterial_sistemica")
    private Boolean hipertensaoArterialSistemica;

    @Column(name = "portador_hiv")
    private Boolean portadorHiv;

    @Column(name = "alteracao_coagulacao_sanguinea")
    private Boolean alteracaoCoagulacaoSanguinea;

    @Column(name = "reacoes_alergicas")
    private Boolean reacoesAlergicas;

    @Column(name = "doencas_sistemicas")
    private Boolean doencasSistemicas;

    @Column(name = "internacao_recente")
    private Boolean internacaoRecente;

    @Column(name = "utilizando_medicacao")
    private Boolean utilizandoMedicacao;

    @Column(name = "fumante")
    private Boolean fumante;

    @Column(name = "fumante_quantidade")
    private String fumanteQuantidade;

    @Column(name = "tempo_fumo")
    private String tempoFumo;

    @Column(name = "bebidas_alcoolicas")
    private Boolean bebidasAlcoolicas;

    @Column(name = "problemas_cardiacos")
    private Boolean problemasCardiacos;

    @Column(name = "problemas_renais")
    private Boolean problemasRenais;

    @Column(name = "problemas_gastricos")
    private Boolean problemasGastricos;

    @Column(name = "problemas_respiratorios")
    private Boolean problemasRespiratorios;

    @Column(name = "problemas_alergicos")
    private Boolean problemasAlergicos;

    @Column(name = "problemas_alergicos_quais")
    private String problemasAlergicosQuais;

    @Column(name = "problemas_articulares_ou_reumatismo")
    private Boolean problemasArticularesOuReumatismo;

    @Column(name = "queixa_principal")
    private String queixaPrincipal;

    @Column(name = "evolucao_doenca_atual")
    private String evolucaoDoencaAtual;


    //convenio medico
    @Column(name = "convenio_paciente")
    private String convenio;

    @Column(name = "numero_inscricao_convenio")
    private String numeroInscricao;



    //inspeção bucal
    @Column(name = "lingua")
    private String lingua;

    @Column(name = "mucosa")
    private String mucosa;

    @Column(name = "palato")
    private String palato;

    @Column(name = "labios")
    private String labios;

    @Column(name = "gengivas")
    private String gengivas;

    @Column(name = "nariz")
    private String nariz;

    @Column(name = "face")
    private String face;

    @Column(name = "ganglios")
    private String ganglios;

    @Column(name = "glandulas_salivares")
    private String glandulasSalivares;

    @Column(name = "alteracao_oclusao")
    private Boolean alteracaoOclusao;

    @Column(name = "alteracao_oclusao_tipo")
    private String alteracaoOclusaoTipo;

    @Column(name = "protese")
    private Boolean protese;

    @Column(name = "protese_tipo")
    private String proteseTipo;

    @Column(name = "outras_observacoes")
    private String outrasObservacoes;


    //questionario saude
    @Column(name = "sofre_doenca")
    private Boolean sofreDoenca;

    @Column(name = "sofre_doenca_quais")
    private String sofreDoencaQuais;

    @Column(name = "tratamento_medico_atual")
    private Boolean tratamentoMedicoAtual;

    @Column(name = "gravidez")
    private Boolean gravidez;

    @Column(name = "uso_medicacao")
    private Boolean usoMedicacao;

    @Column(name = "uso_medicacao_quais")
    private String usoMedicacaoQuais;

    @Column(name = "medico_assistente_telefone")
    private String medicoAssistenteTelefone;

    @Column(name = "teve_alergia")
    private Boolean teveAlergia;

    @Column(name = "teve_alergia_quais")
    private String teveAlergiaQuais;

    @Column(name = "foi_operado")
    private Boolean foiOperado;

    @Column(name = "foi_operado_quais")
    private String foiOperadoQuais;

    @Column(name = "problemas_cicatrizacao")
    private Boolean problemasCicatrizacao;

    @Column(name = "problemas_anestesia")
    private Boolean problemasAnestesia;

    @Column(name = "problemas_hemorragia")
    private Boolean problemasHemorragia;

    @Column(name = "habitos")
    private String habitos;

    @Column(name = "antecedentes_familiares")
    private String antecedentesFamiliares;

    @Column(name = "criado_em")
    private LocalDateTime createdAt;

    @Column(name = "atualizado_em")
    private LocalDateTime updatedAt;

    // Enum para sexo
    public enum Sexo {
        MASCULINO, FEMININO, OUTRO
    }

    // Enum para estado civil
    public enum EstadoCivil {
        SOLTEIRO, CASADO, DIVORCIADO, VIUVO, UNIAO_ESTAVEL
    }

    //relacionamentos
    @OneToMany(mappedBy = "paciente", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<EvolucaoTratamento> evolucoesTratamento = new ArrayList<>();

    @OneToMany(mappedBy = "paciente", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PlanoDental> planosDentais = new ArrayList<>();


    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}