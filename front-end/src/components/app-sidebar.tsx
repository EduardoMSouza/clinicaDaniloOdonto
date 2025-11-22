"use client"

import * as React from "react"
import {
    Calendar,
    Users,
    UserCircle,
    FileText,
    ClipboardList,
    Activity,
    LayoutDashboard,
    Settings,
    ChevronRight,
} from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarHeader,
    SidebarFooter,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const menuItems = [
    {
        title: "Resumo",
        icon: LayoutDashboard,
        url: "/",
    },
    {
        title: "Pacientes",
        icon: Users,
        url: "/pacientes",
    },
    {
        title: "Dentistas",
        icon: UserCircle,
        url: "/dentistas",
    },
    {
        title: "Agenda",
        icon: Calendar,
        url: "/agenda",
    },
]

export function AppSidebar() {
    const [activeItem, setActiveItem] = React.useState("/")

    return (
        <Sidebar>
            <SidebarHeader className="border-b border-sidebar-border p-4">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                        <Activity className="h-6 w-6" />
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold text-sidebar-foreground">DentalCare</h2>
                        <p className="text-xs text-muted-foreground">Sistema de Gestão</p>
                    </div>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Menu Principal</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {menuItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild isActive={activeItem === item.url} onClick={() => setActiveItem(item.url)}>
                                        <a href={item.url}>
                                            <item.icon className="h-4 w-4" />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup>
                    <SidebarGroupLabel>Configurações</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <a href="/configuracoes">
                                        <Settings className="h-4 w-4" />
                                        <span>Configurações</span>
                                    </a>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className="border-t border-sidebar-border p-4">
                <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                        <AvatarImage src="/placeholder.svg?height=36&width=36" />
                        <AvatarFallback>DC</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 overflow-hidden">
                        <p className="text-sm font-medium text-sidebar-foreground">Dr. Carlos Silva</p>
                        <p className="text-xs text-muted-foreground truncate">carlos@dentalcare.com</p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </div>
            </SidebarFooter>
        </Sidebar>
    )
}