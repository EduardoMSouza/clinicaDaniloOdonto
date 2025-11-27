// hooks/usePacienteForm.ts
"use client"

import { useState, useCallback } from "react"
import { PacienteCreateType, Sexo, EstadoCivil } from "@/types/pacientesType"

interface PacienteFormState extends Omit<PacienteCreateType, 'dataNascimento'> {
    dataNascimento: string
}

interface FieldErrors {
    // Dados básicos
    nome?: string
    cpf?: string
    rg?: string
    orgaoExpedidor?: string
    dataNascimento?: string
    naturalidade?: string
    nacionalidade?: string
    profissao?: string
    enderecoResidencial?: string
    indicadoPor?: string
    sexo?: string
    telefone?: string

    // Responsável
    nomeResponsavel?: string
    rgResponsavel?: string
    orgaoExpedidorResponsavel?: string
    cpfResponsavel?: string
    estadoCivilResponsavel?: string
    conjugeResponsavel?: string
    rgConjuge?: string
    orgaoExpedidorConjuge?: string
    cpfConjuge?: string

    // Convênio
    convenio?: string
    numeroInscricao?: string

    // Anamnese
    fumanteQuantidade?: string
    tempoFumo?: string
    problemasAlergicosQuais?: string
    queixaPrincipal?: string
    evolucaoDoencaAtual?: string

    // Questionário saúde
    sofreDoencaQuais?: string
    usoMedicacaoQuais?: string
    medicoAssistenteTelefone?: string
    teveAlergiaQuais?: string
    foiOperadoQuais?: string
    habitos?: string
    antecedentesFamiliares?: string

    // Inspeção bucal
    lingua?: string
    mucosa?: string
    palato?: string
    labios?: string
    gengivas?: string
    nariz?: string
    face?: string
    ganglios?: string
    glandulasSalivares?: string
    alteracaoOclusaoTipo?: string
    proteseTipo?: string
    outrasObservacoes?: string
}

const initialFormState: PacienteFormState = {
    // Dados básicos
    nome: "",
    cpf: "",
    rg: "",
    orgaoExpedidor: "",
    dataNascimento: "",
    naturalidade: "",
    nacionalidade: "",
    profissao: "",
    enderecoResidencial: "",
    indicadoPor: "",
    sexo: "" as Sexo,
    telefone: "",
    status: true,

    // Responsável pelo tratamento
    nomeResponsavel: "",
    rgResponsavel: "",
    orgaoExpedidorResponsavel: "",
    cpfResponsavel: "",
    estadoCivilResponsavel: "",
    conjugeResponsavel: "",
    rgConjuge: "",
    orgaoExpedidorConjuge: "",
    cpfConjuge: "",

    // Anamnese
    febreReumatica: false,
    hepatite: false,
    diabetes: false,
    hipertensaoArterialSistemica: false,
    portadorHiv: false,
    alteracaoCoagulacaoSanguinea: false,
    reacoesAlergicas: false,
    doencasSistemicas: false,
    internacaoRecente: false,
    utilizandoMedicacao: false,
    fumante: false,
    fumanteQuantidade: "",
    tempoFumo: "",
    bebidasAlcoolicas: false,
    problemasCardiacos: false,
    problemasRenais: false,
    problemasGastricos: false,
    problemasRespiratorios: false,
    problemasAlergicos: false,
    problemasAlergicosQuais: "",
    problemasArticularesOuReumatismo: false,
    queixaPrincipal: "",
    evolucaoDoencaAtual: "",

    // Convênio médico
    convenio: "",
    numeroInscricao: "",

    // Inspeção bucal
    lingua: "",
    mucosa: "",
    palato: "",
    labios: "",
    gengivas: "",
    nariz: "",
    face: "",
    ganglios: "",
    glandulasSalivares: "",
    alteracaoOclusao: false,
    alteracaoOclusaoTipo: "",
    protese: false,
    proteseTipo: "",
    outrasObservacoes: "",

    // Questionário saúde
    sofreDoenca: false,
    sofreDoencaQuais: "",
    tratamentoMedicoAtual: false,
    gravidez: false,
    usoMedicacao: false,
    usoMedicacaoQuais: "",
    medicoAssistenteTelefone: "",
    teveAlergia: false,
    teveAlergiaQuais: "",
    foiOperado: false,
    foiOperadoQuais: "",
    problemasCicatrizacao: false,
    problemasAnestesia: false,
    problemasHemorragia: false,
    habitos: "",
    antecedentesFamiliares: ""
}

