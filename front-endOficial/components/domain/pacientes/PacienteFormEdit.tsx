// components/domain/pacientes/PacienteFormEdit.tsx
"use client"

import React, { useState, useEffect } from "react"
import { toast } from "sonner"
import {EstadoCivil, PacienteType} from "@/types/pacientesType"
import { pacienteService } from "@/services/pacientesService"
import usePacienteForm from "@/hooks/usePacienteForm"
import {FormInput, FormSelect, FormTextarea, FormActions, FormCheckbox} from "@/components/base/forms/FormComponents"
import {
    User,
    Phone,
    FileText,
    Calendar,
    MapPin,
    Briefcase,
    ArrowLeft,
    Stethoscope,
    AlertTriangle,
    Heart, Droplets
} from "lucide-react"
import { Sexo } from "@/types/pacientesType"
import { Button } from "@/components/ui/button"

interface PacienteFormEditProps {
    paciente: PacienteType
    onSuccess: () => void
    onCancel: () => void
    isPage?: boolean
}

export function PacienteFormEdit({ paciente, onSuccess, onCancel, isPage = false }: PacienteFormEditProps) {
    const [isSubmitting, setIsSubmitting] = useState(false)


    const handleSelectChange = (field: keyof typeof form) => (value: string) => {
        const fakeEvent = {
            target: {
                value,
                type: 'select-one'
            }
        } as React.ChangeEvent<HTMLSelectElement>

        handleChange(field)(fakeEvent)
    }

    const {
        form,
        fieldErrors,
        setForm,
        handleChange,
        handleBlur,
        validateForm,
        isFormValid,
        handleCheckboxChange,
        getFormData
    } = usePacienteForm()

    // Preenche o form quando o paciente muda
    useEffect(() => {
        setForm({
            nome: paciente.nome || "",
            cpf: paciente.cpf || "",
            dataNascimento: paciente.dataNascimento || "",
            sexo: paciente.sexo as Sexo || "",
            telefone: paciente.telefone || "",
            profissao: paciente.profissao || "",
            convenio: paciente.convenio || "",
            numeroInscricao: paciente.numeroInscricao || "",
            enderecoResidencial: paciente.enderecoResidencial || "",
            indicadoPor: paciente.indicadoPor || "",
            status: paciente.status ?? true
        })
    }, [paciente, setForm])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!validateForm()) {
            toast.error("Por favor, corrija os erros no formulário")
            return
        }

        try {
            setIsSubmitting(true)
            await pacienteService.update(paciente.id, getFormData()) // ← CORRIGIDO
            toast.success("Paciente atualizado com sucesso!")
            onSuccess()
        } catch (err: any) {
            console.error(err)
            toast.error(err.message || "Erro ao atualizar paciente.")
        } finally {
            setIsSubmitting(false)
        }
    }


    return (
        <form onSubmit={handleSubmit}>
            <div className={`bg-card border border-border rounded-xl shadow-sm ${isPage ? "p-6" : "p-4"}`}>
                {/* Header personalizado para página */}
                {isPage && (
                    <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
                        <div className="flex items-center gap-4">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={onCancel}
                                className="flex items-center gap-2"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Voltar
                            </Button>
                            <div>
                                <h2 className="text-xl font-bold text-card-foreground">
                                    Editar Paciente
                                </h2>
                                <p className="text-sm text-muted-foreground">
                                    Editando: {paciente.nome} - Prontuário: {paciente.prontuarioNumero}
                                </p>
                            </div>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                            isFormValid
                                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300'
                                : 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300'
                        }`}>
                            {isFormValid ? '✓ Formulário válido' : 'Preencha os campos obrigatórios'}
                        </div>
                    </div>
                )}

                {/* Header para modal */}
                {!isPage && (
                    <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
                        <h2 className="text-xl font-bold text-card-foreground">
                            Editar Paciente
                        </h2>
                        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                            isFormValid
                                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300'
                                : 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300'
                        }`}>
                            {isFormValid ? '✓ Formulário válido' : 'Preencha os campos obrigatórios'}
                        </div>
                    </div>
                )}

                {/* Seção 1: Dados Básicos */}
                <div className="mb-8">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <User className="w-5 h-5" />
                        Dados Básicos
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormInput
                            label="Nome completo*"
                            value={form.nome}
                            onChange={handleChange("nome")}
                            onBlur={handleBlur("nome")}
                            error={fieldErrors.nome}
                            required
                            icon={User}
                            placeholder="Ex: João Silva Santos"
                            minLength={3}
                            maxLength={100}
                        />

                        <FormInput
                            label="CPF"
                            value={form.cpf}
                            onChange={handleChange("cpf")}
                            onBlur={handleBlur("cpf")}
                            error={fieldErrors.cpf}
                            icon={FileText}
                            placeholder="000.000.000-00"
                            maxLength={14}
                        />

                        <FormInput
                            label="RG"
                            value={form.rg}
                            onChange={handleChange("rg")}
                            onBlur={handleBlur("rg")}
                            error={fieldErrors.rg}
                            icon={FileText}
                            placeholder="Número do RG"
                        />

                        <FormInput
                            label="Órgão Expedidor"
                            value={form.orgaoExpedidor}
                            onChange={handleChange("orgaoExpedidor")}
                            onBlur={handleBlur("orgaoExpedidor")}
                            error={fieldErrors.orgaoExpedidor}
                            icon={FileText}
                            placeholder="SSP/SP"
                        />

                        <FormInput
                            label="Data de Nascimento"
                            type="date"
                            value={form.dataNascimento}
                            onChange={handleChange("dataNascimento")}
                            onBlur={handleBlur("dataNascimento")}
                            error={fieldErrors.dataNascimento}
                            icon={Calendar}
                        />

                        <FormSelect
                            label="Sexo"
                            value={form.sexo}
                            onChange={handleSelectChange("sexo")} // ← CORRIGIDO
                            onBlur={handleBlur("sexo")}
                            error={fieldErrors.sexo}
                            icon={User}
                            options={[
                                { value: "", label: "Selecione" },
                                ...Object.values(Sexo).map(s => ({ value: s, label: s }))
                            ]}
                        />

                        <FormInput
                            label="Naturalidade"
                            value={form.naturalidade}
                            onChange={handleChange("naturalidade")}
                            onBlur={handleBlur("naturalidade")}
                            error={fieldErrors.naturalidade}
                            icon={MapPin}
                            placeholder="Cidade de nascimento"
                        />

                        <FormInput
                            label="Nacionalidade"
                            value={form.nacionalidade}
                            onChange={handleChange("nacionalidade")}
                            onBlur={handleBlur("nacionalidade")}
                            error={fieldErrors.nacionalidade}
                            icon={MapPin}
                            placeholder="Nacionalidade"
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

                        <FormInput
                            label="Profissão"
                            value={form.profissao}
                            onChange={handleChange("profissao")}
                            onBlur={handleBlur("profissao")}
                            error={fieldErrors.profissao}
                            icon={Briefcase}
                            placeholder="Ex: Engenheiro, Médico"
                        />

                        <div className="col-span-full">
                            <FormTextarea
                                label="Endereço Residencial"
                                value={form.enderecoResidencial}
                                onChange={handleChange("enderecoResidencial")}
                                onBlur={handleBlur("enderecoResidencial")}
                                error={fieldErrors.enderecoResidencial}
                                icon={MapPin}
                                placeholder="Endereço completo"
                                rows={3}
                            />
                        </div>

                        <FormInput
                            label="Indicado por"
                            value={form.indicadoPor}
                            onChange={handleChange("indicadoPor")}
                            onBlur={handleBlur("indicadoPor")}
                            error={fieldErrors.indicadoPor}
                            icon={User}
                            placeholder="Quem indicou o paciente"
                        />
                    </div>
                </div>

                {/* Seção 2: Convênio Médico */}
                <div className="mb-8">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <FileText className="w-5 h-5" />
                        Convênio Médico
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormInput
                            label="Convênio"
                            value={form.convenio}
                            onChange={handleChange("convenio")}
                            onBlur={handleBlur("convenio")}
                            error={fieldErrors.convenio}
                            icon={FileText}
                            placeholder="Ex: Unimed, Amil"
                        />

                        <FormInput
                            label="Número Inscrição"
                            value={form.numeroInscricao}
                            onChange={handleChange("numeroInscricao")}
                            onBlur={handleBlur("numeroInscricao")}
                            error={fieldErrors.numeroInscricao}
                            icon={FileText}
                            placeholder="Número do convênio"
                        />
                    </div>
                </div>

                {/* Seção 3: Responsável pelo Tratamento */}
                <div className="mb-8">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <User className="w-5 h-5" />
                        Responsável pelo Tratamento
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormInput
                            label="Nome do Responsável"
                            value={form.nomeResponsavel}
                            onChange={handleChange("nomeResponsavel")}
                            onBlur={handleBlur("nomeResponsavel")}
                            error={fieldErrors.nomeResponsavel}
                            icon={User}
                            placeholder="Nome completo do responsável"
                        />

                        <FormInput
                            label="RG do Responsável"
                            value={form.rgResponsavel}
                            onChange={handleChange("rgResponsavel")}
                            onBlur={handleBlur("rgResponsavel")}
                            error={fieldErrors.rgResponsavel}
                            icon={FileText}
                            placeholder="RG do responsável"
                        />

                        <FormInput
                            label="Órgão Expedidor (Resp.)"
                            value={form.orgaoExpedidorResponsavel}
                            onChange={handleChange("orgaoExpedidorResponsavel")}
                            onBlur={handleBlur("orgaoExpedidorResponsavel")}
                            error={fieldErrors.orgaoExpedidorResponsavel}
                            icon={FileText}
                            placeholder="SSP/SP"
                        />

                        <FormInput
                            label="CPF do Responsável"
                            value={form.cpfResponsavel}
                            onChange={handleChange("cpfResponsavel")}
                            onBlur={handleBlur("cpfResponsavel")}
                            error={fieldErrors.cpfResponsavel}
                            icon={FileText}
                            placeholder="CPF do responsável"
                        />

                        <FormSelect
                            label="Estado Civil do Responsável"
                            value={form.estadoCivilResponsavel}
                            onChange={handleSelectChange("estadoCivilResponsavel")} // ← CORRIGIDO
                            onBlur={handleBlur("estadoCivilResponsavel")}
                            error={fieldErrors.estadoCivilResponsavel}
                            icon={User}
                            options={[
                                { value: "", label: "Selecione" },
                                ...Object.values(EstadoCivil).map(ec => ({ value: ec, label: ec }))
                            ]}
                        />

                        <FormInput
                            label="Cônjuge do Responsável"
                            value={form.conjugeResponsavel}
                            onChange={handleChange("conjugeResponsavel")}
                            onBlur={handleBlur("conjugeResponsavel")}
                            error={fieldErrors.conjugeResponsavel}
                            icon={User}
                            placeholder="Nome do cônjuge"
                        />

                        <FormInput
                            label="RG do Cônjuge"
                            value={form.rgConjuge}
                            onChange={handleChange("rgConjuge")}
                            onBlur={handleBlur("rgConjuge")}
                            error={fieldErrors.rgConjuge}
                            icon={FileText}
                            placeholder="RG do cônjuge"
                        />

                        <FormInput
                            label="Órgão Expedidor (Cônjuge)"
                            value={form.orgaoExpedidorConjuge}
                            onChange={handleChange("orgaoExpedidorConjuge")}
                            onBlur={handleBlur("orgaoExpedidorConjuge")}
                            error={fieldErrors.orgaoExpedidorConjuge}
                            icon={FileText}
                            placeholder="SSP/SP"
                        />

                        <FormInput
                            label="CPF do Cônjuge"
                            value={form.cpfConjuge}
                            onChange={handleChange("cpfConjuge")}
                            onBlur={handleBlur("cpfConjuge")}
                            error={fieldErrors.cpfConjuge}
                            icon={FileText}
                            placeholder="CPF do cônjuge"
                        />
                    </div>
                </div>

                {/* Seção 4: Anamnese */}
                <div className="mb-8">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <Stethoscope className="w-5 h-5" />
                        Anamnese
                    </h3>

                    {/* Queixa Principal e Evolução */}
                    <div className="grid grid-cols-1 gap-6 mb-6">
                        <FormTextarea
                            label="Queixa Principal"
                            value={form.queixaPrincipal}
                            onChange={handleChange("queixaPrincipal")}
                            onBlur={handleBlur("queixaPrincipal")}
                            error={fieldErrors.queixaPrincipal}
                            icon={AlertTriangle}
                            placeholder="Descreva a queixa principal do paciente"
                            rows={3}
                        />

                        <FormTextarea
                            label="Evolução da Doença Atual"
                            value={form.evolucaoDoencaAtual}
                            onChange={handleChange("evolucaoDoencaAtual")}
                            onBlur={handleBlur("evolucaoDoencaAtual")}
                            error={fieldErrors.evolucaoDoencaAtual}
                            icon={AlertTriangle}
                            placeholder="Descreva a evolução da doença atual"
                            rows={3}
                        />
                    </div>

                    {/* Condições de Saúde */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
                        <FormCheckbox
                            label="Febre Reumática"
                            checked={form.febreReumatica || false}
                            onChange={handleCheckboxChange("febreReumatica")}
                        />
                        <FormCheckbox
                            label="Hepatite"
                            checked={form.hepatite || false}
                            onChange={handleCheckboxChange("hepatite")}
                        />
                        <FormCheckbox
                            label="Diabetes"
                            checked={form.diabetes || false}
                            onChange={handleCheckboxChange("diabetes")}
                        />
                        <FormCheckbox
                            label="Hipertensão Arterial"
                            checked={form.hipertensaoArterialSistemica || false}
                            onChange={handleCheckboxChange("hipertensaoArterialSistemica")}
                        />
                        <FormCheckbox
                            label="Portador HIV"
                            checked={form.portadorHiv || false}
                            onChange={handleCheckboxChange("portadorHiv")}
                        />
                        <FormCheckbox
                            label="Alteração Coagulação"
                            checked={form.alteracaoCoagulacaoSanguinea || false}
                            onChange={handleCheckboxChange("alteracaoCoagulacaoSanguinea")}
                        />
                        <FormCheckbox
                            label="Reações Alérgicas"
                            checked={form.reacoesAlergicas || false}
                            onChange={handleCheckboxChange("reacoesAlergicas")}
                        />
                        <FormCheckbox
                            label="Doenças Sistêmicas"
                            checked={form.doencasSistemicas || false}
                            onChange={handleCheckboxChange("doencasSistemicas")}
                        />
                        <FormCheckbox
                            label="Internação Recente"
                            checked={form.internacaoRecente || false}
                            onChange={handleCheckboxChange("internacaoRecente")}
                        />
                        <FormCheckbox
                            label="Utilizando Medicação"
                            checked={form.utilizandoMedicacao || false}
                            onChange={handleCheckboxChange("utilizandoMedicacao")}
                        />
                        <FormCheckbox
                            label="Fumante"
                            checked={form.fumante || false}
                            onChange={handleCheckboxChange("fumante")}
                        />
                        <FormCheckbox
                            label="Bebidas Alcoólicas"
                            checked={form.bebidasAlcoolicas || false}
                            onChange={handleCheckboxChange("bebidasAlcoolicas")}
                        />
                    </div>

                    {/* Campos condicionais e detalhes */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {form.fumante && (
                            <>
                                <FormInput
                                    label="Quantidade de Cigarros"
                                    value={form.fumanteQuantidade || ""}
                                    onChange={handleChange("fumanteQuantidade")}
                                    onBlur={handleBlur("fumanteQuantidade")}
                                    error={fieldErrors.fumanteQuantidade}
                                    icon={AlertTriangle}
                                    placeholder="Ex: 10 cigarros/dia"
                                />
                                <FormInput
                                    label="Tempo como Fumante"
                                    value={form.tempoFumo || ""}
                                    onChange={handleChange("tempoFumo")}
                                    onBlur={handleBlur("tempoFumo")}
                                    error={fieldErrors.tempoFumo}
                                    icon={AlertTriangle}
                                    placeholder="Ex: 5 anos"
                                />
                            </>
                        )}

                        {form.reacoesAlergicas && (
                            <FormInput
                                label="Quais Alergias"
                                value={form.problemasAlergicosQuais || ""}
                                onChange={handleChange("problemasAlergicosQuais")}
                                onBlur={handleBlur("problemasAlergicosQuais")}
                                error={fieldErrors.problemasAlergicosQuais}
                                icon={AlertTriangle}
                                placeholder="Descreva as alergias"
                            />
                        )}
                    </div>
                </div>

                {/* Seção 5: Questionário de Saúde */}
                <div className="mb-8">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <Heart className="w-5 h-5" />
                        Questionário de Saúde
                    </h3>

                    {/* Checkboxes do Questionário */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
                        <FormCheckbox
                            label="Sofre de Doença"
                            checked={form.sofreDoenca || false}
                            onChange={handleCheckboxChange("sofreDoenca")}
                        />
                        <FormCheckbox
                            label="Tratamento Médico Atual"
                            checked={form.tratamentoMedicoAtual || false}
                            onChange={handleCheckboxChange("tratamentoMedicoAtual")}
                        />
                        <FormCheckbox
                            label="Gravidez"
                            checked={form.gravidez || false}
                            onChange={handleCheckboxChange("gravidez")}
                        />
                        <FormCheckbox
                            label="Uso de Medicação"
                            checked={form.usoMedicacao || false}
                            onChange={handleCheckboxChange("usoMedicacao")}
                        />
                        <FormCheckbox
                            label="Teve Alergia"
                            checked={form.teveAlergia || false}
                            onChange={handleCheckboxChange("teveAlergia")}
                        />
                        <FormCheckbox
                            label="Foi Operado"
                            checked={form.foiOperado || false}
                            onChange={handleCheckboxChange("foiOperado")}
                        />
                        <FormCheckbox
                            label="Problemas de Cicatrização"
                            checked={form.problemasCicatrizacao || false}
                            onChange={handleCheckboxChange("problemasCicatrizacao")}
                        />
                        <FormCheckbox
                            label="Problemas com Anestesia"
                            checked={form.problemasAnestesia || false}
                            onChange={handleCheckboxChange("problemasAnestesia")}
                        />
                        <FormCheckbox
                            label="Problemas com Hemorragia"
                            checked={form.problemasHemorragia || false}
                            onChange={handleCheckboxChange("problemasHemorragia")}
                        />
                    </div>

                    {/* Campos detalhados */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {form.sofreDoenca && (
                            <FormInput
                                label="Quais Doenças"
                                value={form.sofreDoencaQuais || ""}
                                onChange={handleChange("sofreDoencaQuais")}
                                onBlur={handleBlur("sofreDoencaQuais")}
                                error={fieldErrors.sofreDoencaQuais}
                                icon={Heart}
                                placeholder="Descreva as doenças"
                            />
                        )}

                        {form.usoMedicacao && (
                            <FormInput
                                label="Quais Medicações"
                                value={form.usoMedicacaoQuais || ""}
                                onChange={handleChange("usoMedicacaoQuais")}
                                onBlur={handleBlur("usoMedicacaoQuais")}
                                error={fieldErrors.usoMedicacaoQuais}
                                icon={Heart}
                                placeholder="Descreva as medicações"
                            />
                        )}

                        {form.teveAlergia && (
                            <FormInput
                                label="Quais Alergias"
                                value={form.teveAlergiaQuais || ""}
                                onChange={handleChange("teveAlergiaQuais")}
                                onBlur={handleBlur("teveAlergiaQuais")}
                                error={fieldErrors.teveAlergiaQuais}
                                icon={Heart}
                                placeholder="Descreva as alergias"
                            />
                        )}

                        {form.foiOperado && (
                            <FormInput
                                label="Quais Cirurgias"
                                value={form.foiOperadoQuais || ""}
                                onChange={handleChange("foiOperadoQuais")}
                                onBlur={handleBlur("foiOperadoQuais")}
                                error={fieldErrors.foiOperadoQuais}
                                icon={Heart}
                                placeholder="Descreva as cirurgias"
                            />
                        )}

                        <FormInput
                            label="Telefone do Médico Assistente"
                            value={form.medicoAssistenteTelefone || ""}
                            onChange={handleChange("medicoAssistenteTelefone")}
                            onBlur={handleBlur("medicoAssistenteTelefone")}
                            error={fieldErrors.medicoAssistenteTelefone}
                            icon={Phone}
                            placeholder="Telefone do médico"
                        />
                    </div>

                    {/* Textareas */}
                    <div className="grid grid-cols-1 gap-6 mt-4">
                        <FormTextarea
                            label="Hábitos"
                            value={form.habitos || ""}
                            onChange={handleChange("habitos")}
                            onBlur={handleBlur("habitos")}
                            error={fieldErrors.habitos}
                            icon={User}
                            placeholder="Descreva os hábitos do paciente"
                            rows={2}
                        />

                        <FormTextarea
                            label="Antecedentes Familiares"
                            value={form.antecedentesFamiliares || ""}
                            onChange={handleChange("antecedentesFamiliares")}
                            onBlur={handleBlur("antecedentesFamiliares")}
                            error={fieldErrors.antecedentesFamiliares}
                            icon={User}
                            placeholder="Descreva os antecedentes familiares"
                            rows={2}
                        />
                    </div>
                </div>

                {/* Seção 6: Inspeção Bucal */}
                <div className="mb-8">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <Droplets className="w-5 h-5" />
                        Inspeção Bucal
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <FormInput
                            label="Língua"
                            value={form.lingua || ""}
                            onChange={handleChange("lingua")}
                            onBlur={handleBlur("lingua")}
                            error={fieldErrors.lingua}
                            icon={Droplets}
                            placeholder="Estado da língua"
                        />

                        <FormInput
                            label="Mucosa"
                            value={form.mucosa || ""}
                            onChange={handleChange("mucosa")}
                            onBlur={handleBlur("mucosa")}
                            error={fieldErrors.mucosa}
                            icon={Droplets}
                            placeholder="Estado da mucosa"
                        />

                        <FormInput
                            label="Palato"
                            value={form.palato || ""}
                            onChange={handleChange("palato")}
                            onBlur={handleBlur("palato")}
                            error={fieldErrors.palato}
                            icon={Droplets}
                            placeholder="Estado do palato"
                        />

                        <FormInput
                            label="Lábios"
                            value={form.labios || ""}
                            onChange={handleChange("labios")}
                            onBlur={handleBlur("labios")}
                            error={fieldErrors.labios}
                            icon={Droplets}
                            placeholder="Estado dos lábios"
                        />

                        <FormInput
                            label="Gengivas"
                            value={form.gengivas || ""}
                            onChange={handleChange("gengivas")}
                            onBlur={handleBlur("gengivas")}
                            error={fieldErrors.gengivas}
                            icon={Droplets}
                            placeholder="Estado das gengivas"
                        />

                        <FormInput
                            label="Nariz"
                            value={form.nariz || ""}
                            onChange={handleChange("nariz")}
                            onBlur={handleBlur("nariz")}
                            error={fieldErrors.nariz}
                            icon={Droplets}
                            placeholder="Estado do nariz"
                        />

                        <FormInput
                            label="Face"
                            value={form.face || ""}
                            onChange={handleChange("face")}
                            onBlur={handleBlur("face")}
                            error={fieldErrors.face}
                            icon={Droplets}
                            placeholder="Estado da face"
                        />

                        <FormInput
                            label="Gânglios"
                            value={form.ganglios || ""}
                            onChange={handleChange("ganglios")}
                            onBlur={handleBlur("ganglios")}
                            error={fieldErrors.ganglios}
                            icon={Droplets}
                            placeholder="Estado dos gânglios"
                        />

                        <FormInput
                            label="Glândulas Salivares"
                            value={form.glandulasSalivares || ""}
                            onChange={handleChange("glandulasSalivares")}
                            onBlur={handleBlur("glandulasSalivares")}
                            error={fieldErrors.glandulasSalivares}
                            icon={Droplets}
                            placeholder="Estado das glândulas"
                        />
                    </div>

                    {/* Checkboxes da Inspeção Bucal */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <FormCheckbox
                                label="Alteração de Oclusão"
                                checked={form.alteracaoOclusao || false}
                                onChange={handleCheckboxChange("alteracaoOclusao")}
                            />
                            {form.alteracaoOclusao && (
                                <FormInput
                                    label="Tipo de Alteração"
                                    value={form.alteracaoOclusaoTipo || ""}
                                    onChange={handleChange("alteracaoOclusaoTipo")}
                                    onBlur={handleBlur("alteracaoOclusaoTipo")}
                                    error={fieldErrors.alteracaoOclusaoTipo}
                                    placeholder="Descreva o tipo de alteração"
                                />
                            )}
                        </div>

                        <div className="space-y-4">
                            <FormCheckbox
                                label="Usa Prótese"
                                checked={form.protese || false}
                                onChange={handleCheckboxChange("protese")}
                            />
                            {form.protese && (
                                <FormInput
                                    label="Tipo de Prótese"
                                    value={form.proteseTipo || ""}
                                    onChange={handleChange("proteseTipo")}
                                    onBlur={handleBlur("proteseTipo")}
                                    error={fieldErrors.proteseTipo}
                                    placeholder="Descreva o tipo de prótese"
                                />
                            )}
                        </div>
                    </div>

                    {/* Outras Observações */}
                    <div className="mt-6">
                        <FormTextarea
                            label="Outras Observações"
                            value={form.outrasObservacoes || ""}
                            onChange={handleChange("outrasObservacoes")}
                            onBlur={handleBlur("outrasObservacoes")}
                            error={fieldErrors.outrasObservacoes}
                            icon={FileText}
                            placeholder="Outras observações relevantes"
                            rows={3}
                        />
                    </div>
                </div>

                {/* Ações do formulário */}

            </div>

                {/* Ações */}
                <FormActions
                    onCancel={onCancel}
                    onSubmit={handleSubmit}
                    isSubmitting={isSubmitting}
                    submitLabel="Salvar Alterações"
                    isValid={isFormValid}
                    isPage={isPage}
                />

        </form>
    )
}