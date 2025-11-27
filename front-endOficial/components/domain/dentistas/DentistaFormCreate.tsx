// components/domain/dentistas/DentistaFormCreate.tsx
"use client"

import { useState } from "react"
import { toast } from "sonner"
import { dentistaService } from "@/services/dentistasService"
import { useDentistaForm } from "@/hooks/useDentistaForm"
import { FormInput, FormCheckbox, FormActions } from "@/components/base/forms/FormComponents"
import { User, FileText, Mail, Phone } from "lucide-react"

interface DentistaFormCreateProps {
    onSuccess: () => void
    onCancel: () => void
}

export function DentistaFormCreate({ onSuccess, onCancel }: DentistaFormCreateProps) {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const {
        form,
        fieldErrors,
        handleChange,
        handleBlur,
        validateForm,
        isFormValid
    } = useDentistaForm()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!validateForm()) {
            toast.error("Por favor, corrija os erros no formulário")
            return
        }

        try {
            setIsSubmitting(true)
            await dentistaService.create(form)
            toast.success("Dentista criado com sucesso!")
            onSuccess()
        } catch (err: any) {
            console.error(err)
            toast.error(err.message || "Erro ao salvar dentista.")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
            <div className="bg-card border border-border rounded-xl p-6 md:p-8 shadow-sm">
                {/* Header com validação */}
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
                    <h2 className="text-xl font-bold text-card-foreground">
                        Cadastrar Novo Dentista
                    </h2>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                        isFormValid
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300'
                            : 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300'
                    }`}>
                        {isFormValid ? '✓ Formulário válido' : 'Preencha os campos obrigatórios'}
                    </div>
                </div>

                {/* Campos do formulário */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <FormInput
                        label="Nome completo*"
                        value={form.nome}
                        onChange={handleChange("nome")}
                        onBlur={handleBlur("nome")}
                        error={fieldErrors.nome}
                        required
                        icon={User}
                        placeholder="Ex: Dr. João Silva Santos"
                        minLength={3}
                        maxLength={100}
                    />

                    <FormInput
                        label="CRO*"
                        value={form.cro}
                        onChange={handleChange("cro")}
                        onBlur={handleBlur("cro")}
                        error={fieldErrors.cro}
                        required
                        icon={FileText}
                        placeholder="Ex: SP-12345"
                        minLength={8}
                        maxLength={8}
                        helperText={form.cro && !fieldErrors.cro ? `${form.cro.length}/8 caracteres ✓ Formato válido` : undefined}
                    />

                    <FormInput
                        label="Especialidade*"
                        value={form.especialidade}
                        onChange={handleChange("especialidade")}
                        onBlur={handleBlur("especialidade")}
                        error={fieldErrors.especialidade}
                        required
                        icon={FileText}
                        placeholder="Ex: Ortodontia, Implantodontia"
                        minLength={3}
                        maxLength={50}
                    />

                    <FormInput
                        label="Email"
                        type="email"
                        value={form.email}
                        onChange={handleChange("email")}
                        onBlur={handleBlur("email")}
                        error={fieldErrors.email}
                        icon={Mail}
                        placeholder="exemplo@clinica.com"
                    />

                    <FormInput
                        label="Telefone"
                        value={form.telefone}
                        onChange={handleChange("telefone")}
                        onBlur={handleBlur("telefone")}
                        error={fieldErrors.telefone}
                        icon={Phone}
                        placeholder="(11) 99999-9999"
                        maxLength={15}
                    />

                    <div className="col-span-full">
                        <FormCheckbox
                            label="Dentista ativo"
                            checked={form.ativo}
                            onChange={(checked) => handleChange("ativo")({ target: { value: checked.toString() } } as any)}
                        />
                    </div>
                </div>

                {/* Resumo (opcional - pode ser removido se não for necessário) */}

                {/* Ações do formulário */}
                <FormActions
                    onCancel={onCancel}
                    onSubmit={handleSubmit}
                    isSubmitting={isSubmitting}
                    submitLabel="Criar Dentista"
                    isValid={isFormValid}
                />
            </div>
        </form>
    )
}