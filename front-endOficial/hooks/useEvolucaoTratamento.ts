"use client";

import { useState } from "react";
import {
    EvolucaoTratamentoRequest,
    EvolucaoTratamentoResponse
} from "@/types/evolucaoTratamentoType";
import { evolucaoTratamentoService } from "@/services/evolucaoTratamentoService";

export function useEvolucaoTratamento() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const executar = async <T>(acao: () => Promise<T>): Promise<T> => {
        setLoading(true);
        setError(null);

        try {
            const result = await acao();
            setLoading(false);
            return result;
        } catch (err) {
            const msg = err instanceof Error ? err.message : "Erro desconhecido";
            setError(msg);
            setLoading(false);
            throw err;
        }
    };

    // ===============================================
    // AÇÕES DO CRUD
    // ===============================================

    const criar = (data: EvolucaoTratamentoRequest): Promise<EvolucaoTratamentoResponse> =>
        executar(() => evolucaoTratamentoService.criar(data));

    const buscarPorId = (id: number): Promise<EvolucaoTratamentoResponse> =>
        executar(() => evolucaoTratamentoService.buscarPorId(id));

    const listarTodos = (): Promise<EvolucaoTratamentoResponse[]> =>
        executar(() => evolucaoTratamentoService.listarTodos());

    const buscarPorPaciente = (pacienteId: number): Promise<EvolucaoTratamentoResponse[]> =>
        executar(() => evolucaoTratamentoService.buscarPorPaciente(pacienteId));

    const atualizar = (
        id: number,
        data: EvolucaoTratamentoRequest
    ): Promise<EvolucaoTratamentoResponse> =>
        executar(() => evolucaoTratamentoService.atualizar(id, data));

    const deletar = (id: number): Promise<void> =>
        executar(() => evolucaoTratamentoService.deletar(id));

    return {
        loading,
        error,

        criar,
        buscarPorId,
        listarTodos,
        buscarPorPaciente,
        atualizar,
        deletar,
    };
}
