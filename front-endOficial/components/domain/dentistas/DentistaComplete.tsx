"use client"

import type React from "react"
import { DentistaResponse } from "@/types/dentistaType"
import { Check, X, User, Phone, Mail, FileText, Edit } from "lucide-react"

interface DentistaCompleteProps {
    dentista: DentistaResponse
    onClose: () => void
    onEdit: (dentista: DentistaResponse) => void
}

export function DentistaComplete({ dentista, onClose, onEdit }: DentistaCompleteProps) {
    if (!dentista) {
        return (
            <div className="p-6 text-center bg-card rounded-xl border border-border">
                <p className="text-muted-foreground">Dentista não encontrado ou dados indisponíveis.</p>
            </div>
        )
    }

    const BooleanBadge = ({ value }: { value: boolean }) =>
        value ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                <Check className="w-3.5 h-3.5" /> Ativo
            </span>
        ) : (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-destructive/10 text-destructive">
                <X className="w-3.5 h-3.5" /> Inativo
            </span>
        )

    const Section = ({
                         title,
                         children,
                         className = ""
                     }: {
        title: string;
        children: React.ReactNode;
        className?: string
    }) => (
        <div className={`bg-card border border-border rounded-xl p-4 shadow-sm ${className}`}>
            <h3 className="text-lg font-semibold text-card-foreground mb-3 pb-2 border-b border-border">
                {title}
            </h3>
            {children}
        </div>
    )

    const Field = ({
                       label,
                       value,
                       icon: Icon,
                       fullWidth = false,
                   }: {
        label: string
        value: any
        icon?: React.ComponentType<{ className?: string }>
        fullWidth?: boolean
    }) => (
        <div className={`flex flex-col gap-1 ${fullWidth ? "col-span-full" : ""}`}>
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                {Icon && <Icon className="w-3.5 h-3.5" />}
                {label}
            </span>
            <span className="text-sm font-medium text-card-foreground break-words">
                {value || "-"}
            </span>
        </div>
    )

    // Avatar com iniciais
    const initials = dentista.nome
        ? dentista.nome.trim().split(" ").map(n => n[0]).slice(0, 2).join("").toUpperCase()
        : null


    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto px-4">
            {/* Sidebar */}
            <div className="space-y-4">
                <div className="bg-card border border-border rounded-xl p-4 shadow-sm text-center">
                    <div className="w-20 h-20 mx-auto bg-primary/10 text-primary rounded-full flex items-center justify-center text-2xl font-bold mb-3 border-2 border-primary/20">
                        {initials || <User className="w-10 h-10" />}
                    </div>
                    <h2 className="text-lg font-bold text-card-foreground">{dentista.nome}</h2>
                    <p className="text-sm text-muted-foreground mt-1">CRO: {dentista.cro}</p>
                    <div className="mt-3">
                        <BooleanBadge value={dentista.ativo} />
                    </div>
                </div>

                <Section title="Informações de Contato">
                    <div className="space-y-3">
                        <Field
                            label="Email"
                            value={dentista.email}
                            icon={Mail}
                        />
                        <Field
                            label="Telefone"
                            value={dentista.telefone}
                            icon={Phone}
                        />
                        <Field
                            label="Especialidade"
                            value={dentista.especialidade}
                            icon={FileText}
                        />
                    </div>
                </Section>
            </div>

            {/* Conteúdo Principal */}
            <div className="lg:col-span-2 space-y-4">
                <Section title="Informações Profissionais">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Field
                            label="Nome Completo"
                            value={dentista.nome}
                            icon={User}
                        />
                        <Field
                            label="CRO"
                            value={dentista.cro}
                            icon={FileText}
                        />
                        <Field
                            label="Especialidade"
                            value={dentista.especialidade}
                            fullWidth
                        />
                    </div>
                </Section>

                <Section title="Dados de Contato">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Field
                            label="Email"
                            value={dentista.email}
                            icon={Mail}
                        />
                        <Field
                            label="Telefone"
                            value={dentista.telefone}
                            icon={Phone}
                        />
                    </div>
                </Section>

                <Section title="Status do Cadastro">
                    <div className="flex items-center justify-between p-3 bg-muted/50 border border-border rounded-lg">
                        <div>
                            <span className="text-sm font-medium text-card-foreground">
                                Status do Profissional
                            </span>
                            <p className="text-sm text-muted-foreground">
                                {dentista.ativo
                                    ? "Dentista ativo no sistema"
                                    : "Dentista inativo no sistema"
                                }
                            </p>
                        </div>
                        <BooleanBadge value={dentista.ativo} />
                    </div>
                </Section>
            </div>
        </div>
    )
}