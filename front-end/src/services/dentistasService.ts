import {
    DentistaRequest,
    DentistaResponse,
    DentistaListResponse
} from '@/types/dentistaType';
import api from "@/lib/api";


export const dentistaService = {
    /**
     * Cria um novo dentista
     */
    create: async (dentistaData: DentistaRequest): Promise<DentistaResponse> => {
        try {
            const response = await api.post<DentistaResponse>('/api/dentistas', dentistaData);
            return response.data;
        } catch (error: any) {
            if (error.response?.data?.message) {
                throw new Error(error.response.data.message);
            }
            throw new Error('Erro ao criar dentista');
        }
    },

    /**
     * Busca todos os dentistas
     */
    getAll: async (): Promise<DentistaResponse[]> => {
        try {
            const response = await api.get<DentistaResponse[]>('/api/dentistas');
            return response.data;
        } catch (error: any) {
            throw new Error('Erro ao buscar dentistas');
        }
    },

    /**
     * Busca dentista por ID
     */
    getById: async (id: number): Promise<DentistaResponse> => {
        try {
            const response = await api.get<DentistaResponse>(`/api/dentistas/${id}`);
            return response.data;
        } catch (error: any) {
            if (error.response?.status === 404) {
                throw new Error('Dentista não encontrado');
            }
            throw new Error('Erro ao buscar dentista');
        }
    },

    /**
     * Busca dentista por CRO
     */
    getByCro: async (cro: string): Promise<DentistaResponse> => {
        try {
            const response = await api.get<DentistaResponse>(`/api/dentistas/cro/${cro}`);
            return response.data;
        } catch (error: any) {
            if (error.response?.status === 404) {
                throw new Error('Dentista não encontrado com este CRO');
            }
            throw new Error('Erro ao buscar dentista por CRO');
        }
    },

    /**
     * Busca dentista por email
     */
    getByEmail: async (email: string): Promise<DentistaResponse> => {
        try {
            const response = await api.get<DentistaResponse>(`/api/dentistas/email/${email}`);
            return response.data;
        } catch (error: any) {
            if (error.response?.status === 404) {
                throw new Error('Dentista não encontrado com este email');
            }
            throw new Error('Erro ao buscar dentista por email');
        }
    },

    /**
     * Atualiza um dentista
     */
    update: async (id: number, dentistaData: DentistaRequest): Promise<DentistaResponse> => {
        try {
            const response = await api.put<DentistaResponse>(`/api/dentistas/${id}`, dentistaData);
            return response.data;
        } catch (error: any) {
            if (error.response?.data?.message) {
                throw new Error(error.response.data.message);
            }
            throw new Error('Erro ao atualizar dentista');
        }
    },

    /**
     * Exclui um dentista
     */
    delete: async (id: number): Promise<void> => {
        try {
            await api.delete(`/api/dentistas/${id}`);
        } catch (error: any) {
            if (error.response?.status === 404) {
                throw new Error('Dentista não encontrado');
            }
            throw new Error('Erro ao excluir dentista');
        }
    },

    /**
     * Ativa um dentista
     */
    activate: async (id: number): Promise<DentistaResponse> => {
        try {
            const response = await api.patch<DentistaResponse>(`/api/dentistas/${id}/activate`);
            return response.data;
        } catch (error: any) {
            if (error.response?.status === 404) {
                throw new Error('Dentista não encontrado');
            }
            throw new Error('Erro ao ativar dentista');
        }
    },

    /**
     * Inativa um dentista
     */
    inactivate: async (id: number): Promise<DentistaResponse> => {
        try {
            const response = await api.patch<DentistaResponse>(`/api/dentistas/${id}/inactivate`);
            return response.data;
        } catch (error: any) {
            if (error.response?.status === 404) {
                throw new Error('Dentista não encontrado');
            }
            throw new Error('Erro ao inativar dentista');
        }
    },

    /**
     * Busca dentistas por status (ativo/inativo)
     */
    getByStatus: async (ativo: boolean): Promise<DentistaResponse[]> => {
        try {
            const response = await api.get<DentistaResponse[]>(`/api/dentistas/status/${ativo}`);
            return response.data;
        } catch (error: any) {
            throw new Error('Erro ao buscar dentistas por status');
        }
    },

    /**
     * Busca dentistas por especialidade
     */
    getByEspecialidade: async (especialidade: string): Promise<DentistaResponse[]> => {
        try {
            const response = await api.get<DentistaResponse[]>(`/api/dentistas/especialidade/${especialidade}`);
            return response.data;
        } catch (error: any) {
            throw new Error('Erro ao buscar dentistas por especialidade');
        }
    },

    /**
     * Busca dentistas por nome
     */
    searchByNome: async (nome: string): Promise<DentistaResponse[]> => {
        try {
            const response = await api.get<DentistaResponse[]>(`/api/dentistas/search?nome=${encodeURIComponent(nome)}`);
            return response.data;
        } catch (error: any) {
            throw new Error('Erro ao buscar dentistas por nome');
        }
    },

    /**
     * Verifica se CRO já existe
     */
    checkCroExists: async (cro: string): Promise<boolean> => {
        try {
            const response = await api.get<boolean>(`/api/dentistas/exists/cro/${cro}`);
            return response.data;
        } catch (error: any) {
            throw new Error('Erro ao verificar CRO');
        }
    },

    /**
     * Verifica se email já existe
     */
    checkEmailExists: async (email: string): Promise<boolean> => {
        try {
            const response = await api.get<boolean>(`/api/dentistas/exists/email/${email}`);
            return response.data;
        } catch (error: any) {
            throw new Error('Erro ao verificar email');
        }
    },

    /**
     * Valida dados do dentista antes do envio
     */
    validateDentista: (dentistaData: DentistaRequest): string[] => {
        const errors: string[] = [];

        if (!dentistaData.nome || dentistaData.nome.trim().length === 0) {
            errors.push('Nome é obrigatório');
        }

        if (!dentistaData.cro || dentistaData.cro.trim().length === 0) {
            errors.push('CRO é obrigatório');
        }

        if (!dentistaData.especialidade || dentistaData.especialidade.trim().length === 0) {
            errors.push('Especialidade é obrigatória');
        }

        if (dentistaData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(dentistaData.email)) {
            errors.push('Email inválido');
        }

        return errors;
    }
};

