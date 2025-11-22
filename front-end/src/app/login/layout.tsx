import type { Metadata } from "next"
import React from "react";

export const metadata: Metadata = {
    title: "Login - DentalCare",
    description: "Faça login no sistema",
}

export default function LoginLayout({
                                        children,
                                    }: {
    children: React.ReactNode
}) {
    return children
}