// hooks/useDentistaForm.ts
import { useState, useCallback } from "react"
import { DentistaRequest } from "@/types/dentistaType"

// Funções de formatação (extraídas dos forms)
export const useDentistaForm = (initialData?: DentistaRequest) => {
    const [form, setForm] = useState<DentistaRequest>(initialData || {
        nome: "",
        cro: "",
        especialidade: "",
        telefone: "",
        email: "",
        ativo: true
    })

    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
    const [touched, setTouched] = useState<Record<string, boolean>>({})

    // Funções de formatação
    const formatNome = useCallback((value: string): string => {
        if (!value) return ""

        let nome = value
            .replace(/[^a-zA-ZÀ-ÿ\s]/g, "")
            .replace(/\s{2,}/g, " ")
            .trimStart()

        const endsWithSpace = nome.endsWith(" ")
        const minusculas = ["de", "da", "do", "dos", "das", "e"]

        if (!endsWithSpace) {
            nome = nome
                .split(" ")
                .map((parte, index) => {
                    if (index > 0 && minusculas.includes(parte.toLowerCase())) {
                        return parte.toLowerCase()
                    }
                    return parte.charAt(0).toUpperCase() + parte.slice(1).toLowerCase()
                })
                .join(" ")
        }

        return nome
    }, [])

    const formatCRO = useCallback((value: string): string => {
        const cleaned = value.replace(/[^a-zA-Z0-9]/g, '')
        const letters = cleaned.replace(/[^a-zA-Z]/g, '').slice(0, 2).toUpperCase()
        const numbers = cleaned.replace(/[^0-9]/g, '').slice(0, 5)

        let formatted = letters
        if (numbers.length > 0) {
            formatted += '-' + numbers
        }
        return formatted
    }, [])

    const formatEspecialidade = useCallback((value: string): string => {
        return value
            .replace(/[^a-zA-ZÀ-ÿ\s]/g, '')
            .replace(/\s+/g, ' ')
            .replace(/(^\w{1})|(\s+\w{1})/g, letra => letra.toUpperCase())
            .trim()
    }, [])

    const formatEmail = useCallback((value: string): string => {
        return value.toLowerCase().replace(/\s+/g, '')
    }, [])

    const formatTelefone = useCallback((value: string): string => {
        const numbers = value.replace(/\D/g, '')
        if (numbers.length <= 10) {
            return numbers
                .replace(/(\d{2})(\d)/, '($1) $2')
                .replace(/(\d{4})(\d)/, '$1-$2')
                .replace(/(-\d{4})\d+?$/, '$1')
        } else {
            return numbers
                .replace(/(\d{2})(\d)/, '($1) $2')
                .replace(/(\d{5})(\d)/, '$1-$2')
                .replace(/(-\d{4})\d+?$/, '$1')
        }
    }, [])

    // Handlers
    const handleChange = useCallback((field: keyof DentistaRequest) =>
        (e: React.ChangeEvent<HTMLInputElement>) => {
            let value = e.target.value

            switch (field) {
                case 'nome': value = formatNome(value); break
                case 'cro': value = formatCRO(value); break
                case 'especialidade': value = formatEspecialidade(value); break
                case 'email': value = formatEmail(value); break
                case 'telefone': value = formatTelefone(value); break
            }

            setForm(prev => ({ ...prev, [field]: value }))

            // Limpa erro do campo quando usuário digita
            if (fieldErrors[field]) {
                setFieldErrors(prev => ({ ...prev, [field]: '' }))
            }
        }, [formatNome, formatCRO, formatEspecialidade, formatEmail, formatTelefone, fieldErrors]
    )

    const handleBlur = useCallback((field: keyof DentistaRequest) => () => {
        setTouched(prev => ({ ...prev, [field]: true }))
    }, [])

    const validateField = useCallback((field: keyof DentistaRequest, value: string) => {
        const errors: string[] = []

        switch (field) {
            case 'nome':
                if (!value.trim()) errors.push("Nome é obrigatório")
                else if (value.length < 3) errors.push("Nome deve ter pelo menos 3 caracteres")
                break
            case 'cro':
                if (!value.trim()) errors.push("CRO é obrigatório")
                else if (!/^[A-Z]{2}-\d{5}$/.test(value)) errors.push("CRO deve ter 2 letras, hífen e 5 números")
                break
            case 'especialidade':
                if (!value.trim()) errors.push("Especialidade é obrigatória")
                else if (value.length < 3) errors.push("Especialidade deve ter pelo menos 3 caracteres")
                break
            case 'email':
                if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) errors.push("Por favor, insira um email válido")
                break
            case 'telefone':
                if (value) {
                    const numbers = value.replace(/\D/g, '')
                    if (numbers.length < 10 || numbers.length > 11) errors.push("Telefone deve ter 10 ou 11 dígitos")
                }
                break
        }

        return errors[0] || ''
    }, [])

    const validateForm = useCallback((): boolean => {
        const errors: Record<string, string> = {}

        Object.keys(form).forEach(field => {
            const error = validateField(field as keyof DentistaRequest, form[field as keyof DentistaRequest] as string)
            if (error) errors[field] = error
        })

        setFieldErrors(errors)
        return Object.keys(errors).length === 0
    }, [form, validateField])

    const isFormValid = useCallback((): boolean => {
        return Boolean(
            form.nome.length >= 3 &&
            /^[A-Z]{2}-\d{5}$/.test(form.cro) &&
            form.especialidade.length >= 3 &&
            (!form.email || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) &&
            (!form.telefone || (form.telefone.replace(/\D/g, '').length >= 10))
        )
    }, [form])

    return {
        form,
        fieldErrors,
        touched,
        setForm,
        handleChange,
        handleBlur,
        validateForm,
        isFormValid: isFormValid(),
        setFieldErrors
    }
}