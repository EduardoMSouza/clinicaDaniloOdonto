"use client"

import { useState, useEffect } from "react"
import { Search } from "lucide-react"
import { cn } from "@/lib/utils"

interface BaseSearchProps {
    onSearch: (term: string) => void
    delay?: number
    placeholder?: string
    loading?: boolean
    className?: string
}

export function BaseSearch({
                               onSearch,
                               delay = 300,
                               placeholder = "Buscar...",
                               loading = false,
                               className
                           }: BaseSearchProps) {
    const [searchTerm, setSearchTerm] = useState("")

    // Debounce real
    useEffect(() => {
        const handler = setTimeout(() => {
            onSearch(searchTerm)
        }, delay)

        return () => clearTimeout(handler)
    }, [searchTerm, delay, onSearch])

    const clearSearch = () => {
        setSearchTerm("")
        onSearch("")
    }

    return (
        <div
            className={cn(
                "flex items-center bg-card border border-input rounded-lg px-4 py-2.5",
                "w-full transition-all",
                "focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary",
                className
            )}
        >
            <Search className="w-5 h-5 text-muted-foreground mr-2" />

            <input
                type="text"
                placeholder={placeholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="
                    bg-transparent
                    w-full outline-none
                    text-card-foreground
                    placeholder:text-muted-foreground
                "
            />

            {/* Clear button */}
            {!loading && searchTerm !== "" && (
                <button
                    type="button"
                    onClick={clearSearch}
                    className="ml-2 text-muted-foreground hover:text-foreground transition"
                >
                    ×
                </button>
            )}

            {/* Loading (caso use futuramente) */}
            {loading && (
                <div className="ml-2">
                    <div className="w-4 h-4 border-[3px] border-muted-foreground/40 border-t-primary rounded-full animate-spin"></div>
                </div>
            )}
        </div>
    )
}