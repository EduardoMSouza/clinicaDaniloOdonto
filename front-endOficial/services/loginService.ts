export interface LoginResponse {
    token: string
}

export async function loginService(email: string, senha: string): Promise<LoginResponse> {
    const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
    })

    if (!response.ok) {
        throw new Error("Credenciais inválidas")
    }

    const data = await response.json()
    return data
}
