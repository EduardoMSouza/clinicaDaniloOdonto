"use client"

import { Button } from "@/components/ui/button"
import { Users, UserPlus } from "lucide-react"
import { useRouter } from "next/navigation"

export function PacientesHeader({ onCreated }: { onCreated: () => void }) {

    const router = useRouter()

    const styles = {
        container: `
            flex flex-col md:flex-row md:items-center justify-between gap-6
        `,
        titleArea: `space-y-1.5`,
        titleRow: `flex items-center gap-3`,
        icon: `
            p-2.5 rounded-lg bg-[#0f8f71] 
            text-white shadow-lg shadow-[#0f8f71]/20
        `,
        title: `text-2xl font-bold tracking-tight text-gray-100`,
        desc: `text-gray-400 text-sm md:text-base max-w-2xl pl-[3.25rem]`,
        actions: `flex items-center gap-3 pl-[3.25rem] md:pl-0`
    }

    return (
        <div className={styles.container}>

            <div className={styles.titleArea}>
                <div className={styles.titleRow}>
                    <div className={styles.icon}>
                        <Users className="w-6 h-6" />
                    </div>

                    <h1 className={styles.title}>Pacientes</h1>
                </div>

                <p className={styles.desc}>
                    Gerencie os pacientes cadastrados no sistema
                </p>
            </div>

            {/* AÇÕES */}
            <div className={styles.actions}>
                <Button
                    onClick={() => router.push("/dashboard/pacientes/novo_paciente")}
                    className="bg-[#0f8f71] hover:bg-[#0c755d]"
                >
                    <UserPlus className="mr-2 h-4 w-4" />
                    Novo Paciente
                </Button>
            </div>

        </div>
    )
}
