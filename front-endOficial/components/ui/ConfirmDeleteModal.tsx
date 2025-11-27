// components/ui/confirm-delete-modal.tsx
"use client"

import { AlertTriangle, Trash2, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ConfirmDeleteModalProps {
    open: boolean
    onClose: () => void
    onConfirm: () => void
    title?: string
    description?: string
    itemName?: string
}

export function ConfirmDeleteModal({
                                       open,
                                       onClose,
                                       onConfirm,
                                       title = "Excluir registro",
                                       description = "Esta ação não pode ser desfeita.",
                                       itemName
                                   }: ConfirmDeleteModalProps) {
    if (!open) return null

    return (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="
                bg-white dark:bg-gray-900 border border-red-200 dark:border-red-800
                rounded-2xl p-6 w-[90%] max-w-md
                shadow-2xl shadow-red-900/20
                animate-in fade-in zoom-in duration-200
            ">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 flex items-center justify-center">
                            <Trash2 className="w-6 h-6 text-red-600 dark:text-red-400" />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                                {title}
                            </h2>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                {description}
                            </p>
                        </div>
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onClose}
                        className="h-8 w-8 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                        <X className="w-4 h-4" />
                    </Button>
                </div>

                {/* Warning Message */}
                <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 mb-6">
                    <div className="flex items-start gap-3">
                        <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
                        <div>
                            <p className="text-sm font-medium text-amber-800 dark:text-amber-300">
                                Atenção
                            </p>
                            <p className="text-sm text-amber-700 dark:text-amber-400 mt-1">
                                {itemName ?
                                    `Tem certeza que deseja excluir "${itemName}"?` :
                                    "Tem certeza que deseja excluir este item?"
                                }
                            </p>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3">
                    <Button
                        variant="outline"
                        onClick={onClose}
                        className="px-6 font-medium border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                        Cancelar
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={onConfirm}
                        className="px-6 font-medium bg-red-600 hover:bg-red-700 border-red-700 shadow-lg hover:shadow-red-900/25"
                    >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Excluir
                    </Button>
                </div>
            </div>
        </div>
    )
}