function usePacienteForm() {
    const [form, setForm] = useState<PacienteFormState>(initialFormState)
    const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
    const [touchedFields, setTouchedFields] = useState<Set<keyof PacienteFormState>>(new Set())

    // Função para validar um campo específico
    const validateField = useCallback((field: keyof PacienteFormState, value: any): string | undefined => {
        switch (field) {
            case "nome":
                if (!value || value.trim().length === 0) {
                    return "Nome é obrigatório"
                }
                if (value.trim().length < 3) {
                    return "Nome deve ter pelo menos 3 caracteres"
                }
                if (value.trim().length > 100) {
                    return "Nome deve ter no máximo 100 caracteres"
                }
                return undefined

            case "cpf":
                if (value && value.trim().length > 0) {
                    const cleanedCPF = value.replace(/\D/g, '')
                    if (cleanedCPF.length !== 11) {
                        return "CPF deve ter 11 dígitos"
                    }
                    if (/^(\d)\1{10}$/.test(cleanedCPF)) {
                        return "CPF inválido"
                    }
                }
                return undefined

            case "dataNascimento":
                if (value) {
                    const birthDate = new Date(value)
                    const today = new Date()
                    if (birthDate > today) {
                        return "Data de nascimento não pode ser futura"
                    }
                    const age = today.getFullYear() - birthDate.getFullYear()
                    if (age < 1) {
                        return "Paciente deve ter pelo menos 1 ano"
                    }
                    if (age > 150) {
                        return "Data de nascimento inválida"
                    }
                }
                return undefined

            case "sexo":
                if (value && !Object.values(Sexo).includes(value as Sexo)) {
                    return "Sexo inválido"
                }
                return undefined

            case "telefone":
                if (value && value.trim().length > 0) {
                    const cleanedPhone = value.replace(/\D/g, '')
                    if (cleanedPhone.length < 10 || cleanedPhone.length > 11) {
                        return "Telefone deve ter 10 ou 11 dígitos"
                    }
                }
                return undefined

            case "profissao":
                if (value && value.trim().length > 50) {
                    return "Profissão deve ter no máximo 50 caracteres"
                }
                return undefined

            case "convenio":
                if (value && value.trim().length > 50) {
                    return "Convênio deve ter no máximo 50 caracteres"
                }
                return undefined

            case "numeroInscricao":
                if (value && value.trim().length > 20) {
                    return "Número de inscrição deve ter no máximo 20 caracteres"
                }
                return undefined

            case "enderecoResidencial":
                if (value && value.trim().length > 200) {
                    return "Endereço deve ter no máximo 200 caracteres"
                }
                return undefined

            case "indicadoPor":
                if (value && value.trim().length > 100) {
                    return "Campo deve ter no máximo 100 caracteres"
                }
                return undefined

            case "rg":
            case "rgResponsavel":
            case "rgConjuge":
                if (value && value.trim().length > 20) {
                    return "RG deve ter no máximo 20 caracteres"
                }
                return undefined

            case "orgaoExpedidor":
            case "orgaoExpedidorResponsavel":
            case "orgaoExpedidorConjuge":
                if (value && value.trim().length > 20) {
                    return "Órgão expedidor deve ter no máximo 20 caracteres"
                }
                return undefined

            case "naturalidade":
            case "nacionalidade":
                if (value && value.trim().length > 50) {
                    return "Campo deve ter no máximo 50 caracteres"
                }
                return undefined

            case "cpfResponsavel":
            case "cpfConjuge":
                if (value && value.trim().length > 0) {
                    const cleanedCPF = value.replace(/\D/g, '')
                    if (cleanedCPF.length !== 11) {
                        return "CPF deve ter 11 dígitos"
                    }
                }
                return undefined

            case "estadoCivilResponsavel":
                if (value && !Object.values(EstadoCivil).includes(value as EstadoCivil)) {
                    return "Estado civil inválido"
                }
                return undefined

            case "conjugeResponsavel":
            case "nomeResponsavel":
                if (value && value.trim().length > 100) {
                    return "Nome deve ter no máximo 100 caracteres"
                }
                return undefined

            case "fumanteQuantidade":
            case "tempoFumo":
                if (value && value.trim().length > 50) {
                    return "Campo deve ter no máximo 50 caracteres"
                }
                return undefined

            case "problemasAlergicosQuais":
            case "sofreDoencaQuais":
            case "usoMedicacaoQuais":
            case "teveAlergiaQuais":
            case "foiOperadoQuais":
                if (value && value.trim().length > 200) {
                    return "Campo deve ter no máximo 200 caracteres"
                }
                return undefined

            case "medicoAssistenteTelefone":
                if (value && value.trim().length > 0) {
                    const cleanedPhone = value.replace(/\D/g, '')
                    if (cleanedPhone.length < 10 || cleanedPhone.length > 11) {
                        return "Telefone deve ter 10 ou 11 dígitos"
                    }
                }
                return undefined

            case "queixaPrincipal":
            case "evolucaoDoencaAtual":
            case "habitos":
            case "antecedentesFamiliares":
            case "outrasObservacoes":
                if (value && value.trim().length > 500) {
                    return "Campo deve ter no máximo 500 caracteres"
                }
                return undefined

            case "lingua":
            case "mucosa":
            case "palato":
            case "labios":
            case "gengivas":
            case "nariz":
            case "face":
            case "ganglios":
            case "glandulasSalivares":
            case "alteracaoOclusaoTipo":
            case "proteseTipo":
                if (value && value.trim().length > 100) {
                    return "Campo deve ter no máximo 100 caracteres"
                }
                return undefined

            default:
                return undefined
        }
    }, [])

    // Handler genérico para mudanças nos campos
    const handleChange = useCallback((field: keyof PacienteFormState) =>
        (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
            const value = e.target.type === 'checkbox'
                ? (e.target as HTMLInputElement).checked
                : e.target.value

            setForm(prev => ({
                ...prev,
                [field]: value
            }))

            // Se o campo já foi tocado, valida imediatamente
            if (touchedFields.has(field)) {
                const error = validateField(field, value)
                setFieldErrors(prev => ({
                    ...prev,
                    [field]: error
                }))
            }
        }, [touchedFields, validateField])

    // Handler específico para checkboxes (para uso direto)
    const handleCheckboxChange = useCallback((field: keyof PacienteFormState) =>
        (checked: boolean) => {
            setForm(prev => ({
                ...prev,
                [field]: checked
            }))

            // Se o campo já foi tocado, valida imediatamente
            if (touchedFields.has(field)) {
                const error = validateField(field, checked)
                setFieldErrors(prev => ({
                    ...prev,
                    [field]: error
                }))
            }
        }, [touchedFields, validateField])

    // Handler para blur (quando o campo perde o foco)
    const handleBlur = useCallback((field: keyof PacienteFormState) => () => {
        // Marca o campo como tocado
        setTouchedFields(prev => new Set(prev).add(field))

        // Valida o campo
        const error = validateField(field, form[field])
        setFieldErrors(prev => ({
            ...prev,
            [field]: error
        }))
    }, [form, validateField])

    // Função para validar todo o formulário
    const validateForm = useCallback((): boolean => {
        const newErrors: FieldErrors = {}
        let isValid = true

        // Valida apenas campos que foram preenchidos
        Object.keys(form).forEach((field) => {
            const key = field as keyof PacienteFormState
            const value = form[key]

            // Para campos de texto, valida apenas se não estiver vazio
            if (typeof value === 'string' && value.trim() === '') {
                return // Não valida campos vazios (exceto obrigatórios)
            }

            const error = validateField(key, value)
            if (error) {
                // CORREÇÃO: Use type assertion para a chave
                newErrors[key as keyof FieldErrors] = error
                isValid = false
            }
        })

        // Validação especial para campo nome (obrigatório)
        if (!form.nome || form.nome.trim().length === 0) {
            newErrors.nome = "Nome é obrigatório"
            isValid = false
        }

        setFieldErrors(newErrors)

        // Marca todos os campos como tocados para mostrar os erros
        const allFields = Object.keys(initialFormState) as Array<keyof PacienteFormState>
        setTouchedFields(new Set(allFields))

        return isValid
    }, [form, validateField])

    // Função para verificar se o formulário é válido (para feedback em tempo real)
    const isFormValid = useCallback((): boolean => {
        const requiredFields: (keyof PacienteFormState)[] = ['nome']

        for (const field of requiredFields) {
            const error = validateField(field, form[field])
            if (error) return false
        }

        // CORREÇÃO: Verifica se há algum erro usando Object.keys
        return !Object.keys(fieldErrors).some(key =>
            fieldErrors[key as keyof FieldErrors] !== undefined
        )
    }, [form, fieldErrors, validateField])

    // Função para setar o form completo (útil para edição)
    const setFormData = useCallback((data: Partial<PacienteFormState>) => {
        setForm(prev => ({
            ...prev,
            ...data
        }))
    }, [])

    // Função para resetar o formulário
    const resetForm = useCallback(() => {
        setForm(initialFormState)
        setFieldErrors({})
        setTouchedFields(new Set())
    }, [])

    // Função para limpar erros de um campo específico
    const clearFieldError = useCallback((field: keyof PacienteFormState) => {
        setFieldErrors(prev => ({
            ...prev,
            [field]: undefined
        }))
    }, [])

    // Função para obter os dados do formulário no formato correto para a API
    const getFormData = useCallback((): PacienteCreateType => {
        return {
            ...form,
            dataNascimento: form.dataNascimento || undefined
        }
    }, [form])

    return {
        form,
        fieldErrors,
        touchedFields: Array.from(touchedFields),
        handleChange,
        handleCheckboxChange,
        handleBlur,
        validateForm,
        isFormValid: isFormValid(),
        setForm: setFormData,
        resetForm,
        clearFieldError,
        getFormData
    }
}

export default usePacienteForm