"use client"

import { useState } from "react"
import { DentistaCard } from "./DentistaCard"
import type { DentistaResponse } from "@/types/dentistaType"
import { Button } from "@/components/ui/button"

interface DentistaListProps {
    dentistas: DentistaResponse[]
    loading: boolean
    onEdit: (dentista: DentistaResponse) => void
    onView: (dentista: DentistaResponse) => void
    onDelete: (dentista: DentistaResponse) => void
}

// Skeleton Component para loading
function DentistaCardSkeleton() {
    return (
        <div className="border rounded-xl p-5 animate-pulse">
            <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-full bg-muted" />
            </div>
            <div className="space-y-3">
                <div className="h-5 bg-muted rounded w-3/4" />
                <div className="h-3 bg-muted rounded w-1/2" />
                <div className="space-y-2 mt-4">
                    <div className="h-4 bg-muted rounded w-full" />
                    <div className="h-4 bg-muted rounded w-5/6" />
                    <div className="h-4 bg-muted rounded w-4/6" />
                </div>
            </div>
        </div>
    )
}

export function DentistaList({
                                 dentistas,
                                 loading,
                                 onEdit,
                                 onView,
                                 onDelete
                             }: DentistaListProps) {
    const [limit, setLimit] = useState(12)

    const mostrarMais = () => {
        setLimit(prev => prev + 12)
    }

    const dentistasVisiveis = dentistas.slice(0, limit)

    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <DentistaCardSkeleton key={i} />
                ))}
            </div>
        )
    }

    if (dentistas.length === 0) {
        return (
            <div className="text-center py-12 bg-muted/50 rounded-xl border border-dashed border-border">
                <p className="text-muted-foreground">Nenhum dentista encontrado.</p>
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {dentistasVisiveis.map((dentista) => (
                    <DentistaCard
                        key={dentista.id}
                        dentista={dentista}
                        onView={onView}
                        onEdit={onEdit}
                        onDelete={onDelete}
                    />
                ))}
            </div>

            {limit < dentistas.length && (
                <div className="flex justify-start">
                    <Button
                        onClick={mostrarMais}
                        variant="outline"
                        className="px-6 py-3 font-medium"
                    >
                        Carregar mais
                        <span className="text-xs opacity-80 ml-2">
                            ({dentistasVisiveis.length} de {dentistas.length})
                        </span>
                    </Button>
                </div>
            )}
        </div>
    )
}

export default DentistaList