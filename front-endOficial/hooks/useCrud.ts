// hooks/useCrud.ts
import { useState, useCallback } from 'react'
import { toast } from 'sonner'
import {DentistaRequest, DentistaResponse} from "@/types/dentistaType";

export function useCrud<T>(service: {
    create: (dentistaData: DentistaRequest) => Promise<DentistaResponse>;
    getAll: () => Promise<DentistaResponse[]>;
    getById: (id: number) => Promise<DentistaResponse>;
    getByCro: (cro: string) => Promise<DentistaResponse>;
    getByEmail: (email: string) => Promise<DentistaResponse>;
    update: (id: number, dentistaData: DentistaRequest) => Promise<DentistaResponse>;
    delete: (id: number) => Promise<void>;
    activate: (id: number) => Promise<DentistaResponse>;
    inactivate: (id: number) => Promise<DentistaResponse>;
    getByStatus: (ativo: boolean) => Promise<DentistaResponse[]>;
    getByEspecialidade: (especialidade: string) => Promise<DentistaResponse[]>;
    searchByNome: (nome: string) => Promise<DentistaResponse[]>;
    checkCroExists: (cro: string) => Promise<boolean>;
    checkEmailExists: (email: string) => Promise<boolean>;
    validateDentista: (dentistaData: DentistaRequest) => string[]
}) {
    const [data, setData] = useState<T[]>([])
    const [loading, setLoading] = useState(true)
    const [selectedItem, setSelectedItem] = useState<T | null>(null)

    const carregarDados = useCallback(async () => {
        setLoading(true)
        try {
            const result = await service.getAll()
            setData(result)
        } catch (error) {
            toast.error('Erro ao carregar dados')
            console.error(error)
        } finally {
            setLoading(false)
        }
    }, [service])

    const toggleStatus = useCallback(async (item: any) => {
        if (!confirm(`Tem certeza que deseja ${item.ativo ? 'inativar' : 'ativar'} este item?`)) return

        try {
            if (service.inactivate && service.activate) {
                item.ativo
                    ? await service.inactivate(item.id)
                    : await service.activate(item.id)

                toast.success(`Item ${item.ativo ? 'inativado' : 'ativado'} com sucesso!`)
                carregarDados()
            }
        } catch (error: any) {
            toast.error(error.message || 'Erro ao alterar status.')
        }
    }, [service, carregarDados])

    return {
        data,
        loading,
        selectedItem,
        setSelectedItem,
        carregarDados,
        toggleStatus
    }
}