"use client"

import { ReactNode } from "react"
import { Loader2 } from "lucide-react"

interface BaseListProps<T> {
    items: T[]
    renderItem: (item: T, index: number) => ReactNode
    loading?: boolean
    emptyMessage?: string
}

export function BaseList<T>({items, renderItem, loading = false, emptyMessage = "Nenhum registro encontrado.",}: BaseListProps<T>) {
    if (loading) {
        return (
            <div className="flex items-center justify-center py-16 text-muted-foreground">
                <Loader2 className="w-6 h-6 animate-spin" />
            </div>
        )
    }

    if (!loading && items.length === 0) {
        return (
            <div className="flex items-center justify-center py-16">
                <p className="text-sm text-muted-foreground">{emptyMessage}</p>
            </div>
        )
    }

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {items.map((item, idx) => (
                <div key={idx}>{renderItem(item, idx)}</div>))}
        </div>
    )
}
