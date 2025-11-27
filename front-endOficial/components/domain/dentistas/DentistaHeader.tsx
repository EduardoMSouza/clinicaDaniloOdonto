// components/domain/dentistas/DentistaHeader.tsx
"use client"

import { useRouter } from "next/navigation"
import { UserPlus, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import {Header} from "@/components/base/BaseHeaderPage";


interface DentistaHeaderProps {
    onCreated?: () => void
    showCreateButton?: boolean
}

export function DentistaHeader({
                                   onCreated,
                                   showCreateButton = true
                               }: DentistaHeaderProps) {
    const router = useRouter()

    const handleCreateClick = () => {
        if (onCreated) {
            onCreated()
        } else {
            router.push("/dashboard/dentistas/novo_dentista")
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
            Novo Dentista
        </Button>
    ) : null

    return (
        <Header
            title="Dentistas"
            description="Gerencie os dentistas do sistema"
            icon={icon}
            actions={actions}
        />
    )
}