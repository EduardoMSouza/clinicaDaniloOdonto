"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { loginService } from "@/services/loginService"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { LogIn, Eye, EyeOff } from "lucide-react"

export default function LoginPage() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [showPassword, setShowPassword] = useState(false)

    // 🔵 DADOS MOCK PARA TESTE
    const mockLogin = async (email: string, password: string) => {
        // Simula delay de rede
        await new Promise(resolve => setTimeout(resolve, 1500))

        // Credenciais mockadas
        const validCredentials = [
            { email: "admin@dentalcare.com", password: "123456", name: "Administrador" },
            { email: "dentista@email.com", password: "123456", name: "Dr. João" },
            { email: "teste@teste.com", password: "123456", name: "Usuário Teste" }
        ]

        const user = validCredentials.find(
            cred => cred.email === email && cred.password === password
        )

        if (user) {
            return {
                token: "mock-jwt-token-" + Date.now(),
                user: {
                    id: 1,
                    name: user.name,
                    email: user.email,
                    role: "dentist"
                }
            }
        } else {
            throw new Error("Credenciais inválidas")
        }
    }

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()

        // Validação básica
        if (!email || !senha) {
            toast.error("Preencha todos os campos!")
            return
        }

        setLoading(true)

        try {
            // 🔵 USANDO O MOCK EM VEZ DO SERVICE REAL
            const data = await mockLogin(email, senha)
            // const data = await loginService(email, senha) // ← descomente esta linha quando quiser usar o service real

            localStorage.setItem("token", data.token)
            localStorage.setItem("user", JSON.stringify(data.user))

            toast.success(`Bem-vindo, ${data.user.name}!`)
            router.push("/dashboard")

        } catch {
            toast.error("Email ou senha incorretos!")

            // 🔵 SUGESTÕES PARA O USUÁRIO
            toast.info("Tente: admin@dentalcare.com / 123456")
        } finally {
            setLoading(false)
        }
    }

    // 🔵 FUNÇÃO PARA PREENCHIMENTO AUTOMÁTICO (para testes rápidos)
    const fillMockCredentials = (type: string) => {
        if (type === "admin") {
            setEmail("admin@dentalcare.com")
            setSenha("123456")
        } else if (type === "dentista") {
            setEmail("dentista@email.com")
            setSenha("123456")
        }
    }

    return (
        <div className="min-h-screen grid place-items-center bg-background">
            <div className="w-full max-w-md p-8 rounded-2xl shadow-lg medical-card">

                <h1 className="text-3xl font-semibold text-center mb-2 text-primary">
                    DentalCare
                </h1>
                <p className="text-center text-muted-foreground mb-6">
                    Acesse sua conta para continuar
                </p>

                {/* 🔵 BOTÕES PARA PREENCHIMENTO RÁPIDO (apenas para desenvolvimento) */}
                <div className="flex gap-2 mb-4">
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => fillMockCredentials("admin")}
                        className="text-xs"
                    >
                        Admin
                    </Button>
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => fillMockCredentials("dentista")}
                        className="text-xs"
                    >
                        Dentista
                    </Button>
                </div>

                <form onSubmit={handleLogin} className="space-y-5">
                    {/* EMAIL */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium">E-mail</label>
                        <Input
                            type="email"
                            placeholder="seuemail@exemplo.com"
                            value={email}
                            required
                            onChange={(e) => setEmail(e.target.value)}
                            className="bg-background border-muted focus-visible:ring-primary"
                        />
                    </div>

                    {/* SENHA */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Senha</label>
                        <div className="relative">
                            <Input
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                value={senha}
                                required
                                onChange={(e) => setSenha(e.target.value)}
                                className="bg-background border-muted focus-visible:ring-primary pr-10"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground transition"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    {/* BOTÃO DE LOGIN */}
                    <Button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition"
                    >
                        {loading ? (
                            <div className="flex items-center gap-2">
                                <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                                Entrando...
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <LogIn size={18} /> Entrar
                            </div>
                        )}
                    </Button>
                </form>

                {/* 🔵 INSTRUÇÕES PARA TESTE */}
                <div className="mt-6 p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground text-center">
                        <strong>Para teste rápido:</strong><br />
                        Email: admin@dentalcare.com<br />
                        Senha: 123456
                    </p>
                </div>
            </div>
        </div>
    )
}