// services/dentistasService.ts
import {DentistaFilter, DentistaRequest, DentistaResponse} from '@/types/dentistaType';
import api from "@/lib/api";

// Constantes para configuração
const SERVICE_CONFIG = {
    baseUrl: '/api/dentistas',
    cacheTimeout: 5 * 60 * 1000, // 5 minutos
    retryAttempts: 3
} as const;

// Tipos para melhor organização
type ApiResponse<T> = {
    data: T;
    message?: string;
};

type PaginatedParams = {
    page?: number;
    size?: number;
    sort?: string;
};

// Classe base para reutilização de lógica comum
class BaseService {
    protected async handleRequest<T>(
        request: Promise<T>,
        errorMessage: string
    ): Promise<T> {
        try {
            return await request;
        } catch (error: any) {
            const message = error.response?.data?.message || errorMessage;
            throw new Error(message);
        }
    }

    protected buildQueryParams(params: Record<string, any>): string {
        const searchParams = new URLSearchParams();

        Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== '') {
                searchParams.append(key, String(value));
            }
        });

        return searchParams.toString();
    }
}

export class DentistaService extends BaseService {
    /**
     * CRUD Operations
     */
    async create(dentistaData: DentistaRequest): Promise<DentistaResponse> {
        return this.handleRequest(
            api.post<DentistaResponse>(SERVICE_CONFIG.baseUrl, dentistaData).then(r => r.data),
            'Erro ao criar dentista'
        );
    }

    async getAll(params?: PaginatedParams): Promise<DentistaResponse[]> {
        const queryParams = params ? `?${this.buildQueryParams(params)}` : '';

        return this.handleRequest(
            api.get<DentistaResponse[]>(`${SERVICE_CONFIG.baseUrl}${queryParams}`).then(r => r.data),
            'Erro ao buscar dentistas'
        );
    }

    async getById(id: number): Promise<DentistaResponse> {
        return this.handleRequest(
            api.get<DentistaResponse>(`${SERVICE_CONFIG.baseUrl}/${id}`).then(r => r.data),
            'Dentista não encontrado'
        );
    }

    async update(id: number, dentistaData: DentistaRequest): Promise<DentistaResponse> {
        return this.handleRequest(
            api.put<DentistaResponse>(`${SERVICE_CONFIG.baseUrl}/${id}`, dentistaData).then(r => r.data),
            'Erro ao atualizar dentista'
        );
    }

    async delete(id: number): Promise<void> {
        return this.handleRequest(
            api.delete(`${SERVICE_CONFIG.baseUrl}/${id}`),
            'Erro ao excluir dentista'
        );
    }

    /**
     * Status Management
     */
    async activate(id: number): Promise<DentistaResponse> {
        return this.handleRequest(
            api.patch<DentistaResponse>(`${SERVICE_CONFIG.baseUrl}/${id}/activate`).then(r => r.data),
            'Erro ao ativar dentista'
        );
    }

    async inactivate(id: number): Promise<DentistaResponse> {
        return this.handleRequest(
            api.patch<DentistaResponse>(`${SERVICE_CONFIG.baseUrl}/${id}/inactivate`).then(r => r.data),
            'Erro ao inativar dentista'
        );
    }

    /**
     * Search & Filter Operations
     */
    async search(filters: DentistaFilter & PaginatedParams): Promise<DentistaResponse[]> {
        const queryParams = this.buildQueryParams(filters);

        return this.handleRequest(
            api.get<DentistaResponse[]>(`${SERVICE_CONFIG.baseUrl}/search?${queryParams}`).then(r => r.data),
            'Erro ao buscar dentistas'
        );
    }

    async getByStatus(ativo: boolean): Promise<DentistaResponse[]> {
        return this.handleRequest(
            api.get<DentistaResponse[]>(`${SERVICE_CONFIG.baseUrl}/status/${ativo}`).then(r => r.data),
            'Erro ao buscar dentistas por status'
        );
    }

    async getByEspecialidade(especialidade: string): Promise<DentistaResponse[]> {
        return this.handleRequest(
            api.get<DentistaResponse[]>(`${SERVICE_CONFIG.baseUrl}/especialidade/${especialidade}`).then(r => r.data),
            'Erro ao buscar dentistas por especialidade'
        );
    }

    /**
     * Validation Operations
     */
    async checkCroExists(cro: string, excludeId?: number): Promise<boolean> {
        const params = excludeId ? `?excludeId=${excludeId}` : '';

        return this.handleRequest(
            api.get<boolean>(`${SERVICE_CONFIG.baseUrl}/exists/cro/${cro}${params}`).then(r => r.data),
            'Erro ao verificar CRO'
        );
    }

    async checkEmailExists(email: string, excludeId?: number): Promise<boolean> {
        const params = excludeId ? `?excludeId=${excludeId}` : '';

        return this.handleRequest(
            api.get<boolean>(`${SERVICE_CONFIG.baseUrl}/exists/email/${email}${params}`).then(r => r.data),
            'Erro ao verificar email'
        );
    }

