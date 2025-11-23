"use client"

import { PacienteCard } from "./PacienteCard"
import type { PacienteResumoType } from "@/types/pacientesTypes"

function PacienteList({
                                 pacientes,
                                 loading,
                                 onUpdated
                             }: {
    pacientes: PacienteResumoType[]
    loading: boolean
    onUpdated: () => void
}) {

    const styles = {
        grid: `
            grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
            gap-6
        `,
        skeleton: `
            h-[180px] bg-[#111414] border border-[#1b1f1f]
            rounded-xl animate-pulse
        `
    }

    if (loading)
        return (
            <div className={styles.grid}>
                <div className={styles.skeleton} />
                <div className={styles.skeleton} />
                <div className={styles.skeleton} />
            </div>
        )

    return (
        <div className={styles.grid}>
            {pacientes.map(p => (
                <PacienteCard
                    key={p.prontuarioNumero}
                    paciente={p}
                    onUpdated={onUpdated}
                />
            ))}
        </div>
    )
}

export default PacienteList
