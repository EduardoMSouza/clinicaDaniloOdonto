export interface Usuario {
    nome: string
    email: string
    funcao: "ADMIN" | "DENTISTA" | "SECRETARIA"
    token: string
}

export function salvarUsuario(usuario: Usuario) {
    localStorage.setItem("usuario", JSON.stringify(usuario))
}

export function obterUsuario(): Usuario | null {
    const data = localStorage.getItem("usuario")
    return data ? JSON.parse(data) : null
}

export function limparUsuario() {
    localStorage.removeItem("usuario")
}
