// app/dashboard/pacientes/novo_paciente/page.tsx
"use client"

import { useRouter } from "next/navigation"
import PacienteFormCreate from "@/components/domain/pacientes/PacienteFormCreate"
import { toast } from "sonner"

export default function NovoPacientePage() {
    const router = useRouter()

    const handleSuccess = () => {
        toast.success("Paciente cadastrado com sucesso!")
        router.push("/dashboard/pacientes")
    }

    const handleCancel = () => {
        router.push("/dashboard/pacientes")
    }

    return (
        <div className="container mx-auto py-6 space-y-6">
            <PacienteFormCreate
                onSuccess={handleSuccess}
                onCancel={handleCancel}
                isPage={true}
            />
        </div>
    )
}