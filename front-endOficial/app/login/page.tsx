"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { LogIn, Eye, EyeOff } from "lucide-react"

export default function LoginPage() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [showPassword, setShowPassword] = useState(false)

    // Mock para testes rápidos
    const mockLogin = async (email: string, password: string) => {
        await new Promise((resolve) => setTimeout(resolve, 1200))

        const valid = [
            { email: "admin@dentalcare.com", password: "123456", name: "Administrador" }
        ]

        const user = valid.find(u => u.email === email && u.password === password)
        if (!user) throw new Error("Credenciais inválidas")

        return {
            token: "mock-token",
            user: { name: user.name, email: user.email }
        }
    }

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!email || !senha) {
            toast.error("Preencha todos os campos!")
            return
        }

        setLoading(true)

        try {
            const data = await mockLogin(email, senha)
            localStorage.setItem("token", data.token)
            localStorage.setItem("user", JSON.stringify(data.user))

            toast.success(`Bem-vindo, ${data.user.name}!`)
            router.push("/dashboard")
        } catch {
            toast.error("Email ou senha incorretos!")
            toast.info("Use: admin@dentalcare.com / 123456")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen grid place-items-center bg-gradient-to-br from-primary/5 via-background to-primary/10 animate-fadeIn">
            <div className="
                     w-full max-w-md p-8 rounded-2xl shadow-2xl
                     bg-card/95 backdrop-blur-2xl border border-border/60
                     animate-floating-subtle        /* ← efeito flutuante suave */
                     hover:shadow-primary/20 transition-shadow duration-500
                ">
                {/* Logo + Título */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                        DentalCare
                    </h1>
                    <p className="mt-2 text-muted-foreground">
                        Acesse sua conta para continuar
                    </p>
                </div>

                {/* Botão rápido para teste */}
                <div className="flex justify-center mb-6">
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                            setEmail("admin@dentalcare.com")
                            setSenha("123456")
                        }}
                        className="text-xs"
                    >
                        Preencher com Admin
                    </Button>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    {/* Email */}
                    <div className="space-y-2">
                        <Label htmlFor="email">E-mail</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="admin@dentalcare.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="h-11 bg-background/70 border-border focus-visible:ring-primary/50"
                        />
                    </div>

                    {/* Senha */}
                    <div className="space-y-2">
                        <Label htmlFor="password">Senha</Label>
                        <div className="relative">
                            <Input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                                className="h-11 bg-background/70 border-border pr-11 focus-visible:ring-primary/50"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors"
                            >
                                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>
                    </div>

                    {/* Botão Entrar */}
                    <Button
                        type="submit"
                        disabled={loading}
                        className="w-full h-11 font-medium bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-primary/20 transition-all"
                    >
                        {loading ? (
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                                Entrando...
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <LogIn className="w-4 h-4" />
                                Entrar na conta
                            </div>
                        )}
                    </Button>
                </form>

                {/* Card de dica */}
                <div className="mt-8 p-4 bg-primary/5 border border-primary/20 rounded-xl">
                    <p className="text-sm text-center text-muted-foreground">
                        <strong className="text-foreground">Credenciais de teste:</strong><br />
                        <span className="font-mono text-primary">admin@dentalcare.com</span><br />
                        <span className="font-mono text-primary">123456</span>
                    </p>
                </div>
            </div>
        </div>
    )
}