"use client"

import {useState} from "react"
import {PacienteCard} from "./PacienteCard"
import type {PacienteResumoType} from "@/types/pacientesType"
import {Button} from "@/components/ui/button"

// Skeleton estilizado
function PacienteCardSkeleton() {
    return (
        <div className="border rounded-2xl p-6 bg-card shadow-sm animate-pulse">
            <div className="flex items-start justify-between mb-5">
                <div className="w-14 h-14 rounded-full bg-muted"/>
            </div>
            <div className="space-y-3">
                <div className="h-5 bg-muted rounded w-3/4"/>
                <div className="h-4 bg-muted rounded w-1/2"/>

                <div className="space-y-2 mt-4">
                    <div className="h-4 bg-muted rounded w-full"/>
                    <div className="h-4 bg-muted rounded w-4/5"/>
                    <div className="h-4 bg-muted rounded w-1/2"/>
                </div>
            </div>
        </div>
    )
}

interface PacienteListProps {
    pacientes: PacienteResumoType[],
    loading: boolean,
    onView?: (p: any) => void,
    onEdit?: (p: any) => void,
    onDelete?: (p: any) => Promise<void> // CORRIGIDO O TIPO
}

export function PacienteList({pacientes, loading, onView, onEdit, onDelete}: PacienteListProps) {
    const [limit, setLimit] = useState(12)

    const mostrarMais = () => setLimit(prev => prev + 12)

    const pacientesVisiveis = pacientes.slice(0, limit)

    // Estado de loading
    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({length: 6}).map((_, i) => (
                    <PacienteCardSkeleton key={i}/>
                ))}
            </div>
        )
    }

    // Lista vazia
    if (pacientes.length === 0) {
        return (
            <div className="text-center py-14 bg-muted/40 rounded-xl border border-dashed border-border shadow-sm">
                <p className="text-muted-foreground text-sm">
                    Nenhum paciente encontrado.
                </p>
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-8">

            {/* GRID DE PACIENTES */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {pacientesVisiveis.map((paciente) => (
                    <PacienteCard
                        key={paciente.prontuarioNumero}
                        paciente={paciente}
                        onDelete={onDelete} // PASSA A PROP PARA O PACIENTECARD
                    />
                ))}
            </div>

            {/* BOTÃO CARREGAR MAIS */}
            {limit < pacientes.length && (
                <div className="flex justify-start">
                    <Button
                        onClick={mostrarMais}
                        variant="outline"
                        className="
                            px-6 py-3 font-medium rounded-xl
                            border-primary/20 hover:border-primary
                        "
                    >
                        Carregar mais
                        <span className="text-xs opacity-80 ml-2">
                            ({pacientesVisiveis.length} de {pacientes.length})
                        </span>
                    </Button>
                </div>
            )}
        </div>
    )
}

export default PacienteList