// app/dashboard/pacientes/page.tsx
"use client"

import { useState, useEffect, useCallback } from "react"
import { PacienteHeader } from "@/components/domain/pacientes/PacientesHeader"
import { PacienteSearch } from "@/components/domain/pacientes/PacienteSearch"
import { PacienteList } from "@/components/domain/pacientes/PacienteList"
import { PacienteResumoType } from "@/types/pacientesType"
import { pacienteService } from "@/services/pacientesService"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"

export default function PacientesPage() {
    const router = useRouter()
    const [pacientes, setPacientes] = useState<PacienteResumoType[]>([])
    const [filteredPacientes, setFilteredPacientes] = useState<PacienteResumoType[]>([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')
    const [statusFilter, setStatusFilter] = useState('')
    const [dateFilter, setDateFilter] = useState('')

    const loadPacientes = useCallback(async () => {
        try {
            setLoading(true)
            const data = await pacienteService.findResumo()
            setPacientes(data)
            setFilteredPacientes(data)
        } catch (error) {
            console.error("Erro ao carregar pacientes:", error)
            toast.error("Erro ao carregar lista de pacientes")
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        loadPacientes()
    }, [loadPacientes])

    // Função para formatar data no formato brasileiro
    const formatDateToBrazilian = (dateString: string): string => {
        try {
            const date = new Date(dateString)
            if (isNaN(date.getTime())) return dateString

            const day = date.getDate().toString().padStart(2, '0')
            const month = (date.getMonth() + 1).toString().padStart(2, '0')
            const year = date.getFullYear()
            return `${day}/${month}/${year}`
        } catch {
            return dateString
        }
    }

    // Função para aplicar todos os filtros
    const applyFilters = useCallback(() => {
        let filtered = pacientes

        // Filtro de busca geral
        if (searchTerm.trim()) {
            filtered = filtered.filter(p =>
                p.nome?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                p.cpf?.includes(searchTerm) ||
                p.prontuarioNumero?.includes(searchTerm) ||
                (p.dataNascimento && formatDateToBrazilian(p.dataNascimento).includes(searchTerm))
            )
        }

        // Filtro por status
        if (statusFilter && statusFilter !== "todos") {
            const isActive = statusFilter === "ATIVO"
            filtered = filtered.filter(p => p.status === isActive)
        }

        // Filtro por data específica
        if (dateFilter.trim()) {
            filtered = filtered.filter(p =>
                p.dataNascimento && formatDateToBrazilian(p.dataNascimento).includes(dateFilter)
            )
        }

        setFilteredPacientes(filtered)
    }, [pacientes, searchTerm, statusFilter, dateFilter])

    // Aplica os filtros quando qualquer um dos filtros muda
    useEffect(() => {
        applyFilters()
    }, [applyFilters])

    const handleSearch = (term: string) => {
        setSearchTerm(term)
    }

    const handleFilterByStatus = (status: string) => {
        setStatusFilter(status)
    }

    const handleFilterByDate = (date: string) => {
        setDateFilter(date)
    }

    const handleCreatePaciente = () => {
        router.push("/dashboard/pacientes/novo_paciente")
    }

    const handleDeletePaciente = async (paciente: PacienteResumoType) => {
        try {
            await pacienteService.delete(paciente.id)

            // Remove o paciente das listas localmente (mais rápido que recarregar tudo)
            setPacientes(prev => prev.filter(p => p.id !== paciente.id))
            setFilteredPacientes(prev => prev.filter(p => p.id !== paciente.id))

            toast.success("Paciente excluído com sucesso!")
        } catch (error: any) {
            console.error("Erro ao excluir paciente:", error)

            const errorMessage = error.response?.data?.message ||
                error.message ||
                "Erro ao excluir paciente. Tente novamente."

            toast.error(errorMessage)
            throw error // Propaga o erro para o DeleteButton
        }
    }

    // Função para limpar todos os filtros
    const clearAllFilters = () => {
        setSearchTerm('')
        setStatusFilter('')
        setDateFilter('')
    }

    return (
        <div className="space-y-6">
            <PacienteHeader onCreated={handleCreatePaciente} />

            {loading ? (
                <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
            ) : (
                <>
                    <PacienteSearch
                        onSearch={handleSearch}
                        onFilterByStatus={handleFilterByStatus}
                        onFilterByDate={handleFilterByDate}
                    />

                    {/* Indicadores de filtros ativos */}
                    {(searchTerm || statusFilter || dateFilter) && (
                        <div className="flex flex-wrap items-center gap-2 p-3 bg-muted rounded-lg">
                            <span className="text-sm text-muted-foreground">Filtros ativos:</span>

                            {searchTerm && (
                                <span className="inline-flex items-center px-2 py-1 text-xs bg-primary/10 text-primary rounded-md">
                                    Busca: "{searchTerm}"
                                    <button
                                        onClick={() => setSearchTerm('')}
                                        className="ml-1 hover:text-primary/70"
                                    >
                                        ×
                                    </button>
                                </span>
                            )}

                            {statusFilter && statusFilter !== "todos" && (
                                <span className="inline-flex items-center px-2 py-1 text-xs bg-primary/10 text-primary rounded-md">
                                    Status: {statusFilter === "ATIVO" ? "Ativos" : "Inativos"}
                                    <button
                                        onClick={() => setStatusFilter('')}
                                        className="ml-1 hover:text-primary/70"
                                    >
                                        ×
                                    </button>
                                </span>
                            )}

                            {dateFilter && (
                                <span className="inline-flex items-center px-2 py-1 text-xs bg-primary/10 text-primary rounded-md">
                                    Data: {dateFilter}
                                    <button
                                        onClick={() => setDateFilter('')}
                                        className="ml-1 hover:text-primary/70"
                                    >
                                        ×
                                    </button>
                                </span>
                            )}

                            <button
                                onClick={clearAllFilters}
                                className="text-xs text-muted-foreground hover:text-foreground underline"
                            >
                                Limpar todos
                            </button>
                        </div>
                    )}

                    <PacienteList
                        pacientes={filteredPacientes}
                        loading={false}
                        onDelete={handleDeletePaciente}
                    />

                    {/* Mensagem quando não há resultados */}
                    {filteredPacientes.length === 0 && pacientes.length > 0 && (
                        <div className="text-center py-8 text-muted-foreground">
                            Nenhum paciente encontrado com os filtros aplicados.
                            <button
                                onClick={clearAllFilters}
                                className="ml-2 text-primary hover:underline"
                            >
                                Limpar filtros
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    )
}