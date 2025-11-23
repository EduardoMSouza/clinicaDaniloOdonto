"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { PacienteType } from "@/types/pacientesTypes"
import { pacienteService } from "@/services/pacientesService"
import PacienteFormEdit from "@/app/dashboard/pacientes/_components/PacienteFormEdit"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"

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

                // Busca o paciente completo pelo prontuário
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
            </div>
        )
    }

    return (
        <PacienteFormEdit
            open={true} // Sempre aberto na página
            setOpen={() => router.push("/dashboard/pacientes")}
            paciente={paciente}
            onSuccess={handleSuccess}
            isPage={true} // Indica que é uma página
        />
    )
}