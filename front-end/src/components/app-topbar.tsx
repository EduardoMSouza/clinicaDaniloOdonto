"use client"

import { Bell, Search, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useSidebar } from "@/components/ui/sidebar"

export function AppTopbar() {
    const { toggleSidebar } = useSidebar()

    return (
        <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b bg-card px-6">
            <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleSidebar}>
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
            </Button>

            <div className="flex-1">
                <form className="relative max-w-md">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input type="search" placeholder="Buscar pacientes, dentistas..." className="pl-10" />
                </form>
            </div>

            <div className="flex items-center gap-2">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="relative">
                            <Bell className="h-5 w-5" />
                            <Badge variant="destructive" className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 text-xs">
                                3
                            </Badge>
                            <span className="sr-only">Notificações</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-80">
                        <DropdownMenuLabel>Notificações</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <div className="flex flex-col gap-1">
                                <p className="text-sm font-medium">Nova consulta agendada</p>
                                <p className="text-xs text-muted-foreground">Maria Silva - Hoje às 14:00</p>
                            </div>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <div className="flex flex-col gap-1">
                                <p className="text-sm font-medium">Tratamento concluído</p>
                                <p className="text-xs text-muted-foreground">João Santos - Plano #1234</p>
                            </div>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <div className="flex flex-col gap-1">
                                <p className="text-sm font-medium">Lembrete de pagamento</p>
                                <p className="text-xs text-muted-foreground">Ana Costa - Vence amanhã</p>
                            </div>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                            <Avatar className="h-9 w-9">
                                <AvatarImage src="/placeholder.svg?height=36&width=36" />
                                <AvatarFallback>DC</AvatarFallback>
                            </Avatar>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Perfil</DropdownMenuItem>
                        <DropdownMenuItem>Configurações</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Sair</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    )
}