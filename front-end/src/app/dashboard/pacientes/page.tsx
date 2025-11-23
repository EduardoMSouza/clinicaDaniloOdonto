"use client"

import { useEffect, useState } from "react"

import { toast } from "sonner"
import {PacienteResumoResponse} from "@/types/pacientesTypes";
import {pacienteService} from "@/services/pacientesService";
import {PacientesHeader} from "@/app/dashboard/pacientes/_components/PacientesHeader";
import {PacienteSearch} from "@/app/dashboard/pacientes/_components/PacienteSearch";
import PacienteList from "@/app/dashboard/pacientes/_components/PacienteList";

export default function PacientesPage() {

    const [pacientes, setPacientes] = useState<PacienteResumoResponse[]>([])
    const [search, setSearch] = useState("")
    const [loading, setLoading] = useState(true)

    const carregarPacientes = async () => {
        setLoading(true)
        try {
            const data = await pacienteService.findResumo()
            setPacientes(data)
        } catch {
            toast.error("Erro ao carregar pacientes.")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        carregarPacientes()
    }, [])

    const filtrados = pacientes.filter(p =>
        p.nome.toLowerCase().includes(search.toLowerCase()) ||
        p.cpf.includes(search.replace(/\D/g, "")) ||
        p.prontuarioNumero?.includes(search)
    )

    return (
        <div className="space-y-8 ">

            <PacientesHeader onCreated={carregarPacientes} />

            <PacienteSearch
                search={search}
                setSearch={setSearch}
                total={filtrados.length}
            />

            <PacienteList
                pacientes={filtrados}
                loading={loading}
                onUpdated={carregarPacientes}
            />

        </div>
    )
}
