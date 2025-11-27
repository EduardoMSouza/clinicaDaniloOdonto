"use client"

import { AlertTriangle, LogOut } from "lucide-react"
import { useRouter } from "next/navigation"
import { useSidebar } from "@/components/ui/sidebar"
import { useState } from "react"

// --- MODAL DE CONFIRMAÇÃO ULTRA PREMIUM ---
function ConfirmLogoutModal({ open, onClose, onConfirm }: any) {
    if (!open) return null

    return (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="
        bg-[var(--card)] border border-[var(--border)]
        rounded-2xl p-6 w-[90%] max-w-md
        shadow-2xl shadow-red-900/25
        animate-in fade-in zoom-in duration-200
      ">

                <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-red-600/10 border border-red-600/30 flex items-center justify-center">
                        <AlertTriangle className="w-6 h-6 text-red-600" />
                    </div>
                    <h2 className="text-lg font-bold text-[var(--foreground)]">
                        Encerrar sessão?
                    </h2>
                </div>

                <p className="text-[var(--muted-foreground)] mb-6">
                    Você tem certeza que deseja sair da aplicação?
                </p>

                <div className="flex justify-end gap-2">
                    <button
                        onClick={onClose}
                        className="
              px-4 py-2 rounded-lg text-sm font-medium
              bg-[var(--muted)] text-[var(--foreground)]
              border border-[var(--border)]
              hover:bg-[var(--accent)]
              transition-all
            "
                    >
                        Cancelar
                    </button>

                    <button
                        onClick={onConfirm}
                        className="
              px-4 py-2 rounded-lg text-sm font-semibold
              bg-red-600 text-white
              border border-red-700
              shadow-md hover:shadow-lg
              hover:bg-red-500 active:scale-95
              transition-all
            "
                    >
                        Sair
                    </button>
                </div>
            </div>
        </div>
    )
}

export function LogoutButton() {
    const router = useRouter()
    const { state } = useSidebar()
    const [modalOpen, setModalOpen] = useState(false)

    const isCollapsed = state === "collapsed" || state === "icon"

    const confirmLogout = () => {
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
        document.cookie = "userName=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
        localStorage.clear()
        sessionStorage.clear()
        router.push("/login")
    }

    const handleLogoutClick = () => {
        setModalOpen(true)
    }

    return (
        <>
            <button
                onClick={handleLogoutClick}
                className={`
                group relative w-full
                flex items-center 
                ${isCollapsed ? "justify-center px-0" : "justify-between px-4"}
                py-3 rounded-xl
                font-semibold text-sm
                transition-all duration-300
                active:scale-[0.98]
                overflow-hidden

                // CORES VIBRANTES - Gradiente moderno
                bg-gradient-to-br from-rose-600 via-rose-700 to-rose-800
                text-rose-50
                border border-rose-500/60
                
                // SOMBRA E EFEITOS
                shadow-lg
                shadow-rose-900/25
                hover:shadow-xl
                hover:shadow-rose-900/35
                
                // HOVER ANIMADO
                hover:bg-gradient-to-br hover:from-rose-500 hover:via-rose-600 hover:to-rose-700
                hover:border-rose-400/70
                hover:translate-y-[-1px]
            `}
            >

                {/* GLOW ROSÉ */}
                <span
                    className="
                    absolute inset-0
                    bg-gradient-to-r from-rose-400/0 via-rose-300/15 to-rose-400/0
                    opacity-0 group-hover:opacity-100
                    blur-xl
                    transition-opacity duration-500
                "
                />

                {/* Se sidebar estiver expandido → texto */}
                {!isCollapsed && (
                    <span className="relative z-10 tracking-wide font-medium">
                        Encerrar sessão
                    </span>
                )}

                {/* Ícone com destaque */}
                <div
                    className={`
                    relative z-10 flex items-center justify-center
                    rounded-xl
                    transition-all duration-300
                    backdrop-blur-sm

                    ${isCollapsed
                        ? "w-10 h-10 bg-rose-500/90 border border-rose-400/60 shadow-inner"
                        : "w-9 h-9 bg-rose-500/90 border border-rose-400/60 shadow-inner"
                    }
                    
                    group-hover:bg-rose-400/90
                    group-hover:border-rose-300/70
                    group-hover:scale-105
                `}
                >
                    <LogOut
                        className={`
                        transition-all duration-300
                        ${isCollapsed ? "w-4 h-4" : "w-3.5 h-3.5"}
                        text-rose-100
                        group-hover:text-white
                        group-hover:scale-110
                    `}
                    />
                </div>

                {/* BORDA LUMINOSA */}
                <span
                    className="
                    absolute bottom-0 left-1/2 -translate-x-1/2
                    w-1/3 h-0.5
                    bg-gradient-to-r from-transparent via-rose-300/60 to-transparent
                    opacity-0 group-hover:opacity-100
                    transition-opacity duration-500
                "
                />
            </button>

            {/* Modal */}
            <ConfirmLogoutModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                onConfirm={confirmLogout}
            />
        </>
    )
}