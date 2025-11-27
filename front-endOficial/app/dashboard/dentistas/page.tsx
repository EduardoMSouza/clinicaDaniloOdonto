// app/dashboard/dentistas/page.tsx
"use client"

import { useState, useEffect, useCallback } from "react"
import { DentistaHeader } from "@/components/domain/dentistas/DentistaHeader"
import { DentistaSearch } from "@/components/domain/dentistas/DentistaSearch"
import { DentistaList } from "@/components/domain/dentistas/DentistaList"
import { DentistaComplete } from "@/components/domain/dentistas/DentistaComplete"
import { DentistaFormCreate } from "@/components/domain/dentistas/DentistaFormCreate"
import { DentistaFormEdit } from "@/components/domain/dentistas/DentistaFormEdit"
import { DentistaResponse } from "@/types/dentistaType"
import { dentistaService } from "@/services/dentistasService"
import { toast } from "sonner"
import { Modal } from "@/components/ui/modal"
import { Loader2 } from "lucide-react"

type ViewMode = "list" | "create" | "edit" | "view"

export default function DentistasPage() {
    const [dentistas, setDentistas] = useState<DentistaResponse[]>([])
    const [filteredDentistas, setFilteredDentistas] = useState<DentistaResponse[]>([])
    const [loading, setLoading] = useState(true)
    const [viewMode, setViewMode] = useState<ViewMode>("list")
    const [selectedDentista, setSelectedDentista] = useState<DentistaResponse | null>(null)

    // Carregar dentistas
    const loadDentistas = useCallback(async () => {
        try {
            setLoading(true)
            const data = await dentistaService.getAll()
            setDentistas(data)
            setFilteredDentistas(data)
        } catch (error) {
            console.error("Erro ao carregar dentistas:", error)
            toast.error("Erro ao carregar lista de dentistas")
        } finally {
            setLoading(false)
        }
    }, [])

    // Carregar dentistas na inicialização
    useEffect(() => {
        loadDentistas()
    }, [loadDentistas])

    // Handlers para modais
    const handleCreate = () => {
        setSelectedDentista(null)
        setViewMode("create")
    }

    const handleEdit = (dentista: DentistaResponse) => {
        setSelectedDentista(dentista)
        setViewMode("edit")
    }

    const handleView = (dentista: DentistaResponse) => {
        setSelectedDentista(dentista)
        setViewMode("view")
    }

    const handleCloseModal = () => {
        setViewMode("list")
        setSelectedDentista(null)
    }

    const handleSuccess = () => {
        handleCloseModal()
        loadDentistas()
    }

    // Excluir dentista
    const handleDelete = async (dentista: DentistaResponse) => {
        try {
            await dentistaService.delete(dentista.id)
            toast.success("Dentista excluído com sucesso!")
            loadDentistas()
        } catch (error: any) {
            console.error("Erro ao excluir dentista:", error)
            toast.error(error.message || "Erro ao excluir dentista")
        }
    }

    // Filtros e busca
    const handleSearch = useCallback((term: string) => {
        if (!term.trim()) {
            setFilteredDentistas(dentistas)
            return
        }

        const filtered = dentistas.filter(dentista =>
            dentista.nome?.toLowerCase().includes(term.toLowerCase()) ||
            dentista.cro?.toLowerCase().includes(term.toLowerCase()) ||
            dentista.email?.toLowerCase().includes(term.toLowerCase())
        )
        setFilteredDentistas(filtered)
    }, [dentistas])

    const handleFilterByEspecialidade = useCallback((especialidade: string) => {
        if (!especialidade) {
            setFilteredDentistas(dentistas)
            return
        }

        const filtered = dentistas.filter(dentista =>
            dentista.especialidade?.toLowerCase().includes(especialidade.toLowerCase())
        )
        setFilteredDentistas(filtered)
    }, [dentistas])

    // Loading state
    if (loading && viewMode === "list") {
        return (
            <div className="space-y-6">
                <DentistaHeader showCreateButton={false} />
                <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                    <span className="ml-2 text-muted-foreground">Carregando dentistas...</span>
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <DentistaHeader onCreated={handleCreate} />

            {/* Conteúdo Principal */}
            {viewMode === "list" && (
                <>
                    {/* Busca e Filtros */}
                    <DentistaSearch
                        onSearch={handleSearch}
                        onFilterByEspecialidade={handleFilterByEspecialidade}
                    />

                    {/* Lista de Dentistas */}
                    <DentistaList
                        dentistas={filteredDentistas}
                        loading={loading}
                        onEdit={handleEdit}
                        onView={handleView}
                        onDelete={handleDelete}
                    />
                </>
            )}

            {/* Modais */}
            <Modal
                isOpen={viewMode === "create"}
                onClose={handleCloseModal}
                title="Cadastrar Novo Dentista"
                size="lg"
            >
                <DentistaFormCreate
                    onSuccess={handleSuccess}
                    onCancel={handleCloseModal}
                />
            </Modal>

            <Modal
                isOpen={viewMode === "edit" && !!selectedDentista}
                onClose={handleCloseModal}
                title="Editar Dentista"
                size="lg"
            >
                {selectedDentista && (
                    <DentistaFormEdit
                        dentista={selectedDentista}
                        onSuccess={handleSuccess}
                        onCancel={handleCloseModal}
                    />
                )}
            </Modal>

            <Modal
                isOpen={viewMode === "view" && !!selectedDentista}
                onClose={handleCloseModal}
                title="Detalhes do Dentista"
                size="full"
                className={"max-w-5xl"}
            >
                {selectedDentista && (
                    <DentistaComplete
                        dentista={selectedDentista}
                        onClose={handleCloseModal}
                        onEdit={() => handleEdit(selectedDentista)}
                    />
                )}
            </Modal>
        </div>
    )
}