// ============================================================
// ARQUIVO COMPLETO DE FORMATAÇÕES DO SISTEMA
// ============================================================

// ------------------------------------------------------------
// UTILITÁRIA PADRÃO
// ------------------------------------------------------------
const vazio = (value?: string | null) =>
    !value || value.trim() === "" ? "Não informado" : value


// ------------------------------------------------------------
// CPF
// ------------------------------------------------------------
const formatCPF = (cpf?: string | null) => {
    if (!cpf) return "Não informado"
    cpf = cpf.replace(/\D/g, "")
    if (cpf.length !== 11) return cpf
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")
}

const isValidCPF = (cpf: string) => {
    cpf = cpf.replace(/\D/g, "")
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false

    let soma = 0
    let resto

    for (let i = 1; i <= 9; i++)
        soma += parseInt(cpf.charAt(i - 1)) * (11 - i)

    resto = (soma * 10) % 11
    if (resto === 10 || resto === 11) resto = 0
    if (resto !== parseInt(cpf.charAt(9))) return false

    soma = 0
    for (let i = 1; i <= 10; i++)
        soma += parseInt(cpf.charAt(i - 1)) * (12 - i)

    resto = (soma * 10) % 11
    if (resto === 10 || resto === 11) resto = 0

    return resto === parseInt(cpf.charAt(10))
}


// ------------------------------------------------------------
// CNPJ
// ------------------------------------------------------------
const formatCNPJ = (cnpj?: string | null) => {
    if (!cnpj) return "Não informado"
    cnpj = cnpj.replace(/\D/g, "")
    if (cnpj.length !== 14) return cnpj

    return cnpj.replace(
        /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
        "$1.$2.$3/$4-$5"
    )
}


// ------------------------------------------------------------
// RG
// ------------------------------------------------------------
const formatRG = (rg?: string | null) => {
    if (!rg) return "Não informado"
    return rg.replace(/^(\d{2})(\d{3})(\d{3})(\d{1})$/, "$1.$2.$3-$4")
}


// ------------------------------------------------------------
// TELEFONE (com suporte a fixo e celular)
// ------------------------------------------------------------
const formatTelefone = (tel?: string | null) => {
    if (!tel) return "Não informado"
    tel = tel.replace(/\D/g, "")

    if (tel.length === 10) {
        // FIXO: (11) 2222-3333
        return tel.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3")
    }

    if (tel.length === 11) {
        // CELULAR: (11) 98888-7777
        return tel.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3")
    }

    return tel
}


// ------------------------------------------------------------
// CEP
// ------------------------------------------------------------
const formatCEP = (cep?: string | null) => {
    if (!cep) return "Não informado"
    cep = cep.replace(/\D/g, "")
    return cep.replace(/^(\d{5})(\d{3})$/, "$1-$2")
}


// ------------------------------------------------------------
// DATA (ISO → BR)
// ------------------------------------------------------------
const formatDataNascimento = (data?: string | null) => {
    if (!data) return "Não informado"

    const d = new Date(data)
    if (isNaN(d.getTime())) return "Data inválida"

    const dia = String(d.getDate()).padStart(2, "0")
    const mes = String(d.getMonth() + 1).padStart(2, "0")
    const ano = d.getFullYear()

    return `${dia}/${mes}/${ano}`
}

const formatDataHora = (data?: string | null) => {
    if (!data) return "Não informado"

    const d = new Date(data)
    if (isNaN(d.getTime())) return "Data inválida"

    const dia = String(d.getDate()).padStart(2, "0")
    const mes = String(d.getMonth() + 1).padStart(2, "0")
    const ano = d.getFullYear()

    const hora = String(d.getHours()).padStart(2, "0")
    const minuto = String(d.getMinutes()).padStart(2, "0")

    return `${dia}/${mes}/${ano} às ${hora}:${minuto}`
}


// ------------------------------------------------------------
// IDADE
// ------------------------------------------------------------
const calcularIdade = (dataNascimento?: string | null) => {
    if (!dataNascimento) return "-"

    const nascimento = new Date(dataNascimento)
    if (isNaN(nascimento.getTime())) return "-"

    const hoje = new Date()
    let idade = hoje.getFullYear() - nascimento.getFullYear()

    const mes = hoje.getMonth() - nascimento.getMonth()
    if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate()))
        idade--

    return idade
}


// ------------------------------------------------------------
// NOME (capitalização)
// ------------------------------------------------------------
const formatNome = (nome?: string | null) => {
    if (!nome) return "Não informado"
    return nome
        .toLowerCase()
        .replace(/\b\w/g, (letra) => letra.toUpperCase())
}


// ------------------------------------------------------------
// SEXO (banco → visual)
// ------------------------------------------------------------
const formatSexo = (valor?: string | null) => {
    if (!valor) return "Não informado"
    const sexo = valor.toUpperCase()

    if (sexo === "M") return "Masculino"
    if (sexo === "F") return "Feminino"
    return "Outro"
}


// ------------------------------------------------------------
// MOEDA (R$)
// ------------------------------------------------------------
const formatCurrency = (valor?: number | null) => {
    if (valor == null) return "Não informado"
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    })
}


// ------------------------------------------------------------
// BOOLEANOS
// ------------------------------------------------------------
const formatBoolean = (valor?: boolean | null) =>
    valor ? "Sim" : "Não"


// ------------------------------------------------------------
// PRONTUÁRIO
// Ex.: 202500123 → 2025-00123
// ------------------------------------------------------------
const formatProntuario = (prontuario?: string | null) => {
    if (!prontuario) return "Não informado"

    const ano = prontuario.substring(0, 4)
    const numero = prontuario.substring(4).padStart(5, "0")

    return `${ano}-${numero}`
}


// ------------------------------------------------------------
// EXPORT PADRÃO
// ------------------------------------------------------------
export const formatacoes = {
    vazio,

    // Dados pessoais
    formatNome,
    formatSexo,
    calcularIdade,

    // Documentos
    formatCPF,
    isValidCPF,
    formatCNPJ,
    formatRG,

    // Contato
    formatTelefone,
    formatCEP,

    // Datas
    formatDataNascimento,
    formatDataHora,

    // Outros
    formatCurrency,
    formatBoolean,
    formatProntuario,
}
