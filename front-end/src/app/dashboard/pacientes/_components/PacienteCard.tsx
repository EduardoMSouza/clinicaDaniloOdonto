"use client"

import Link from "next/link"
import { Pencil, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PacienteResumoResponse } from "@/types/pacientesTypes"

export function PacienteCard({ paciente, onUpdated }: {
    paciente: PacienteResumoResponse
    onUpdated: () => void
}) {

    const formatCPF = (cpf: string) =>
        cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")

    const formatDate = (data: string) =>
        new Date(data).toLocaleDateString("pt-BR")

    const idade = (() => {
        const hoje = new Date()
        const nasc = new Date(paciente.dataNascimento)
        let i = hoje.getFullYear() - nasc.getFullYear()
        const m = hoje.getMonth() - nasc.getMonth()
        if (m < 0 || (m === 0 && hoje.getDate() < nasc.getDate())) i--
        return i
    })()

    const styles = {
        card: `
            bg-[#0f1212] border border-[#1d2222]
            rounded-xl shadow-md p-6 flex flex-col
            justify-between h-full
        `,
        header: `
            flex items-start justify-between mb-4
        `,
        avatar: `
            w-12 h-12 rounded-full 
            bg-[#1c2424] border border-[#263030]
            flex items-center justify-center
            text-emerald-400 font-semibold text-lg
        `,
        name: `text-gray-200 font-semibold`,
        status: `
            px-2 py-0.5 text-xs rounded-full font-medium
        `,
        ativo: `
            bg-emerald-900/20 text-emerald-300 border border-emerald-800
        `,
        inativo: `
            bg-gray-700/20 text-gray-400 border border-gray-700
        `,
        info: `
            text-sm text-gray-400
        `,
        labelStrong: `text-gray-300 font-medium`,
        footer: `
            mt-4 pt-4 border-t border-[#1a1f1f]
            flex items-center justify-between gap-3
        `,
        editBtn: `
            w-full bg-[#111414] border border-[#1d2222]
            hover:bg-[#1c1f1f] hover:text-emerald-400
            text-gray-200
        `,
        viewBtn: `
            w-full bg-[#111414] border border-[#1d2222]
            hover:bg-[#1c1f1f] hover:text-emerald-400
            text-gray-200
        `
    }

    return (
        <div className={styles.card}>

            {/* Header */}
            <div className={styles.header}>
                <div className="flex items-center gap-4">
                    <div className={styles.avatar}>
                        {paciente.nome[0].toUpperCase()}
                    </div>

                    <div>
                        <h3 className={styles.name}>{paciente.nome}</h3>

                        <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-gray-500">
                                {idade} anos
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Info */}
            <div className="space-y-2">
                <p className={styles.info}>
                    <span className={styles.labelStrong}>CPF:</span> {formatCPF(paciente.cpf)}
                </p>

                <p className={styles.info}>
                    <span className={styles.labelStrong}>Nasc:</span> {formatDate(paciente.dataNascimento)}
                </p>

                {paciente.prontuarioNumero && (
                    <p className={styles.info}>
                        <span className={styles.labelStrong}>Pront:</span> {paciente.prontuarioNumero}
                    </p>
                )}
            </div>

            {/* Footer */}
            <div className={styles.footer}>
                {/* Link para página de edição - igual ao criar */}
                <Link
                    href={`/dashboard/pacientes/editar_paciente/${paciente.prontuarioNumero}`}
                    className="flex-1"
                >
                    <Button className={styles.editBtn}>
                        <Pencil className="w-4 h-4 mr-2" />
                        Editar
                    </Button>
                </Link>

                {/* Link para página de detalhes completa */}
                <Link
                    href={`/dashboard/pacientes/paciente_completo/${paciente.prontuarioNumero}`}
                    className="flex-1"
                >
                    <Button className={styles.viewBtn}>
                        Ver Detalhes
                        <ChevronRight className="w-4 h-4 ml-1 opacity-60" />
                    </Button>
                </Link>
            </div>

        </div>
    )
}