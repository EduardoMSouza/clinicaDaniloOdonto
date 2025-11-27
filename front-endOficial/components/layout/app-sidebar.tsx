"use client";

import * as React from "react";
import {
    IconChartBar,
    IconDashboard,
    IconFolder,
    IconInnerShadowTop,
    IconListDetails,
    IconSettings,
} from "@tabler/icons-react";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {LogoutButton} from "@/components/domain/shared/LogoutButton";


const navConfig = {
    user: {
        name: "Dr. Carlos Silva",
        email: "carlos@dentalcare.com",
        avatar: "/avatars/shadcn.jpg",
    },

    navMain: [
        {
            title: "Dashboard",
            url: "/dashboard",
            icon: IconDashboard,
        },
        {
            title: "Pacientes",
            url: "/dashboard/pacientes",
            icon: IconListDetails,
        },
        {
            title: "Agenda",
            url: "/dashboard/agenda",
            icon: IconChartBar,
        },
        {
            title: "Dentistas",
            url: "/dashboard/dentistas",
            icon: IconFolder,
        },
    ],

    navSecondary: [
        {
            title: "Configurações",
            url: "/dashboard/configuracoes",
            icon: IconSettings,
        },
    ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const pathname = usePathname();

    // Função para verificar se a rota está ativa (suporta sub-rotas)
    const isActive = (url: string) => {
        if (url === "/dashboard") {
            return pathname === "/dashboard" || pathname === "/dashboard/";
        }
        return pathname.startsWith(url);
    };

    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            asChild
                            className="data-[slot=sidebar-menu-button]:!p-1.5 hover:bg-primary/10 transition-colors"
                        >
                            <a href="/dashboard">
                                <IconInnerShadowTop className="size-5 text-primary" />
                                <span className="text-base font-semibold text-foreground">
                  Orcish Dashboard
                </span>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                {/* Nav Main - Itens principais com destaque ativo */}
                <SidebarMenu>
                    {navConfig.navMain.map((item) => {
                        const active = isActive(item.url);
                        return (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton
                                    asChild
                                    className={cn(
                                        "transition-all duration-200",
                                        active
                                            ? "bg-primary text-primary-foreground shadow-sm font-medium"
                                            : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                                        "data-[state=open]:bg-primary data-[state=open]:text-primary-foreground"
                                    )}
                                >
                                    <a href={item.url} className="flex items-center gap-3">
                                        <item.icon className={cn("size-5", active && "text-primary-foreground")} />
                                        <span>{item.title}</span>
                                    </a>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        );
                    })}
                </SidebarMenu>

                {/* Nav Secondary - Configurações */}
                {/*

                <SidebarMenu className="mt-auto">
                    {navConfig.navSecondary.map((item) => {
                        const active = isActive(item.url);
                        return (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton
                                    asChild
                                    className={cn(
                                        "transition-all duration-200",
                                        active
                                            ? "bg-primary text-primary-foreground shadow-sm font-medium"
                                            : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                                    )}
                                >
                                    <a href={item.url} className="flex items-center gap-3">
                                        <item.icon className={cn("size-5", active && "text-primary-foreground")} />
                                        <span>{item.title}</span>
                                    </a>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        );
                    })}
                </SidebarMenu>
                */}
            </SidebarContent>

            {/*
            <SidebarFooter>
                <NavUser user={navConfig.user} />
            </SidebarFooter>
            */}
            <SidebarFooter>
                <LogoutButton />
            </SidebarFooter>
        </Sidebar>
    );
}