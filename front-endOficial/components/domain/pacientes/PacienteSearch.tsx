// components/domain/pacientes/PacienteSearch.tsx
"use client"

import { useState, useEffect } from "react"
import { Search, Calendar } from "lucide-react"
import { useDebounce } from "@/hooks/use-debounce"

interface PacienteSearchProps {
    onSearch: (term: string) => void
    onFilterByStatus: (status: string) => void
    onFilterByDate?: (date: string) => void // Nova prop para filtro por data
}

export function PacienteSearch({
                                   onSearch,
                                   onFilterByStatus,
                                   onFilterByDate,
                               }: PacienteSearchProps) {
    const [searchTerm, setSearchTerm] = useState('')
    const [dateFilter, setDateFilter] = useState('')

    // Debounce para pesquisa em tempo real
    const debouncedSearchTerm = useDebounce(searchTerm, 300)

    // Efeito para pesquisa automática quando o termo muda
    useEffect(() => {
        onSearch(debouncedSearchTerm)
    }, [debouncedSearchTerm])

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value)
    }

    const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onFilterByStatus(e.target.value)
    }

    const handleDateFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setDateFilter(value)

        // Aplica o filtro de data se fornecido
        if (onFilterByDate) {
            onFilterByDate(value)
        }
    }

    const clearDateFilter = () => {
        setDateFilter('')
        if (onFilterByDate) {
            onFilterByDate('')
        }
    }

    // Função para formatar placeholder da data
    const formatDatePlaceholder = () => {
        const today = new Date()
        const day = today.getDate().toString().padStart(2, '0')
        const month = (today.getMonth() + 1).toString().padStart(2, '0')
        const year = today.getFullYear()
        return `${day}/${month}/${year}`
    }

    return (
        <div className="flex flex-col gap-6 mb-8">
            <div className="flex flex-col sm:flex-row items-center  gap-4">
                <div className="flex items-center bg-card border border-input rounded-lg px-4 py-2.5 w-full max-w-xl focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all">
                    <Search className="w-5 h-5 text-muted-foreground mr-2" />
                    <input
                        type="text"
                        placeholder="Buscar por nome, CPF, prontuário..."
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

                <div className="flex items-center bg-card border border-input rounded-lg px-4 py-2.5 focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all min-w-[200px]">
                    <Calendar className="w-5 h-5 text-muted-foreground mr-2" />
                    <input
                        type="text"
                        placeholder={formatDatePlaceholder()}
                        value={dateFilter}
                        onChange={handleDateFilterChange}
                        className="bg-transparent w-full outline-none text-card-foreground placeholder:text-muted-foreground text-sm"
                    />
                    {dateFilter && (
                        <button
                            type="button"
                            onClick={clearDateFilter}
                            className="ml-2 text-muted-foreground hover:text-foreground transition-colors"
                        >
                            ×
                        </button>
                    )}
                </div>
            </div>



            {/* Dica de uso */}
            {dateFilter && !isValidBrazilianDate(dateFilter) && (
                <div className="text-sm text-amber-600 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
                    ⚠️ Formato de data inválido. Use DD/MM/AAAA (ex: {formatDatePlaceholder()})
                </div>
            )}
        </div>
    )
}

// Função auxiliar para validar data no formato brasileiro
function isValidBrazilianDate(dateStr: string): boolean {
    const match = dateStr.match(/^(\d{2})\/(\d{2})\/(\d{4})$/)
    if (!match) return false

    const [, day, month, year] = match
    const dayNum = parseInt(day)
    const monthNum = parseInt(month)
    const yearNum = parseInt(year)

    // Validações básicas
    if (monthNum < 1 || monthNum > 12) return false
    if (dayNum < 1 || dayNum > 31) return false
    if (yearNum < 1900 || yearNum > new Date().getFullYear()) return false

    // Validação de fevereiro e meses com 30 dias
    const date = new Date(yearNum, monthNum - 1, dayNum)
    return date.getDate() === dayNum &&
        date.getMonth() === monthNum - 1 &&
        date.getFullYear() === yearNum
}