export interface EvolucaoTratamento {
    id: number;
    dataProcedimento: string;
    evolucaoIntercorrenciasTratamento: string;
    pacienteId: number;
    nomePaciente: string;
}

export interface EvolucaoTratamentoRequest {
    dataProcedimento: string;
    evolucaoIntercorrenciasTratamento: string;
    pacienteId: number;
}

export interface EvolucaoTratamentoResponse {
    id: number;
    dataProcedimento: string;
    evolucaoIntercorrenciasTratamento: string;
    pacienteId: number;
    nomePaciente: string;
}