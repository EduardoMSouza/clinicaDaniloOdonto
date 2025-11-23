// types/pacienteTypes.ts
export interface PacienteType {
    id: number;

    // Dados básicos
    prontuarioNumero?: string;
    nome: string;
    telefone?: string;
    rg?: string;
    orgaoExpedidor?: string;
    cpf?: string;
    dataNascimento?: string; // ISO string
    naturalidade?: string;
    nacionalidade?: string;
    profissao?: string;
    enderecoResidencial?: string;
    indicadoPor?: string;
    sexo?: Sexo;
    status?: boolean;

    // Responsável pelo tratamento
    nomeResponsavel?: string;
    rgResponsavel?: string;
    orgaoExpedidorResponsavel?: string;
    cpfResponsavel?: string;
    estadoCivilResponsavel?: string;
    conjugeResponsavel?: string;
    rgConjuge?: string;
    orgaoExpedidorConjuge?: string;
    cpfConjuge?: string;

    // Anamnese
    febreReumatica?: boolean;
    hepatite?: boolean;
    diabetes?: boolean;
    hipertensaoArterialSistemica?: boolean;
    portadorHiv?: boolean;
    alteracaoCoagulacaoSanguinea?: boolean;
    reacoesAlergicas?: boolean;
    doencasSistemicas?: boolean;
    internacaoRecente?: boolean;
    utilizandoMedicacao?: boolean;
    fumante?: boolean;
    fumanteQuantidade?: string;
    tempoFumo?: string;
    bebidasAlcoolicas?: boolean;
    problemasCardiacos?: boolean;
    problemasRenais?: boolean;
    problemasGastricos?: boolean;
    problemasRespiratorios?: boolean;
    problemasAlergicos?: boolean;
    problemasAlergicosQuais?: string;
    problemasArticularesOuReumatismo?: boolean;
    queixaPrincipal?: string;
    evolucaoDoencaAtual?: string;

    // Convênio médico
    convenio?: string;
    numeroInscricao?: string;

    // Inspeção bucal
    lingua?: string;
    mucosa?: string;
    palato?: string;
    labios?: string;
    gengivas?: string;
    nariz?: string;
    face?: string;
    ganglios?: string;
    glandulasSalivares?: string;
    alteracaoOclusao?: boolean;
    alteracaoOclusaoTipo?: string;
    protese?: boolean;
    proteseTipo?: string;
    outrasObservacoes?: string;

    // Questionário saúde
    sofreDoenca?: boolean;
    sofreDoencaQuais?: string;
    tratamentoMedicoAtual?: boolean;
    gravidez?: boolean;
    usoMedicacao?: boolean;
    usoMedicacaoQuais?: string;
    medicoAssistenteTelefone?: string;
    teveAlergia?: boolean;
    teveAlergiaQuais?: string;
    foiOperado?: boolean;
    foiOperadoQuais?: string;
    problemasCicatrizacao?: boolean;
    problemasAnestesia?: boolean;
    problemasHemorragia?: boolean;
    habitos?: string;
    antecedentesFamiliares?: string;

    // Campos de auditoria
    createdAt?: string;
    updatedAt?: string;
}

// Tipo para resumo do paciente
export interface PacienteResumoResponse {
    nome: string;
    cpf: string;
    dataNascimento: string;
    criadoEm: string;
    prontuarioNumero: string;
}

// Tipo para criação/atualização (sem id)
export type PacienteCreateType = Omit<PacienteType, 'id' | 'createdAt' | 'updatedAt'>;
export type PacienteUpdateType = Partial<PacienteCreateType>;

// ✅ NOVOS TIPOS ADICIONADOS:

// Tipo para formulário com validação
export interface PacienteFormType extends Omit<PacienteCreateType, 'dataNascimento'> {
    dataNascimento?: Date | null;
}

// Tipo para busca/filtros
export interface PacienteFilterType {
    nome?: string;
    cpf?: string;
    status?: boolean;
    dataInicio?: string;
    dataFim?: string;
    page?: number;
    size?: number;
}

// Tipo para resposta paginada
export interface PaginatedResponse<T> {
    content: T[];
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
    first: boolean;
    last: boolean;
}

// Tipo para estatísticas
export interface PacienteStatsType {
    total: number;
    ativos: number;
    inativos: number;
    novosEsteMes: number;
}

// Enum para estado civil
export enum EstadoCivil {
    SOLTEIRO = 'SOLTEIRO',
    CASADO = 'CASADO',
    DIVORCIADO = 'DIVORCIADO',
    VIUVO = 'VIUVO',
    UNIAO_ESTAVEL = 'UNIAO_ESTAVEL'
}

// Enum para sexo
export enum Sexo {
    MASCULINO = 'MASCULINO',
    FEMININO = 'FEMININO',
    OUTRO = 'OUTRO'
}