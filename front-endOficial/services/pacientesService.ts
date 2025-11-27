// services/pacientesService.ts
import {
    PacienteType,
    PacienteCreateType,
    PacienteUpdateType,
    PacienteFilterType,
    PaginatedResponse,
    PacienteStatsType,
    PacienteResumoType
} from "@/types/pacientesType"

// Configurações centralizadas
const SERVICE_CONFIG = {
    baseUrl: "http://localhost:8080/api/pacientes",
    defaultPageSize: 10,
    maxRetries: 3,
    timeout: 10000 // 10 segundos
} as const

// Tipos auxiliares
type RequestOptions = {
    method?: string
    body?: any
    headers?: Record<string, string>
    retryCount?: number
}

class ApiError extends Error {
    constructor(
        message: string,
        public status?: number,
        public code?: string
    ) {
        super(message)
        this.name = 'ApiError'
    }
}

export class PacienteService {
    private async fetchWithAuth(
        url: string,
        options: RequestOptions = {}
    ): Promise<Response> {
        const token = this.getToken()

        const defaultHeaders = {
            'Content-Type': 'application/json',
            ...(token && { Authorization: `Bearer ${token}` }),
            ...options.headers
        }

        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), SERVICE_CONFIG.timeout)

        try {
            const response = await fetch(url, {
                method: options.method || 'GET',
                headers: defaultHeaders,
                body: options.body ? JSON.stringify(options.body) : undefined,
                signal: controller.signal
            })

            clearTimeout(timeoutId)
            return response
        } catch (error) {
            clearTimeout(timeoutId)

            if (error.name === 'AbortError') {
                throw new ApiError('Timeout na requisição')
            }

            // Retry logic para erros de rede
            if (options.retryCount && options.retryCount < SERVICE_CONFIG.maxRetries) {
                await this.delay(1000 * (options.retryCount + 1))
                return this.fetchWithAuth(url, {
                    ...options,
                    retryCount: options.retryCount + 1
                })
            }

            throw new ApiError('Erro de conexão')
        }
    }

    private async handleResponse<T>(response: Response): Promise<T> {
        if (!response.ok) {
            let errorMessage = 'Erro na requisição'

            try {
                const errorData = await response.json()
                errorMessage = errorData.message || errorMessage
            } catch {
                errorMessage = `Erro ${response.status}: ${response.statusText}`
            }

            throw new ApiError(errorMessage, response.status)
        }

        return response.json()
    }

    private getToken(): string | null {
        if (typeof document === 'undefined') return null

        const cookie = document.cookie
            .split('; ')
            .find(row => row.startsWith('token='))

        return cookie ? cookie.split('=')[1] : null
    }

    private delay(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms))
    }

    private toISODate(date?: Date | string | null): string | null {
        if (!date) return null
        if (typeof date === 'string') return date

        return date.toISOString().split('T')[0] // yyyy-MM-dd
    }

    private buildSearchParams(filters: PacienteFilterType): URLSearchParams {
        const params = new URLSearchParams()

        Object.entries(filters).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== '') {
                params.append(key, String(value))
            }
        })

        // Valores padrão para paginação
        if (!params.has('page')) params.set('page', '0')
        if (!params.has('size')) params.set('size', String(SERVICE_CONFIG.defaultPageSize))

        return params
    }

    // 🔵 CRUD Operations
    async create(data: PacienteCreateType): Promise<PacienteType> {
        const body = {
            ...data,
            dataNascimento: this.toISODate(data.dataNascimento)
        }

        const response = await this.fetchWithAuth(SERVICE_CONFIG.baseUrl, {
            method: 'POST',
            body
        })

        return this.handleResponse<PacienteType>(response)
    }

    async update(id: number, data: PacienteUpdateType): Promise<PacienteType> {
        const body = {
            ...data,
            dataNascimento: this.toISODate(data.dataNascimento)
        }

        const response = await this.fetchWithAuth(`${SERVICE_CONFIG.baseUrl}/${id}`, {
            method: 'PUT',
            body
        })

        return this.handleResponse<PacienteType>(response)
    }

    async findById(id: number): Promise<PacienteType> {
        const response = await this.fetchWithAuth(`${SERVICE_CONFIG.baseUrl}/${id}`)
        return this.handleResponse<PacienteType>(response)
    }

    async delete(id: number): Promise<void> {
        const response = await this.fetchWithAuth(`${SERVICE_CONFIG.baseUrl}/${id}`, {
            method: 'DELETE'
        })

        if (!response.ok) {
            throw new ApiError('Erro ao excluir paciente')
        }
    }

    // 🟢 List Operations
    async findAll(): Promise<PacienteType[]> {
        const response = await this.fetchWithAuth(SERVICE_CONFIG.baseUrl)
        return this.handleResponse<PacienteType[]>(response)
    }

    async findResumo(): Promise<PacienteResumoType[]> {
        const response = await this.fetchWithAuth(`${SERVICE_CONFIG.baseUrl}/resumo`)
        return this.handleResponse<PacienteResumoType[]>(response)
    }

    // 🔍 Search Operations
    async findByProntuarioNumero(numeroProntuario: string): Promise<PacienteType> {
        const response = await this.fetchWithAuth(
            `${SERVICE_CONFIG.baseUrl}/prontuario/${encodeURIComponent(numeroProntuario)}`
        )
        return this.handleResponse<PacienteType>(response)
    }

    async findByCpf(cpf: string): Promise<PacienteType> {
        const response = await this.fetchWithAuth(
            `${SERVICE_CONFIG.baseUrl}/cpf/${encodeURIComponent(cpf)}`
        )
        return this.handleResponse<PacienteType>(response)
    }

    async findByStatus(status: boolean): Promise<PacienteType[]> {
        const response = await this.fetchWithAuth(`${SERVICE_CONFIG.baseUrl}/status/${status}`)
        return this.handleResponse<PacienteType[]>(response)
    }

    async searchFilters(filters: PacienteFilterType): Promise<PaginatedResponse<PacienteType>> {
        const params = this.buildSearchParams(filters)
        const response = await this.fetchWithAuth(
            `${SERVICE_CONFIG.baseUrl}/search?${params.toString()}`
        )
        return this.handleResponse<PaginatedResponse<PacienteType>>(response)
    }

    // ♻ Status Management
    async activate(id: number): Promise<PacienteType> {
        const response = await this.fetchWithAuth(`${SERVICE_CONFIG.baseUrl}/${id}/activate`, {
            method: 'PATCH'
        })
        return this.handleResponse<PacienteType>(response)
    }

    async inactivate(id: number): Promise<PacienteType> {
        const response = await this.fetchWithAuth(`${SERVICE_CONFIG.baseUrl}/${id}/inactivate`, {
            method: 'PATCH'
        })
        return this.handleResponse<PacienteType>(response)
    }

    // 📊 Analytics
    async stats(): Promise<PacienteStatsType> {
        const response = await this.fetchWithAuth(`${SERVICE_CONFIG.baseUrl}/stats`)
        return this.handleResponse<PacienteStatsType>(response)
    }

    // ✅ Validation Operations
    async existsCpf(cpf: string, excludeId?: number): Promise<boolean> {
        const url = excludeId
            ? `${SERVICE_CONFIG.baseUrl}/exists/cpf/${cpf}?excludeId=${excludeId}`
            : `${SERVICE_CONFIG.baseUrl}/exists/cpf/${cpf}`

        const response = await this.fetchWithAuth(url)
        return this.handleResponse<boolean>(response)
    }

    async existsRg(rg: string, excludeId?: number): Promise<boolean> {
        const url = excludeId
            ? `${SERVICE_CONFIG.baseUrl}/exists/rg/${rg}?excludeId=${excludeId}`
            : `${SERVICE_CONFIG.baseUrl}/exists/rg/${rg}`

        const response = await this.fetchWithAuth(url)
        return this.handleResponse<boolean>(response)
    }

    // 🔄 Batch Operations (se suportado pela API)
    async activateBatch(ids: number[]): Promise<void> {
        const response = await this.fetchWithAuth(`${SERVICE_CONFIG.baseUrl}/batch/activate`, {
            method: 'PATCH',
            body: { ids }
        })

        if (!response.ok) {
            throw new ApiError('Erro ao ativar pacientes em lote')
        }
    }

    async inactivateBatch(ids: number[]): Promise<void> {
        const response = await this.fetchWithAuth(`${SERVICE_CONFIG.baseUrl}/batch/inactivate`, {
            method: 'PATCH',
            body: { ids }
        })

        if (!response.ok) {
            throw new ApiError('Erro ao inativar pacientes em lote')
        }
    }
}

