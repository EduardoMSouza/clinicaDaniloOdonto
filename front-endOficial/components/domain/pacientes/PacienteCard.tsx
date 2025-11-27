"use client"

import { Button } from "@/components/ui/button"
import {Pencil, ChevronRight, User, FileText, Calendar} from "lucide-react"
import { BaseCard } from "@/components/base/BaseCard"
import type { PacienteResumoType } from "@/types/pacientesType"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { DeleteButton } from "@/components/domain/shared/ConfirmDeleteModal"
import {formatacoes} from "@/lib/formatacoes";

interface PacienteCardProps {
    paciente: PacienteResumoType
    className?: string
    onDelete?: (p: any) => Promise<void>
}

export function PacienteCard({
                                 paciente,
                                 className,
                                 onDelete
                             }: PacienteCardProps) {
    if (!paciente) {
        return (
            <div className="p-4 border border-red-200 rounded-lg bg-red-50">
                <p className="text-red-600 text-sm">Dados do paciente indisponíveis</p>
            </div>
        )
    }

    const getAvatar = () => {
        if (!paciente.nome) return <User className="w-6 h-6" />

        const initials = paciente.nome
            .split(' ')
            .map(n => n[0] || '')
            .join('')
            .toUpperCase()
            .slice(0, 2)

        return initials || <User className="w-6 h-6" />
    }

    const handleDelete = async () => {
        if (onDelete) {
            await onDelete(paciente)
        }
    }

    const fields = [
        { label: "CPF", value: formatacoes.formatCPF(paciente.cpf) },
        { label: "Data Nascimento", value: formatacoes.formatDataNascimento(paciente.dataNascimento) },
    ]

    const actions = [
        {
            id: "exame_dental",
            element: (
                <Link
                    href={`/dashboard/pacientes/plano-dentais/${paciente.prontuarioNumero}`}
                    className="w-full"
                >
                    <Button variant="outline" size="sm" className="w-full h-9">
                        <FileText className="w-4 h-4 mr-2" />
                        Exame Dental
                    </Button>
                </Link>
            )
        },
        {
            id: "evolucao_tratamento",
            element: (
                <Link
                    href={`/dashboard/pacientes/evolucao_tratamento/${paciente.prontuarioNumero}`}
                    className="w-full"
                >
                    <Button variant="outline" size="sm" className="w-full h-9">
                        <Calendar className="w-4 h-4 mr-2" />
                        Evolução Tratamento
                    </Button>
                </Link>
            )
        },
        {
            id: "editar",
            element: (
                <Link
                    href={`/dashboard/pacientes/editar_paciente/${paciente.prontuarioNumero}`}
                    className="w-full"
                >
                    <Button variant="outline" size="sm" className="w-full h-9">
                        <Pencil className="w-4 h-4 mr-2" />
                        Editar
                    </Button>
                </Link>
            )
        },
        {
            id: "ver",
            element: (
                <Link
                    href={`/dashboard/pacientes/paciente_completo/${paciente.prontuarioNumero}`}
                    className="w-full"
                >
                    <Button size="sm" className="w-full h-9">
                        Ver
                        <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                </Link>
            )
        },
        {
            id: "excluir",
            element: (
                <DeleteButton
                    onDelete={handleDelete}
                    itemName={`${paciente.nome} (Prontuário: ${paciente.prontuarioNumero})`}
                    title="Excluir Paciente"
                    description="Tem certeza que deseja excluir este paciente? Todos os dados serão permanentemente removidos."
                    confirmText="Excluir Paciente"
                    size="sm"
                    className="w-full h-9"
                />
            )
        }
    ]


    return (
        <BaseCard
            avatar={getAvatar()}
            title={paciente.nome || "Nome não informado"}
            subtitle={`Prontuário: ${paciente.prontuarioNumero}`}
            fields={fields}
            actions={actions}
            className={cn("hover:shadow-md transition-all duration-300", className)}
        />
    )
}