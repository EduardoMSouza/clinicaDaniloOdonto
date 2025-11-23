import {
    PacienteType,
    PacienteCreateType,
    PacienteUpdateType,
    PacienteFilterType,
    PaginatedResponse,
    PacienteStatsType, PacienteResumoResponse
} from "@/types/pacientesTypes"

const API_URL = "http://localhost:8080/api/pacientes"

// 🔐 Pega o JWT do cookie
const getToken = () => {
    const cookie = document.cookie.split("; ").find(c => c.startsWith("token="))
    return cookie?.split("=")[1]
}

const authHeader = () => ({
    Authorization: `Bearer ${getToken()}`
})

// Converte Date | null → string ISO ou null
const toISO = (date?: Date | string | null): string | null => {
    if (!date) return null
    if (typeof date === "string") return date
    return date.toISOString().split("T")[0] // yyyy-MM-dd
}

export const pacienteService = {

    // 🔵 Criar paciente
    async create(data: PacienteCreateType): Promise<PacienteType> {
        const body = {
            ...data,
            dataNascimento: toISO(data.dataNascimento)
        }

        const res = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json", ...authHeader() },
            body: JSON.stringify(body)
        })

        if (!res.ok) throw new Error("Erro ao criar paciente")
        return res.json()
    },

    // 🟢 Atualizar paciente
    async update(id: number, data: PacienteUpdateType): Promise<PacienteType> {
        const body = {
            ...data,
            dataNascimento: toISO(data.dataNascimento)
        }

        const res = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json", ...authHeader() },
            body: JSON.stringify(body)
        })

        if (!res.ok) throw new Error("Erro ao atualizar paciente")
        return res.json()
    },

    // 🟣 Buscar por ID
    async findById(id: number): Promise<PacienteType> {
        const res = await fetch(`${API_URL}/${id}`, { headers: authHeader() })
        if (!res.ok) throw new Error("Paciente não encontrado")
        return res.json()
    },

    // 🔍 Buscar por número de prontuário - CORRIGIDO
    async findByProntuarioNumero(numeroProntuario: string): Promise<PacienteType> {
        const res = await fetch(`${API_URL}/prontuario/${numeroProntuario}`, {
            headers: authHeader()
        })
        if (!res.ok) throw new Error("Paciente não encontrado")
        return res.json()
    },

    // 🟢 Listar todos (sem paginação)
    async findAll(): Promise<PacienteType[]> {
        const res = await fetch(API_URL, { headers: authHeader() })
        return res.json()
    },

    // 🟡 Resumo dos pacientes
    async findResumo(): Promise<PacienteResumoResponse[]> {
        const res = await fetch(`${API_URL}/resumo`, { headers: authHeader() })
        return res.json()
    },

    // 🔍 Buscar por CPF
    async findByCpf(cpf: string): Promise<PacienteType> {
        const res = await fetch(`${API_URL}/cpf/${cpf}`, { headers: authHeader() })
        return res.json()
    },

    // 🧹 Inativar paciente
    async inactivate(id: number): Promise<PacienteType> {
        const res = await fetch(`${API_URL}/${id}/inactivate`, {
            method: "PATCH",
            headers: authHeader()
        })
        return res.json()
    },

    // ♻ Ativar paciente
    async activate(id: number): Promise<PacienteType> {
        const res = await fetch(`${API_URL}/${id}/activate`, {
            method: "PATCH",
            headers: authHeader()
        })
        return res.json()
    },

    // 🟦 Buscar por status
    async findByStatus(status: boolean): Promise<PacienteType[]> {
        const res = await fetch(`${API_URL}/status/${status}`, { headers: authHeader() })
        return res.json()
    },

    // 🧭 Busca filtrada + paginação
    async searchFilters(filters: PacienteFilterType): Promise<PaginatedResponse<PacienteType>> {
        const params = new URLSearchParams()

        if (filters.nome) params.append("nome", filters.nome)
        if (filters.cpf) params.append("cpf", filters.cpf)
        if (filters.status !== undefined) params.append("status", String(filters.status))
        if (filters.dataInicio) params.append("dataInicio", filters.dataInicio)
        if (filters.dataFim) params.append("dataFim", filters.dataFim)
        params.append("page", String(filters.page ?? 0))
        params.append("size", String(filters.size ?? 10))

        const res = await fetch(`${API_URL}/search?${params.toString()}`, {
            headers: authHeader()
        })

        if (!res.ok) throw new Error("Erro na busca filtrada")
        return res.json()
    },

    // 📊 Estatísticas gerais
    async stats(): Promise<PacienteStatsType> {
        const res = await fetch(`${API_URL}/stats`, { headers: authHeader() })
        return res.json()
    },

    // ❗ Verificar CPF
    async existsCpf(cpf: string): Promise<boolean> {
        const res = await fetch(`${API_URL}/exists/cpf/${cpf}`, { headers: authHeader() })
        return res.json()
    },

    // ❗ Verificar RG
    async existsRg(rg: string): Promise<boolean> {
        const res = await fetch(`${API_URL}/exists/rg/${rg}`, { headers: authHeader() })
        return res.json()
    }
}