// components/base/BaseCard.tsx
"use client"

import { cn } from "@/lib/utils"
import React from "react";

interface BaseCardField {
    label: string
    value: string | number | React.ReactNode
}

interface BaseCardAction {
    id?: string
    element: React.ReactNode
}

interface BaseCardProps {
    avatar?: React.ReactNode
    title: string
    subtitle?: string
    fields?: BaseCardField[]
    actions?: BaseCardAction[]
    className?: string
    onClick?: () => void
}

export function BaseCard({
                             avatar,
                             title,
                             subtitle,
                             fields = [],
                             actions = [],
                             className,
                             onClick
                         }: BaseCardProps) {
    return (
        <div
            className={cn(
                "group bg-white dark:bg-gray-900 text-gray-900 dark:text-white",
                "border border-gray-200 dark:border-gray-700 rounded-xl p-5",
                "hover:shadow-lg hover:shadow-primary/10",
                "hover:border-primary/40 transition-all duration-300",
                "flex flex-col h-full",
                onClick && "cursor-pointer hover:scale-[1.02]",
                className
            )}
            onClick={onClick}
            role={onClick ? "button" : undefined}
            tabIndex={onClick ? 0 : undefined}
            onKeyDown={onClick ? (e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault()
                    onClick()
                }
            } : undefined}
        >
            {/* Header com Avatar */}
            <div className="flex items-start justify-between mb-4">
                <div className={cn(
                    "w-12 h-12 rounded-full",
                    "bg-gradient-to-br from-primary/10 to-primary/20",
                    "border border-primary/20",
                    "text-primary font-bold text-lg",
                    "flex items-center justify-center",
                    "shadow-sm"
                )}>
                    {avatar}
                </div>
            </div>

            {/* Conteúdo Principal */}
            <div className="flex-1">
                {/* Title */}
                <h2 className={cn(
                    "text-lg font-bold mb-1 line-clamp-2",
                    "transition-colors group-hover:text-primary",
                    "text-gray-900 dark:text-white"
                )}>
                    {title}
                </h2>

                {/* Subtitle */}
                {subtitle && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4 font-medium">
                        {subtitle}
                    </p>
                )}

                {/* Campos Dinâmicos */}
                {fields.length > 0 && (
                    <div className="space-y-3 mb-6">
                        {fields.map((field, index) => (
                            <div
                                key={index}
                                className="flex justify-between items-start text-sm"
                            >
                                <span className="text-gray-500 dark:text-gray-400 font-medium flex-shrink-0 mr-2">
                                    {field.label}
                                </span>
                                <span className={cn(
                                    "font-semibold text-right break-words",
                                    "text-gray-700 dark:text-gray-300",
                                    typeof field.value === 'string' && field.value.length > 20
                                        ? "text-xs"
                                        : "text-sm"
                                )}>
                                    {field.value}
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Ações */}
            {actions.length > 0 && (
                <div className={cn(
                    "grid gap-3 pt-4 border-t border-gray-200 dark:border-gray-700",
                    actions.length === 1 ? "grid-cols-1" :
                        actions.length === 2 ? "grid-cols-2" :
                            actions.length === 3 ? "grid-cols-3" :
                                "grid-cols-2"
                )}>
                    {actions.map((action, index) => (
                        <div key={action.id || index} className="flex-1">
                            {action.element}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

// Componente Skeleton para loading
export function BaseCardSkeleton() {
    return (
        <div className={cn(
            "bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700",
            "rounded-xl p-5 animate-pulse h-full"
        )}>
            {/* Avatar Skeleton */}
            <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-full bg-gray-300 dark:bg-gray-700" />
            </div>

            {/* Title Skeleton */}
            <div className="space-y-3 mb-6">
                <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4" />
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2" />
            </div>

            {/* Fields Skeleton */}
            <div className="space-y-2 mb-6">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="flex justify-between">
                        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/3" />
                        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2" />
                    </div>
                ))}
            </div>

            {/* Actions Skeleton */}
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                {[1, 2].map((i) => (
                    <div key={i} className="h-9 bg-gray-300 dark:bg-gray-700 rounded" />
                ))}
            </div>
        </div>
    )
}

// Variantes do BaseCard
interface BaseCardCompactProps extends Omit<BaseCardProps, 'fields' | 'actions'> {
    description?: string
    metadata?: string
}

export function BaseCardCompact({
                                    avatar,
                                    title,
                                    subtitle,
                                    description,
                                    metadata,
                                    className,
                                    onClick
                                }: BaseCardCompactProps) {
    return (
        <div
            className={cn(
                "group bg-white dark:bg-gray-900",
                "border border-gray-200 dark:border-gray-700 rounded-lg p-4",
                "hover:shadow-md hover:border-primary/30",
                "transition-all duration-200",
                "flex items-center gap-4",
                onClick && "cursor-pointer",
                className
            )}
            onClick={onClick}
        >
            {/* Avatar */}
            <div className={cn(
                "w-10 h-10 rounded-full",
                "bg-gradient-to-br from-primary/10 to-primary/20",
                "border border-primary/20",
                "text-primary font-bold text-sm",
                "flex items-center justify-center flex-shrink-0"
            )}>
                {avatar}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                    {title}
                </h3>
                {subtitle && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                        {subtitle}
                    </p>
                )}
                {description && (
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 line-clamp-2">
                        {description}
                    </p>
                )}
                {metadata && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {metadata}
                    </p>
                )}
            </div>
        </div>
    )
}