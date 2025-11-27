"use client"

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import {SiteHeader} from "@/components/layout/site-header";
import {AppSidebar} from "@/components/layout/app-sidebar";


export default function DashboardLayout({ children }) {
    return (
        <SidebarProvider>

            {/* SIDE MENU */}
            <AppSidebar variant="inset" />

            {/* CONTEÚDO */}
            <SidebarInset>
                <SiteHeader />

                <main className="flex-1 p-6">
                    {children}
                </main>
            </SidebarInset>

        </SidebarProvider>
    )
}
