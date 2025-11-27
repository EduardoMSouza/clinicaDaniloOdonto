import { useState, useCallback } from 'react';
import { PlanoDentalRequest, PlanoDentalResponse } from '@/types/planoDentalType';
import { planoDentalService } from '@/services/planoDentalService';

export const usePlanoDental = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const criarPlanoDental = useCallback(async (planoDental: PlanoDentalRequest): Promise<PlanoDentalResponse | null> => {
        setLoading(true);
        setError(null);

        try {
            const response = await planoDentalService.criar(planoDental);
            setLoading(false);
            return response;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erro desconhecido');
            setLoading(false);
            return null;
        }
    }, []);

    const buscarPlanoPorId = useCallback(async (id: number): Promise<PlanoDentalResponse | null> => {
        setLoading(true);
        setError(null);

        try {
            const response = await planoDentalService.buscarPorId(id);
            setLoading(false);
            return response;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erro desconhecido');
            setLoading(false);
            return null;
        }
    }, []);

    const listarPlanos = useCallback(async (): Promise<PlanoDentalResponse[]> => {
        setLoading(true);
        setError(null);

        try {
            const response = await planoDentalService.listarTodos();
            setLoading(false);
            return response;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erro desconhecido');
            setLoading(false);
            return [];
        }
    }, []);

    const buscarPlanosPorPaciente = useCallback(async (pacienteId: number): Promise<PlanoDentalResponse[]> => {
        setLoading(true);
        setError(null);

        try {
            const response = await planoDentalService.buscarPorPaciente(pacienteId);
            setLoading(false);
            return response;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erro desconhecido');
            setLoading(false);
            return [];
        }
    }, []);

    const atualizarPlano = useCallback(async (id: number, planoDental: PlanoDentalRequest): Promise<PlanoDentalResponse | null> => {
        setLoading(true);
        setError(null);

        try {
            const response = await planoDentalService.atualizar(id, planoDental);
            setLoading(false);
            return response;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erro desconhecido');
            setLoading(false);
            return null;
        }
    }, []);

    const deletarPlano = useCallback(async (id: number): Promise<boolean> => {
        setLoading(true);
        setError(null);

        try {
            await planoDentalService.deletar(id);
            setLoading(false);
            return true;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erro desconhecido');
            setLoading(false);
            return false;
        }
    }, []);

    return {
        loading,
        error,
        criarPlanoDental,
        buscarPlanoPorId,
        listarPlanos,
        buscarPlanosPorPaciente,
        atualizarPlano,
        deletarPlano,
    };
};