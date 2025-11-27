"use client"

import { Button } from "@/components/ui/button"
import { Eye, Edit, Trash2 } from "lucide-react"
import { BaseCard } from "@/components/base/BaseCard"
import { DentistaResponse } from "@/types/dentistaType"
import { cn } from "@/lib/utils"
import { useState } from "react"
import {ConfirmDeleteModal} from "@/components/ui/ConfirmDeleteModal";

interface DentistaCardProps {
    dentista: DentistaResponse
    onView: (dentista: DentistaResponse) => void
    onEdit: (dentista: DentistaResponse) => void
    onDelete: (dentista: DentistaResponse) => void
    className?: string
}

export function DentistaCard({
                                 dentista,
                                 onView,
                                 onEdit,
                                 onDelete,
                                 className
                             }: DentistaCardProps) {
    const [deleteModalOpen, setDeleteModalOpen] = useState(false)

    // Validação de segurança
    if (!dentista) {
        return (
            <div className="p-4 border border-red-200 rounded-lg bg-red-50">
                <p className="text-red-600 text-sm">Dados do dentista indisponíveis</p>
            </div>
        )
    }

    // Avatar com iniciais do nome
    const getAvatar = () => {
        if (!dentista.nome) return "DN"

        const initials = dentista.nome
            .split(' ')
            .map(n => n[0] || '')
            .join('')
            .toUpperCase()
            .slice(0, 2)

        return initials || "DN"
    }

    // Especialidade com fallback
    const getEspecialidade = () => {
        return dentista.especialidade || "Não informada"
    }

    // Telefone formatado
    const formatTelefone = (telefone?: string) => {
        if (!telefone) return "Não informado"

        const cleaned = telefone.replace(/\D/g, '')
        if (cleaned.length === 11) {
            return cleaned.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
        }
        if (cleaned.length === 10) {
            return cleaned.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3')
        }
        return telefone
    }

    // Campos do card
    const fields = [
        {
            label: "CRO",
            value: dentista.cro || "Não informado"
        },
        {
            label: "Especialidade",
            value: getEspecialidade()
        },
        {
            label: "Telefone",
            value: formatTelefone(dentista.telefone)
        }
    ]

    // Ações do card
    const actions = [
        {
            id: "view",
            element: (
                <Button
                    variant="outline"
                    size="sm"
                    className="w-full h-8 px-2"
                    onClick={() => onView(dentista)}
                >
                    <Eye className="w-3.5 h-3.5 mr-1" />
                    Ver
                </Button>
            )
        },
        {
            id: "edit",
            element: (
                <Button
                    variant="outline"
                    size="sm"
                    className="w-full h-9"
                    onClick={() => onEdit(dentista)}
                >
                    <Edit className="w-4 h-4 mr-2" />
                    Editar
                </Button>
            )
        },
        {
            id: "delete",
            element: (
                <Button
                    variant="destructive"
                    size="sm"
                    className="w-full h-9"
                    onClick={() => setDeleteModalOpen(true)}
                >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Excluir
                </Button>
            )
        }
    ]

    const handleConfirmDelete = () => {
        onDelete(dentista)
        setDeleteModalOpen(false)
    }

    return (
        <>
            <BaseCard
                avatar={getAvatar()}
                title={dentista.nome || "Nome não informado"}
                subtitle="Dentista"
                fields={fields}
                actions={actions}
                className={cn("hover:shadow-md transition-all duration-300", className)}
            />

            <ConfirmDeleteModal
                open={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                onConfirm={handleConfirmDelete}
                title="Excluir Dentista"
                description="Esta ação removerá permanentemente o dentista do sistema."
                itemName={dentista.nome}
            />
        </>
    )
}