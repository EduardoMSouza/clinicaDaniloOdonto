"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { AppSidebar } from "@/components/app-sidebar"
import { AppTopbar } from "@/components/app-topbar"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"

export default function DashboardLayout({
                                            children,
                                        }: {
    children: React.ReactNode
}) {
    const router = useRouter()

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (!token) {
            router.push("/login")
        }
    }, [router])

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <main className="flex-1 p-6">{children}</main>
            </SidebarInset>
        </SidebarProvider>
    )
}