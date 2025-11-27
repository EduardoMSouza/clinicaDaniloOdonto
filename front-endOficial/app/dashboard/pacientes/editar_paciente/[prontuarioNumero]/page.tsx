// app/dashboard/pacientes/editar_paciente/[prontuarioNumero]/page.tsx
"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { PacienteType } from "@/types/pacientesType"
import { pacienteService } from "@/services/pacientesService"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"
import { PacienteFormEdit } from "@/components/domain/pacientes/PacienteFormEdit"

export default function EditarPacientePage() {
    const params = useParams()
    const router = useRouter()
    const [paciente, setPaciente] = useState<PacienteType | null>(null)
    const [loading, setLoading] = useState(true)

    const prontuarioNumero = params.prontuarioNumero as string

    useEffect(() => {
        const fetchPaciente = async () => {
            try {
                setLoading(true)

                if (!prontuarioNumero) {
                    throw new Error("Número do prontuário não informado")
                }

                const pacienteData = await pacienteService.findByProntuarioNumero(prontuarioNumero)
                setPaciente(pacienteData)
            } catch (err: any) {
                console.error("Erro ao buscar paciente:", err)
                toast.error("Erro ao carregar dados do paciente para edição")
                router.push("/dashboard/pacientes")
            } finally {
                setLoading(false)
            }
        }

        fetchPaciente()
    }, [prontuarioNumero, router])

    const handleSuccess = () => {
        toast.success("Paciente atualizado com sucesso!")
        router.push("/dashboard/pacientes")
    }

    const handleCancel = () => {
        router.push("/dashboard/pacientes")
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
                    <p className="text-gray-400">Carregando dados do paciente...</p>
                </div>
            </div>
        )
    }

    if (!paciente) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
                <div className="text-center">
                    <h2 className="text-xl font-semibold text-gray-400 mb-2">Paciente não encontrado</h2>
                    <p className="text-gray-500">
                        Não foi possível carregar os dados do paciente para edição.
                    </p>
                </div>
                <button
                    onClick={handleCancel}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Voltar para a lista
                </button>
            </div>
        )
    }

    return (
        <div className="container mx-auto py-6 space-y-6">
            <PacienteFormEdit
                paciente={paciente}
                onSuccess={handleSuccess}
                onCancel={handleCancel}
                isPage={true}
            />
        </div>
    )
}