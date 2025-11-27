"use client"

import { useState, useEffect, useCallback } from "react"
import { Search } from "lucide-react"
import { useDebounce } from "@/hooks/use-debounce"

interface DentistaSearchProps {
    onSearch: (term: string) => void
    onFilterByEspecialidade: (especialidade: string) => void
}

export function DentistaSearch({
                                   onSearch,
                                   onFilterByEspecialidade
                               }: DentistaSearchProps) {
    const [searchTerm, setSearchTerm] = useState('')

    // Debounce para pesquisa em tempo real (opcional)
    const debouncedSearchTerm = useDebounce(searchTerm, 300)

    // Efeito para pesquisa automática quando o termo muda
    useEffect(() => {
        onSearch(debouncedSearchTerm)
    }, [debouncedSearchTerm, onSearch])

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value)
    }

    const handleEspecialidadeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onFilterByEspecialidade(e.target.value)
    }

    return (
        <div className="flex flex-col gap-6 mb-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center bg-card border border-input rounded-lg px-4 py-2.5 w-full max-w-xl focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all">
                    <Search className="w-5 h-5 text-muted-foreground mr-2" />
                    <input
                        type="text"
                        placeholder="Buscar por nome ou CRO..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="bg-transparent w-full outline-none text-card-foreground placeholder:text-muted-foreground"
                    />
                    {searchTerm && (
                        <button
                            type="button"
                            onClick={() => {
                                setSearchTerm('')
                                onSearch('')
                            }}
                            className="ml-2 text-muted-foreground hover:text-foreground transition-colors"
                        >
                            ×
                        </button>
                    )}
                </div>
            </div>

            <div className="flex flex-wrap gap-4">
                <select
                    onChange={handleEspecialidadeChange}
                    defaultValue=""
                    className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary min-w-[180px]"
                >
                    <option value="">Todas especialidades</option>
                    <option value="Ortodontia">Ortodontia</option>
                    <option value="Endodontia">Endodontia</option>
                    <option value="Periodontia">Periodontia</option>
                    <option value="Cirurgia">Cirurgia</option>
                    <option value="Clínico Geral">Clínico Geral</option>
                </select>
            </div>
        </div>
    )
}