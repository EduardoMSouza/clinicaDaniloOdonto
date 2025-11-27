// types.ts

// A resposta da API (PlanoDentalResponse.java)
export interface PlanoDentalResponse {
    id: number; // Long em Java
    dente: string;
    procedimento: string;
    valor: number; // BigDecimal em Java, mapeado para number em TS
    status: boolean; // Boolean em Java
    observacoes: string;
    dataCriacao: string; // LocalDateTime em Java, mapeado para string (ISO 8601) em TS
    pacienteId: number; // Long em Java
    nomePaciente: string;
}

// O corpo da requisição para criar/atualizar (PlanoDentalRequest.java)
export interface PlanoDentalRequest {
    dente: string;
    procedimento: string;
    valor: number; // BigDecimal em Java, mapeado para number em TS
    pacienteId: number; // Long em Java
}

// Tipo de dado para o ID, usado em várias funções
export type PlanoDentalId = number;

// Tipo de dado para o ID do paciente
export type PacienteId = number;