// Hook personalizado para uso em componentes
export const useDentistaService = () => {
    return {
        // CRUD básico
        criarDentista: dentistaService.create,
        listarDentistas: dentistaService.getAll,
        buscarDentistaPorId: dentistaService.getById,
        atualizarDentista: dentistaService.update,
        excluirDentista: dentistaService.delete,

        // Status
        ativarDentista: dentistaService.activate,
        inativarDentista: dentistaService.inactivate,

        // Buscas específicas
        buscarPorCro: dentistaService.getByCro,
        buscarPorEmail: dentistaService.getByEmail,
        buscarPorStatus: dentistaService.getByStatus,
        buscarPorEspecialidade: dentistaService.getByEspecialidade,
        buscarPorNome: dentistaService.searchByNome,

        // Validações
        verificarCroExistente: dentistaService.checkCroExists,
        verificarEmailExistente: dentistaService.checkEmailExists,
        validarDados: dentistaService.validateDentista
    };
};

// Utilitários para cache/local storage
export const dentistaStorage = {
    KEY: 'dentistas_cache',

    getCachedDentistas: (): DentistaResponse[] | null => {
        if (typeof window === 'undefined') return null;

        try {
            const cached = localStorage.getItem(dentistaStorage.KEY);
            if (cached) {
                const data = JSON.parse(cached);
                // Verifica se o cache não expirou (5 minutos)
                if (Date.now() - data.timestamp < 5 * 60 * 1000) {
                    return data.dentistas;
                }
            }
        } catch (error) {
            console.error('Erro ao recuperar cache de dentistas:', error);
        }
        return null;
    },

    setCachedDentistas: (dentistas: DentistaResponse[]): void => {
        if (typeof window === 'undefined') return;

        try {
            const cacheData = {
                dentistas,
                timestamp: Date.now()
            };
            localStorage.setItem(dentistaStorage.KEY, JSON.stringify(cacheData));
        } catch (error) {
            console.error('Erro ao salvar cache de dentistas:', error);
        }
    },

    clearCache: (): void => {
        if (typeof window === 'undefined') return;
        localStorage.removeItem(dentistaStorage.KEY);
    }
};

// Service com cache
export const dentistaServiceWithCache = {
    ...dentistaService,

    getAllWithCache: async (forceRefresh = false): Promise<DentistaResponse[]> => {
        // Tenta pegar do cache primeiro, se não for forçar refresh
        if (!forceRefresh) {
            const cached = dentistaStorage.getCachedDentistas();
            if (cached) {
                return cached;
            }
        }

        // Busca da API
        const dentistas = await dentistaService.getAll();

        // Salva no cache
        dentistaStorage.setCachedDentistas(dentistas);

        return dentistas;
    },

    // Invalida cache quando há modificações
    create: async (dentistaData: DentistaRequest): Promise<DentistaResponse> => {
        const result = await dentistaService.create(dentistaData);
        dentistaStorage.clearCache();
        return result;
    },

    update: async (id: number, dentistaData: DentistaRequest): Promise<DentistaResponse> => {
        const result = await dentistaService.update(id, dentistaData);
        dentistaStorage.clearCache();
        return result;
    },

    delete: async (id: number): Promise<void> => {
        await dentistaService.delete(id);
        dentistaStorage.clearCache();
    },

    activate: async (id: number): Promise<DentistaResponse> => {
        const result = await dentistaService.activate(id);
        dentistaStorage.clearCache();
        return result;
    },

    inactivate: async (id: number): Promise<DentistaResponse> => {
        const result = await dentistaService.inactivate(id);
        dentistaStorage.clearCache();
        return result;
    }
};

export default dentistaService;