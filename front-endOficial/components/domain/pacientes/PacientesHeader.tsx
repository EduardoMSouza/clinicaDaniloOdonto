// components/domain/pacientes/PacienteHeader.tsx
"use client"

import { useRouter } from "next/navigation"
import { UserPlus, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/base/BaseHeaderPage"

interface PacienteHeaderProps {
    onCreated?: () => void
    showCreateButton?: boolean
}

export function PacienteHeader({
                                   onCreated,
                                   showCreateButton = true
                               }: PacienteHeaderProps) {
    const router = useRouter()

    const handleCreateClick = () => {
        if (onCreated) {
            onCreated()
        } else {
            router.push("/dashboard/pacientes/novo_paciente")
        }
    }

    const icon = (
        <div className="p-2.5 rounded-lg bg-primary text-primary-foreground shadow-lg shadow-primary/20">
            <Users className="w-5 h-5" />
        </div>
    )

    const actions = showCreateButton ? (
        <Button
            onClick={handleCreateClick}
            className="bg-primary hover:bg-primary/90"
        >
            <UserPlus className="mr-2 h-4 w-4" />
            Novo Paciente
        </Button>
    ) : null

    return (
        <Header
            title="Pacientes"
            description="Gerencie os pacientes do sistema"
            icon={icon}
            actions={actions}
        />
    )
}