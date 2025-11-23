"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { PacienteType } from "@/types/pacientesTypes"
import { pacienteService } from "@/services/pacientesService"
import PacienteCompleto from "@/app/dashboard/pacientes/_components/PacienteCompleto"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Loader2 } from "lucide-react"
import { toast } from "sonner"

export default function PacienteCompletoPage() {
    const params = useParams()
    const router = useRouter()
    const [paciente, setPaciente] = useState<PacienteType | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const prontuarioNumero = params.prontuarioNumero as string

    useEffect(() => {
        const fetchPaciente = async () => {
            try {
                setLoading(true)
                setError(null)

                if (!prontuarioNumero) {
                    throw new Error("Número do prontuário não informado")
                }

                const pacienteData = await pacienteService.findByProntuarioNumero(prontuarioNumero)
                setPaciente(pacienteData)
            } catch (err: any) {
                console.error("Erro ao buscar paciente:", err)
                setError(err.message || "Erro ao carregar dados do paciente")
                toast.error("Erro ao carregar dados do paciente")
            } finally {
                setLoading(false)
            }
        }

        fetchPaciente()
    }, [prontuarioNumero])

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

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
                <div className="text-center">
                    <h2 className="text-xl font-semibold text-red-400 mb-2">Erro ao carregar paciente</h2>
                    <p className="text-gray-400">{error}</p>
                </div>
                <Button onClick={() => router.push("/dashboard/pacientes")}>
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Voltar para a lista
                </Button>
            </div>
        )
    }

    if (!paciente) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
                <div className="text-center">
                    <h2 className="text-xl font-semibold text-gray-400 mb-2">Paciente não encontrado</h2>
                    <p className="text-gray-500">
                        Não foi encontrado paciente com o prontuário: <strong>{prontuarioNumero}</strong>
                    </p>
                </div>
                <Button onClick={() => router.push("/dashboard/pacientes")}>
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Voltar para a lista
                </Button>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            {/* Header com botão voltar */}
            <div className="flex items-center gap-4">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => router.push("/dashboard/pacientes")}
                    className="flex items-center gap-2"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Voltar
                </Button>
                <div>
                    <h1 className="text-2xl font-bold text-white">Visualizar Paciente</h1>
                    <p className="text-gray-400">
                        Prontuário: <strong>{paciente.prontuarioNumero}</strong>
                    </p>
                </div>
            </div>

            {/* Componente de exibição completa */}
            <PacienteCompleto paciente={paciente} />
        </div>
    )
}