// Cache Service para melhor performance
export class PacienteCacheService {
    static readonly CACHE_KEYS = {
        ALL: 'pacientes_all',
        RESUMO: 'pacientes_resumo',
        STATS: 'pacientes_stats'
    } as const

    static get<T>(key: string): T | null {
        if (typeof window === 'undefined') return null

        try {
            const cached = localStorage.getItem(key)
            if (cached) {
                const data = JSON.parse(cached)
                // Cache válido por 2 minutos
                if (Date.now() - data.timestamp < 2 * 60 * 1000) {
                    return data.value
                }
            }
        } catch (error) {
            console.warn('Erro ao recuperar cache:', error)
        }
        return null
    }

    static set(key: string, value: any): void {
        if (typeof window === 'undefined') return

        try {
            const cacheData = {
                value,
                timestamp: Date.now()
            }
            localStorage.setItem(key, JSON.stringify(cacheData))
        } catch (error) {
            console.warn('Erro ao salvar cache:', error)
        }
    }

    static clear(): void {
        if (typeof window === 'undefined') return

        Object.values(this.CACHE_KEYS).forEach(key => {
            localStorage.removeItem(key)
        })
    }
}

// Service com cache integrado
export class PacienteServiceWithCache extends PacienteService {
    async findResumo(): Promise<PacienteResumoType[]> {
        const cached = PacienteCacheService.get<PacienteResumoType[]>(
            PacienteCacheService.CACHE_KEYS.RESUMO
        )

        if (cached) return cached

        const data = await super.findResumo()
        PacienteCacheService.set(PacienteCacheService.CACHE_KEYS.RESUMO, data)

        return data
    }