    /**
     * Bulk Operations
     */
    async createBatch(dentistas: DentistaRequest[]): Promise<DentistaResponse[]> {
        return this.handleRequest(
            api.post<DentistaResponse[]>(`${SERVICE_CONFIG.baseUrl}/batch`, dentistas).then(r => r.data),
            'Erro ao criar dentistas em lote'
        );
    }

    async updateStatusBatch(ids: number[], ativo: boolean): Promise<void> {
        return this.handleRequest(
            api.patch(`${SERVICE_CONFIG.baseUrl}/batch/status`, { ids, ativo }),
            'Erro ao atualizar status em lote'
        );
    }
}

// Cache Service com estratégia mais robusta
export class DentistaCacheService {
    static readonly CACHE_KEYS = {
        ALL_DENTISTAS: 'dentistas_all',
        ACTIVE_DENTISTAS: 'dentistas_active',
        BY_ESPECIALIDADE: 'dentistas_especialidade_'
    } as const;

    static get<T>(key: string): T | null {
        if (typeof window === 'undefined') return null;

        try {
            const cached = localStorage.getItem(key);
            if (cached) {
                const data = JSON.parse(cached);
                if (Date.now() - data.timestamp < SERVICE_CONFIG.cacheTimeout) {
                    return data.value;
                }
            }
        } catch (error) {
            console.warn('Erro ao recuperar cache:', error);
        }
        return null;
    }

    static set(key: string, value: any): void {
        if (typeof window === 'undefined') return;

        try {
            const cacheData = {
                value,
                timestamp: Date.now()
            };
            localStorage.setItem(key, JSON.stringify(cacheData));
        } catch (error) {
            console.warn('Erro ao salvar cache:', error);
        }
    }

    static clear(pattern?: string): void {
        if (typeof window === 'undefined') return;

        try {
            if (pattern) {
                // Limpa apenas chaves que correspondem ao padrão
                Object.keys(localStorage).forEach(key => {
                    if (key.startsWith(pattern)) {
                        localStorage.removeItem(key);
                    }
                });
            } else {
                // Limpa todo o cache de dentistas
                Object.values(this.CACHE_KEYS).forEach(key => {
                    localStorage.removeItem(key);
                });
            }
        } catch (error) {
            console.warn('Erro ao limpar cache:', error);
        }
    }
}

// Service com cache integrado
export class DentistaServiceWithCache extends DentistaService {
    async getAll(params?: PaginatedParams): Promise<DentistaResponse[]> {
        const cacheKey = params
            ? `${DentistaCacheService.CACHE_KEYS.ALL_DENTISTAS}_${JSON.stringify(params)}`
            : DentistaCacheService.CACHE_KEYS.ALL_DENTISTAS;

        // Tenta pegar do cache
        const cached = DentistaCacheService.get<DentistaResponse[]>(cacheKey);
        if (cached) {
            return cached;
        }

        // Busca da API
        const dentistas = await super.getAll(params);

        // Salva no cache
        DentistaCacheService.set(cacheKey, dentistas);

        return dentistas;
    }

    async getByEspecialidade(especialidade: string): Promise<DentistaResponse[]> {
        const cacheKey = `${DentistaCacheService.CACHE_KEYS.BY_ESPECIALIDADE}${especialidade}`;

        const cached = DentistaCacheService.get<DentistaResponse[]>(cacheKey);
        if (cached) {
            return cached;
        }

        const dentistas = await super.getByEspecialidade(especialidade);
        DentistaCacheService.set(cacheKey, dentistas);

        return dentistas;
    }

    // Invalida cache em operações de escrita
    async create(dentistaData: DentistaRequest): Promise<DentistaResponse> {
        const result = await super.create(dentistaData);
        DentistaCacheService.clear();
        return result;
    }

    async update(id: number, dentistaData: DentistaRequest): Promise<DentistaResponse> {
        const result = await super.update(id, dentistaData);
        DentistaCacheService.clear();
        return result;
    }

    async delete(id: number): Promise<void> {
        await super.delete(id);
        DentistaCacheService.clear();
    }
}

// Instâncias para exportação
export const dentistaService = new DentistaService();
export const dentistaServiceWithCache = new DentistaServiceWithCache();

// Hook personalizado melhorado
export const useDentistaService = (useCache = false) => {
    const service = useCache ? dentistaServiceWithCache : dentistaService;

    return {
        // CRUD
        criar: service.create.bind(service),
        listar: service.getAll.bind(service),
        buscarPorId: service.getById.bind(service),
        atualizar: service.update.bind(service),
        excluir: service.delete.bind(service),

        // Status
        ativar: service.activate.bind(service),
        inativar: service.inactivate.bind(service),

        // Buscas
        buscar: service.search.bind(service),
        buscarPorStatus: service.getByStatus.bind(service),
        buscarPorEspecialidade: service.getByEspecialidade.bind(service),

        // Validações
        verificarCro: service.checkCroExists.bind(service),
        verificarEmail: service.checkEmailExists.bind(service),

        // Utilitários
        invalidarCache: () => DentistaCacheService.clear()
    };
};

export default dentistaService;