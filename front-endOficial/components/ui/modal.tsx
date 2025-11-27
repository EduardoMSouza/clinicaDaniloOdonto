// components/ui/modal.tsx
"use client"

import { useEffect } from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface ModalProps {
    isOpen: boolean
    onClose: () => void
    title?: string
    children: React.ReactNode
    size?: "sm" | "md" | "lg" | "xl" | "full"
    showCloseButton?: boolean
    closeOnOverlayClick?: boolean
    className?: string
}

export function Modal({
                          isOpen,
                          onClose,
                          title,
                          children,
                          size = "md",
                          showCloseButton = true,
                          closeOnOverlayClick = true,
                          className
                      }: ModalProps) {
    // Fechar modal com ESC key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape" && isOpen) {
                onClose()
            }
        }

        document.addEventListener("keydown", handleEscape)
        return () => document.removeEventListener("keydown", handleEscape)
    }, [isOpen, onClose])

    // Prevenir scroll do body quando modal estiver aberto
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "unset"
        }

        return () => {
            document.body.style.overflow = "unset"
        }
    }, [isOpen])

    if (!isOpen) return null

    const sizeClasses = {
        sm: "max-w-md",
        md: "max-w-lg",
        lg: "max-w-2xl",
        xl: "max-w-4xl",
        full: "max-w-full mx-4"
    }

    const handleOverlayClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget && closeOnOverlayClick) {
            onClose()
        }
    }

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in-0"
            onClick={handleOverlayClick}
        >
            <div
                className={cn(
                    "bg-background rounded-xl shadow-lg w-full max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-200",
                    sizeClasses[size],
                    className
                )}
            >
                {/* Header */}
                {(title || showCloseButton) && (
                    <div className="flex items-center justify-between p-6 border-b border-border">
                        {title && (
                            <h2 className="text-xl font-semibold text-foreground">
                                {title}
                            </h2>
                        )}
                        {showCloseButton && (
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={onClose}
                                className="h-8 w-8 rounded-full hover:bg-muted"
                            >
                                <X className="h-4 w-4" />
                                <span className="sr-only">Fechar</span>
                            </Button>
                        )}
                    </div>
                )}

                {/* Content */}
                <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
                    {children}
                </div>
            </div>
        </div>
    )
}

// Modal Sections para organização do conteúdo
interface ModalSectionProps {
    children: React.ReactNode
    className?: string
}

export function ModalSection({ children, className }: ModalSectionProps) {
    return (
        <div className={cn("p-6", className)}>
            {children}
        </div>
    )
}

// Modal Actions para botões no footer
interface ModalActionsProps {
    children: React.ReactNode
    className?: string
    align?: "start" | "end" | "center" | "between"
}

export function ModalActions({
                                 children,
                                 className,
                                 align = "end"
                             }: ModalActionsProps) {
    const alignClasses = {
        start: "justify-start",
        end: "justify-end",
        center: "justify-center",
        between: "justify-between"
    }

    return (
        <div className={cn(
            "flex items-center gap-3 p-6 border-t border-border bg-muted/50",
            alignClasses[align],
            className
        )}>
            {children}
        </div>
    )
}

// Modal Header para títulos mais complexos
interface ModalHeaderProps {
    children: React.ReactNode
    className?: string
}

export function ModalHeader({ children, className }: ModalHeaderProps) {
    return (
        <div className={cn("p-6 border-b border-border", className)}>
            {children}
        </div>
    )
}

// Modal Body para conteúdo principal
interface ModalBodyProps {
    children: React.ReactNode
    className?: string
    padding?: boolean
}

export function ModalBody({
                              children,
                              className,
                              padding = true
                          }: ModalBodyProps) {
    return (
        <div className={cn(
            "flex-1 overflow-y-auto",
            padding && "p-6",
            className
        )}>
            {children}
        </div>
    )
}

// Modal Footer para ações
interface ModalFooterProps {
    children: React.ReactNode
    className?: string
}

export function ModalFooter({ children, className }: ModalFooterProps) {
    return (
        <div className={cn("p-6 border-t border-border bg-muted/50", className)}>
            {children}
        </div>
    )
}