    async stats(): Promise<PacienteStatsType> {
        const cached = PacienteCacheService.get<PacienteStatsType>(
            PacienteCacheService.CACHE_KEYS.STATS
        )

        if (cached) return cached

        const data = await super.stats()
        PacienteCacheService.set(PacienteCacheService.CACHE_KEYS.STATS, data)

        return data
    }

    // Invalida cache em operações de escrita
    async create(data: PacienteCreateType): Promise<PacienteType> {
        const result = await super.create(data)
        PacienteCacheService.clear()
        return result
    }

    async update(id: number, data: PacienteUpdateType): Promise<PacienteType> {
        const result = await super.update(id, data)
        PacienteCacheService.clear()
        return result
    }

    async delete(id: number): Promise<void> {
        await super.delete(id)
        PacienteCacheService.clear()
    }
}

// Instâncias para exportação
export const pacienteService = new PacienteService()
export const pacienteServiceWithCache = new PacienteServiceWithCache()

// Hook personalizado
export const usePacienteService = (useCache = false) => {
    const service = useCache ? pacienteServiceWithCache : pacienteService

    return {
        // CRUD
        criar: service.create.bind(service),
        atualizar: service.update.bind(service),
        buscarPorId: service.findById.bind(service),
        excluir: service.delete.bind(service),

        // Listas
        listarTodos: service.findAll.bind(service),
        buscarResumo: service.findResumo.bind(service),

        // Buscas
        buscarPorProntuario: service.findByProntuarioNumero.bind(service),
        buscarPorCpf: service.findByCpf.bind(service),
        buscarPorStatus: service.findByStatus.bind(service),
        buscarFiltrado: service.searchFilters.bind(service),

        // Status
        ativar: service.activate.bind(service),
        inativar: service.inactivate.bind(service),

        // Validações
        verificarCpf: service.existsCpf.bind(service),
        verificarRg: service.existsRg.bind(service),

        // Analytics
        estatisticas: service.stats.bind(service),

        // Utilitários
        invalidarCache: PacienteCacheService.clear
    }
}

export default pacienteService