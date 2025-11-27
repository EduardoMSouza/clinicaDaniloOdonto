import { EvolucaoTratamento, EvolucaoTratamentoRequest, EvolucaoTratamentoResponse } from '@/types/evolucaoTratamento';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

export class EvolucaoTratamentoService {
    private baseUrl = `${API_BASE_URL}/evolucoes-tratamento`;

    async criar(request: EvolucaoTratamentoRequest): Promise<EvolucaoTratamentoResponse> {
        const response = await fetch(this.baseUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(request),
        });

        if (!response.ok) {
            throw new Error('Erro ao criar evolução de tratamento');
        }

        return response.json();
    }

    async buscarPorId(id: number): Promise<EvolucaoTratamentoResponse> {
        const response = await fetch(`${this.baseUrl}/${id}`);

        if (!response.ok) {
            throw new Error('Evolução de tratamento não encontrada');
        }

        return response.json();
    }

    async listarTodos(): Promise<EvolucaoTratamentoResponse[]> {
        const response = await fetch(this.baseUrl);

        if (!response.ok) {
            throw new Error('Erro ao listar evoluções de tratamento');
        }

        return response.json();
    }

    async buscarPorPaciente(pacienteId: number): Promise<EvolucaoTratamentoResponse[]> {
        const response = await fetch(`${this.baseUrl}/paciente/${pacienteId}`);

        if (!response.ok) {
            throw new Error('Erro ao buscar evoluções por paciente');
        }

        return response.json();
    }

    async atualizar(id: number, request: EvolucaoTratamentoRequest): Promise<EvolucaoTratamentoResponse> {
        const response = await fetch(`${this.baseUrl}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(request),
        });

        if (!response.ok) {
            throw new Error('Erro ao atualizar evolução de tratamento');
        }

        return response.json();
    }

    async deletar(id: number): Promise<void> {
        const response = await fetch(`${this.baseUrl}/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Erro ao deletar evolução de tratamento');
        }
    }
}

// Instância padrão para uso nos componentes
export const evolucaoTratamentoService = new EvolucaoTratamentoService();