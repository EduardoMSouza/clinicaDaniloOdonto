// service.ts

import { PlanoDentalRequest, PlanoDentalResponse, PlanoDentalId, PacienteId } from "@/types/planoDentalType";

// URL base da API (ajuste conforme o ambiente Next.js)
const API_BASE_URL = "/api/planos-dentais";

/**
 * Função utilitária para lidar com a resposta da API.
 * @param response A resposta do fetch.
 * @returns O corpo da resposta em JSON.
 */
async function handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
        // Aqui você pode adicionar um tratamento de erro mais sofisticado,
        // como ler o corpo do erro da API.
        throw new Error(`Erro na API: ${response.status} ${response.statusText}`);
    }
    // Se a resposta for 204 No Content (como no DELETE), retorna void.
    if (response.status === 204) {
        return undefined as T;
    }
    return response.json() as Promise<T>;
}

/**
 * Cria um novo plano dental.
 * POST /api/planos-dentais
 * @param request Os dados do plano dental a ser criado.
 * @returns O plano dental criado.
 */
export async function criarPlanoDental(
    request: PlanoDentalRequest
): Promise<PlanoDentalResponse> {
    const response = await fetch(API_BASE_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
    });
    return handleResponse<PlanoDentalResponse>(response);
}

/**
 * Busca um plano dental pelo ID.
 * GET /api/planos-dentais/{id}
 * @param id O ID do plano dental.
 * @returns O plano dental encontrado.
 */
export async function buscarPlanoDentalPorId(
    id: PlanoDentalId
): Promise<PlanoDentalResponse> {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: "GET",
    });
    return handleResponse<PlanoDentalResponse>(response);
}

/**
 * Lista todos os planos dentais.
 * GET /api/planos-dentais
 * @returns Uma lista de planos dentais.
 */
export async function listarTodosPlanosDentais(): Promise<PlanoDentalResponse[]> {
    const response = await fetch(API_BASE_URL, {
        method: "GET",
    });
    return handleResponse<PlanoDentalResponse[]>(response);
}

/**
 * Busca planos dentais por ID do paciente.
 * GET /api/planos-dentais/paciente/{pacienteId}
 * @param pacienteId O ID do paciente.
 * @returns Uma lista de planos dentais do paciente.
 */
export async function buscarPlanosDentaisPorPaciente(
    pacienteId: PacienteId
): Promise<PlanoDentalResponse[]> {
    const response = await fetch(`${API_BASE_URL}/paciente/${pacienteId}`, {
        method: "GET",
    });
    return handleResponse<PlanoDentalResponse[]>(response);
}

/**
 * Atualiza um plano dental existente.
 * PUT /api/planos-dentais/{id}
 * @param id O ID do plano dental a ser atualizado.
 * @param request Os novos dados do plano dental.
 * @returns O plano dental atualizado.
 */
export async function atualizarPlanoDental(
    id: PlanoDentalId,
    request: PlanoDentalRequest
): Promise<PlanoDentalResponse> {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
    });
    return handleResponse<PlanoDentalResponse>(response);
}

/**
 * Deleta um plano dental pelo ID.
 * DELETE /api/planos-dentais/{id}
 * @param id O ID do plano dental a ser deletado.
 */
export async function deletarPlanoDental(id: PlanoDentalId): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: "DELETE",
    });
    return handleResponse<void>(response);
}
