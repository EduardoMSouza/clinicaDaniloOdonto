// components/base/Header.tsx
"use client"

import { ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface HeaderProps {
    title: string
    description?: string
    icon?: ReactNode
    actions?: ReactNode
    className?: string
}

export function Header({
                           title,
                           description,
                           icon,
                           actions,
                           className
                       }: HeaderProps) {
    return (
        <div className={cn(
            "flex flex-col md:flex-row md:items-center justify-between gap-6",
            className
        )}>
            {/* Title Area */}
            <div className="space-y-1.5">
                <div className="flex items-center gap-3">
                    {icon && (
                        <div className="flex-shrink-0">
                            {icon}
                        </div>
                    )}
                    <div>
                        <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground">
                            {title}
                        </h1>
                    </div>
                </div>

                {description && (
                    <p className={cn(
                        "text-muted-foreground text-sm md:text-base max-w-2xl",
                        icon ? "pl-10" : "pl-0"
                    )}>
                        {description}
                    </p>
                )}
            </div>

            {/* Actions */}
            {actions && (
                <div className={cn(
                    "flex items-center gap-3",
                    icon ? "pl-10 md:pl-0" : "pl-0"
                )}>
                    {actions}
                </div>
            )}
        </div>
    )
}