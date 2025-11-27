"use client"

import { AlertTriangle, Trash2 } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

// --- MODAL DE CONFIRMAÇÃO DE EXCLUSÃO ULTRA PREMIUM ---
function ConfirmDeleteModal({
                                open,
                                onClose,
                                onConfirm,
                                title = "Excluir item",
                                description = "Tem certeza que deseja excluir este item? Esta ação não pode ser desfeita.",
                                confirmText = "Excluir",
                                itemName
                            }: any) {
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
                    <div>
                        <h2 className="text-lg font-bold text-[var(--foreground)]">
                            {title}
                        </h2>
                        {itemName && (
                            <p className="text-sm text-[var(--muted-foreground)] mt-1">
                                {itemName}
                            </p>
                        )}
                    </div>
                </div>

                <p className="text-[var(--muted-foreground)] mb-6">
                    {description}
                </p>

                <div className="flex justify-end gap-2">
                    <button
                        onClick={onClose}
                        className="
                            px-4 py-2 rounded-lg text-sm font-medium
                            bg-[var(--muted)] text-[var(--foreground)]
                            border border-[var(--border)]
                            hover:bg-[var(--accent)]
                            transition-all duration-200
                            hover:scale-105 active:scale-95
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
                            transition-all duration-200
                            hover:scale-105 active:scale-95
                        "
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    )
}

interface DeleteButtonProps {
    // Configurações básicas
    onDelete: () => Promise<void> | void
    itemName?: string
    className?: string

    // Customização do modal
    title?: string
    description?: string
    confirmText?: string

    // Estados
    isDeleting?: boolean
    disabled?: boolean

    // Variantes
    variant?: "default" | "destructive" | "outline"
    size?: "sm" | "md" | "lg"

    // Para uso em sidebar (igual ao LogoutButton)
    isCollapsed?: boolean
}

export function DeleteButton({
                                 onDelete,
                                 itemName,
                                 className,
                                 title = "Confirmar exclusão",
                                 description = "Tem certeza que deseja excluir este item? Esta ação não pode ser desfeita.",
                                 confirmText = "Excluir",
                                 isDeleting = false,
                                 disabled = false,
                                 variant = "destructive",
                                 size = "md",
                                 isCollapsed = false
                             }: DeleteButtonProps) {
    const [modalOpen, setModalOpen] = useState(false)

    const handleDeleteClick = () => {
        if (!disabled) {
            setModalOpen(true)
        }
    }

    const handleConfirmDelete = async () => {
        try {
            await onDelete()
            setModalOpen(false)
        } catch (error) {
            // Erro será tratado pelo componente pai
            console.error("Erro na exclusão:", error)
        }
    }

    // Configurações de tamanho
    const sizeClasses = {
        sm: "py-2 text-xs",
        md: "py-3 text-sm",
        lg: "py-4 text-base"
    }



    const containerSizes = {
        sm: "w-8 h-8",
        md: "w-9 h-9",
        lg: "w-10 h-10"
    }

    // Configurações de variante
    const variantClasses = {
        default: `
            bg-gradient-to-br from-gray-600 via-gray-700 to-gray-800
            text-gray-50 border border-gray-500/60
            shadow-gray-900/25 hover:shadow-gray-900/35
            hover:bg-gradient-to-br hover:from-gray-500 hover:via-gray-600 hover:to-gray-700
            hover:border-gray-400/70
        `,
        destructive: `
            bg-gradient-to-br from-red-600 via-red-700 to-red-800
            text-red-50 border border-red-500/60
            shadow-red-900/25 hover:shadow-red-900/35
            hover:bg-gradient-to-br hover:from-red-500 hover:via-red-600 hover:to-red-700
            hover:border-red-400/70
        `,
        outline: `
            bg-transparent text-red-600 border border-red-600/60
            hover:bg-red-600 hover:text-white
            shadow-red-900/10 hover:shadow-red-900/25
        `
    }

    const glowColors = {
        default: "from-gray-400/0 via-gray-300/15 to-gray-400/0",
        destructive: "from-red-400/0 via-red-300/15 to-red-400/0",
        outline: "from-red-400/0 via-red-300/10 to-red-400/0"
    }



    return (
        <>
            <button
                onClick={handleDeleteClick}
                disabled={disabled || isDeleting}
                className={cn(`
                    group relative w-full
                    flex items-center 
                    ${isCollapsed ? "justify-center px-0" : "justify-between px-4"}
                    ${sizeClasses[size]}
                    rounded-xl font-semibold
                    transition-all duration-300
                    active:scale-[0.98]
                    overflow-hidden
                    disabled:opacity-50 disabled:cursor-not-allowed
                    disabled:hover:transform-none disabled:hover:shadow-none

                    // SOMBRA E EFEITOS
                    shadow-lg hover:shadow-xl
                    hover:translate-y-[-1px]
                `,
                    variantClasses[variant],
                    className
                )}
            >

                {/* GLOW EFFECT */}
                <span
                    className={cn(`
                        absolute inset-0
                        bg-gradient-to-r opacity-0 group-hover:opacity-100
                        blur-xl transition-opacity duration-500
                    `,
                        glowColors[variant]
                    )}
                />

                {/* Se não estiver collapsed → texto */}
                {!isCollapsed && (
                    <span className="relative z-10 tracking-wide font-medium">
                        {isDeleting ? "Excluindo..." : "Excluir"}
                    </span>
                )}

                {/* Ícone com destaque */}
                <div
                    className={cn(`
                        relative z-10 flex items-center justify-center
                        rounded-xl transition-all duration-300
                        backdrop-blur-sm
                        group-hover:scale-105
                        ${containerSizes[size]}
                    `
                    )}
                >
                </div>

                {/* BORDA LUMINOSA */}
                <span
                    className={cn(`
                        absolute bottom-0 left-1/2 -translate-x-1/2
                        w-1/3 h-0.5 opacity-0 group-hover:opacity-100
                        transition-opacity duration-500
                        bg-gradient-to-r from-transparent via-current to-transparent
                    `,
                        variant === "outline" ? "via-red-400/60" : "via-red-300/60"
                    )}
                />
            </button>

            {/* Modal de Confirmação */}
            <ConfirmDeleteModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                onConfirm={handleConfirmDelete}
                title={title}
                description={description}
                confirmText={confirmText}
                itemName={itemName}
            />
        </>
    )
}

// Versão simplificada para uso geral
export function SimpleDeleteButton({ onDelete, itemName, className }: any) {
    return (
        <DeleteButton
            onDelete={onDelete}
            itemName={itemName}
            className={className}
            variant="destructive"
            size="md"
        />
    )
}