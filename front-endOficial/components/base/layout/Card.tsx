"use client"

import { cn } from "@/lib/utils"
import React from "react";

interface CardField {
    label: string
    value: string | number | React.ReactNode
}

interface CardAction {
    id?: string
    element: React.ReactNode
}

interface CardProps {
    avatar?: React.ReactNode
    title: string
    subtitle?: string
    fields?: CardField[]
    actions?: CardAction[]
    className?: string
}

export function BaseCard({avatar, title, subtitle, fields = [], actions = [], className}: CardProps) {
    return (
        <div className={cn(
            `group bg-card text-cardFg border border-border rounded-xl p-5hover:shadow-lg 
                hover:border-primary/40 transition-all duration-300flex flex-col`, className)}>
            {/* Avatar */}
            <div className="flex items-start justify-between mb-4">
                <div
                    className="w-12 h-12 rounded-full bg-muted border border-bordertext-primary font-bold text-lg flex items-center justify-center ">
                    {avatar}
                </div>
            </div>

            {/* Title + Subtitle */}
            <div className="flex-1">
                <h2 className="text-lg font-bold mb-1 line-clamp-1transition-colors group-hover:text-primary">{title}</h2>
                {subtitle && (<p className="text-xs text-muted-foreground uppercase tracking-wider mb-4 font-medium">{subtitle}</p>)}

                {/* Dynamic Fields */}
                <div className="space-y-2 mb-6">
                    {fields.map((f, idx) => (
                        <div key={idx} className="flex justify-between text-sm">
                            <span className="text-muted-foreground">{f.label}</span>
                            <span className="font-medium">{f.value}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Actions */}
            {actions.length > 0 && (
                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-border">{actions.map((a) => (
                    <div key={a.id} className="flex-1"> {a.element} </div>))}
                </div>
            )}
        </div>
    )
}
