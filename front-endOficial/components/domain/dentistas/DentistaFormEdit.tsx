// components/domain/dentistas/DentistaFormEdit.tsx
"use client"

import { useState, useEffect } from "react"
import { toast } from "sonner"
import { DentistaResponse } from "@/types/dentistaType"
import { dentistaService } from "@/services/dentistasService"
import { useDentistaForm } from "@/hooks/useDentistaForm"
import { FormInput, FormCheckbox, FormActions } from "@/components/base/forms/FormComponents"
import { User, FileText, Mail, Phone } from "lucide-react"

interface DentistaFormEditProps {
    dentista: DentistaResponse
    onSuccess: () => void
    onCancel: () => void
}

export function DentistaFormEdit({ dentista, onSuccess, onCancel }: DentistaFormEditProps) {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const {
        form,
        fieldErrors,
        setForm,
        handleChange,
        handleBlur,
        validateForm,
        isFormValid
    } = useDentistaForm()

    // Preenche o form quando o dentista muda
    useEffect(() => {
        setForm({
            nome: dentista.nome,
            cro: dentista.cro,
            especialidade: dentista.especialidade,
            telefone: dentista.telefone || "",
            email: dentista.email || "",
            ativo: dentista.ativo
        })
    }, [dentista, setForm])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!validateForm()) {
            toast.error("Por favor, corrija os erros no formulário")
            return
        }

        try {
            setIsSubmitting(true)
            await dentistaService.update(dentista.id, form)
            toast.success("Dentista atualizado com sucesso!")
            onSuccess()
        } catch (err: any) {
            console.error(err)
            toast.error(err.message || "Erro ao atualizar dentista.")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="bg-card border border-border rounded-xl p-6 md:p-8 shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Dados Básicos */}
                    <div className="md:col-span-2">
                        <h3 className="text-lg font-semibold text-card-foreground mb-4 pb-2 border-b border-border">
                            Dados Básicos
                        </h3>
                    </div>

                    <FormInput
                        label="Nome completo*"
                        value={form.nome}
                        onChange={handleChange("nome")}
                        onBlur={handleBlur("nome")}
                        error={fieldErrors.nome}
                        required
                        icon={User}
                    />

                    <FormInput
                        label="CRO*"
                        value={form.cro}
                        onChange={handleChange("cro")}
                        onBlur={handleBlur("cro")}
                        error={fieldErrors.cro}
                        required
                        icon={FileText}
                    />

                    <FormInput
                        label="Especialidade*"
                        value={form.especialidade}
                        onChange={handleChange("especialidade")}
                        onBlur={handleBlur("especialidade")}
                        error={fieldErrors.especialidade}
                        required
                        icon={FileText}
                    />

                    {/* Contato */}
                    <div className="md:col-span-2 mt-4">
                        <h3 className="text-lg font-semibold text-card-foreground mb-4 pb-2 border-b border-border">
                            Contato
                        </h3>
                    </div>

                    <FormInput
                        label="Email"
                        type="email"
                        value={form.email}
                        onChange={handleChange("email")}
                        onBlur={handleBlur("email")}
                        error={fieldErrors.email}
                        icon={Mail}
                    />

                    <FormInput
                        label="Telefone"
                        value={form.telefone}
                        onChange={handleChange("telefone")}
                        onBlur={handleBlur("telefone")}
                        error={fieldErrors.telefone}
                        icon={Phone}
                    />

                    {/* Status */}
                    <div className="md:col-span-2 mt-4">
                        <h3 className="text-lg font-semibold text-card-foreground mb-4 pb-2 border-b border-border">
                            Status
                        </h3>
                        <FormCheckbox
                            label="Dentista ativo"
                            checked={form.ativo}
                            onChange={(checked) => handleChange("ativo")({ target: { value: checked.toString() } } as any)}
                        />
                    </div>
                </div>

                {/* Ações */}
                <FormActions
                    onCancel={onCancel}
                    onSubmit={handleSubmit}
                    isSubmitting={isSubmitting}
                    submitLabel="Salvar Alterações"
                    isValid={isFormValid}
                />
            </div>
        </form>
    )
}