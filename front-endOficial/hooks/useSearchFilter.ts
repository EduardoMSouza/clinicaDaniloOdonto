// hooks/useSearchFilter.ts
import { useState, useMemo } from 'react'

export function useSearchFilter<T>(
    data: T[],
    searchFields: (keyof T)[]
) {
    const [search, setSearch] = useState('')
    const [filters, setFilters] = useState<Record<string, any>>({})

    const filteredData = useMemo(() => {
        return data.filter(item => {
            // Filtro de busca
            const matchesSearch = search === '' ||
                searchFields.some(field => {
                    const fieldValue = item[field]

                    // Se for uma data, converte para o formato brasileiro
                    if (fieldValue instanceof Date) {
                        const dateStr = formatDateToBrazilian(fieldValue)
                        return dateStr.includes(search)
                    }

                    // Se for string ISO de data, converte
                    if (typeof fieldValue === 'string' && isISODateString(fieldValue)) {
                        const date = new Date(fieldValue)
                        const dateStr = formatDateToBrazilian(date)
                        return dateStr.includes(search)
                    }

                    // Para outros tipos
                    return String(fieldValue).toLowerCase().includes(search.toLowerCase())
                })

            // Filtros adicionais
            const matchesFilters = Object.entries(filters).every(([key, value]) => {
                if (!value) return true

                const fieldValue = item[key as keyof T]

                // Se for filtro de data, compara datas
                if (value instanceof Date && fieldValue instanceof Date) {
                    return fieldValue.getTime() === value.getTime()
                }

                // Se for string de data ISO, converte e compara
                if (typeof value === 'string' && isISODateString(value) &&
                    typeof fieldValue === 'string' && isISODateString(fieldValue)) {
                    return new Date(fieldValue).getTime() === new Date(value).getTime()
                }

                return fieldValue === value
            })

            return matchesSearch && matchesFilters
        })
    }, [data, search, filters, searchFields])

    // Função para formatar data no formato brasileiro
    const formatDateToBrazilian = (date: Date): string => {
        const day = date.getDate().toString().padStart(2, '0')
        const month = (date.getMonth() + 1).toString().padStart(2, '0')
        const year = date.getFullYear()
        return `${day}/${month}/${year}`
    }

    // Função para verificar se é uma string de data ISO
    const isISODateString = (str: string): boolean => {
        return /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(str)
    }

    // Função para converter string brasileira para Date
    const parseBrazilianDate = (dateStr: string): Date | null => {
        const match = dateStr.match(/^(\d{2})\/(\d{2})\/(\d{4})$/)
        if (!match) return null

        const [, day, month, year] = match
        return new Date(parseInt(year), parseInt(month) - 1, parseInt(day))
    }

    // Função auxiliar para buscar por data específica
    const searchByDate = (dateField: keyof T, dateStr: string) => {
        const date = parseBrazilianDate(dateStr)
        if (date) {
            setFilter(dateField as string, date)
        }
    }

    const setFilter = (key: string, value: any) => {
        setFilters(prev => ({ ...prev, [key]: value }))
    }

    const clearFilter = (key: string) => {
        setFilters(prev => {
            const newFilters = { ...prev }
            delete newFilters[key]
            return newFilters
        })
    }

    const clearAllFilters = () => {
        setFilters({})
        setSearch('')
    }

    return {
        search,
        setSearch,
        filters,
        setFilter,
        clearFilter,
        clearAllFilters,
        filteredData,
        searchByDate, // Nova função para busca específica por data
        formatDateToBrazilian // Exporta a função de formatação se precisar usar externamente
    }
}