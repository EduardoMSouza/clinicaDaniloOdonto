"use client"

import { Search } from "lucide-react"

export function PacienteSearch({
                                   search,
                                   setSearch,
                                   total
                               }: {
    search: string
    setSearch: (v: string) => void
    total: number
}) {

    const styles = {
        container: `
            w-full flex items-center justify-between
        `,
        inputBox: `
            flex items-center gap-3 flex-1
            bg-[#0e1111] border border-[#1b1f1f]
            px-4 py-2.5 rounded-xl
        `,
        input: `
            flex-1 bg-transparent outline-none 
            text-gray-300 placeholder:text-gray-500
            text-sm
        `,
        total: `
            ml-4 px-4 py-2 text-sm rounded-xl
            border border-[#1b1f1f] text-gray-300
        `
    }

    return (
        <div className={styles.container}>
            <div className={styles.inputBox}>
                <Search className="w-4 h-4 text-gray-500" />
                <input
                    className={styles.input}
                    placeholder="Buscar por nome, CPF ou prontuário..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            <div className={styles.total}>
                Total: <span className="font-semibold text-white">{total}</span>
            </div>
        </div>
    )
}
