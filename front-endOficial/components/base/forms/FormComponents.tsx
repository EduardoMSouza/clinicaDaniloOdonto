// components/base/form/FormComponents.tsx
"use client"

import React from "react"
import {Check, ChevronDown} from "lucide-react"
import {cn} from "@/lib/utils"

// Textarea Component
interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label: string
    icon?: React.ComponentType<{ className?: string }>
    error?: string
    helperText?: string
}

export const FormTextarea = ({
                                 label,
                                 icon: Icon,
                                 error,
                                 helperText,
                                 className,
                                 rows = 3,
                                 ...props
                             }: TextareaProps) => (
    <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-card-foreground flex items-center gap-1.5">
            {Icon && <Icon className="w-3.5 h-3.5"/>}
            {label}
        </label>
        <textarea
            rows={rows}
            {...props}
            className={cn(
                "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm",
                "placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20",
                "focus:border-primary disabled:cursor-not-allowed disabled:opacity-50 transition-colors resize-vertical",
                error && "border-destructive focus:border-destructive focus:ring-destructive/20",
                className
            )}
        />
        {error && (
            <p className="text-destructive text-xs flex items-center gap-1">
                ⚠️ {error}
            </p>
        )}
        {helperText && !error && (
            <p className="text-muted-foreground text-xs">{helperText}</p>
        )}
    </div>
)

// Select Component
interface SelectOption {
    value: string
    label: string
}

interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
    label: string
    icon?: React.ComponentType<{ className?: string }>
    error?: string
    helperText?: string
    options: SelectOption[]
    onChange?: (value: string) => void
}

export const FormSelect = ({
                               label,
                               icon: Icon,
                               error,
                               helperText,
                               options,
                               className,
                               onChange,
                               ...props
                           }: SelectProps) => {
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (onChange) {
            onChange(e.target.value)
        }
    }

    return (
        <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-card-foreground flex items-center gap-1.5">
                {Icon && <Icon className="w-3.5 h-3.5"/>}
                {label}
            </label>
            <div className="relative">
                <select
                    {...props}
                    onChange={handleChange}
                    className={cn(
                        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm appearance-none",
                        "placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20",
                        "focus:border-primary disabled:cursor-not-allowed disabled:opacity-50 transition-colors",
                        error && "border-destructive focus:border-destructive focus:ring-destructive/20",
                        className
                    )}
                >
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                <ChevronDown
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none"/>
            </div>
            {error && (
                <p className="text-destructive text-xs flex items-center gap-1">
                    ⚠️ {error}
                </p>
            )}
            {helperText && !error && (
                <p className="text-muted-foreground text-xs">{helperText}</p>
            )}
        </div>
    )
}

// Radio Group Component (para campos booleanos Sim/Não)
interface RadioBooleanProps {
    label: string
    value: boolean | null
    onChange: (value: boolean) => void
    className?: string
}

export const FormRadioBoolean = ({
                                     label,
                                     value,
                                     onChange,
                                     className
                                 }: RadioBooleanProps) => (
    <div className={cn(
        "flex flex-col gap-2 p-3 border border-border rounded-lg bg-muted/50",
        className
    )}>
        <span className="text-sm font-medium text-card-foreground">{label}</span>
        <div className="flex gap-6">
            {/* Sim */}
            <label className="flex items-center gap-2 cursor-pointer group">
                <div className={cn(
                    "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all",
                    value === true
                        ? "border-primary bg-primary"
                        : "border-input group-hover:border-primary"
                )}>
                    {value === true && <Check className="w-3.5 h-3.5 text-primary-foreground"/>}
                </div>
                <span className="text-sm text-muted-foreground group-hover:text-primary transition-colors">Sim</span>
                <input
                    type="radio"
                    className="sr-only"
                    checked={value === true}
                    onChange={() => onChange(true)}
                />
            </label>

            {/* Não */}
            <label className="flex items-center gap-2 cursor-pointer group">
                <div className={cn(
                    "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all",
                    value === false
                        ? "border-destructive bg-destructive"
                        : "border-input group-hover:border-destructive"
                )}>
                    {value === false && <Check className="w-3.5 h-3.5 text-destructive-foreground"/>}
                </div>
                <span
                    className="text-sm text-muted-foreground group-hover:text-destructive transition-colors">Não</span>
                <input
                    type="radio"
                    className="sr-only"
                    checked={value === false}
                    onChange={() => onChange(false)}
                />
            </label>
        </div>
    </div>
)

// Input Component (já existente - mantido para referência)
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string
    icon?: React.ComponentType<{ className?: string }>
    error?: string
    helperText?: string
}

export const FormInput = ({
                              label,
                              icon: Icon,
                              error,
                              helperText,
                              className,
                              ...props
                          }: InputProps) => (
    <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-card-foreground flex items-center gap-1.5">
            {Icon && <Icon className="w-3.5 h-3.5"/>}
            {label}
        </label>
        <input
            {...props}
            className={cn(
                "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm",
                "placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20",
                "focus:border-primary disabled:cursor-not-allowed disabled:opacity-50 transition-colors",
                error && "border-destructive focus:border-destructive focus:ring-destructive/20",
                className
            )}
        />
        {error && (
            <p className="text-destructive text-xs flex items-center gap-1">
                ⚠️ {error}
            </p>
        )}
        {helperText && !error && (
            <p className="text-muted-foreground text-xs">{helperText}</p>
        )}
    </div>
)

// Checkbox Component (já existente - mantido para referência)
interface CheckboxProps {
    label: string
    checked: boolean
    onChange: (checked: boolean) => void
    className?: string
}

export const FormCheckbox = ({
                                 label,
                                 checked,
                                 onChange,
                                 className
                             }: CheckboxProps) => (
    <label className={cn(
        "flex items-center gap-3 p-3 border border-border rounded-lg bg-muted/50 cursor-pointer",
        "group hover:border-primary/40 transition-all hover:shadow-sm",
        className
    )}>
        <div className={cn(
            "w-5 h-5 rounded border-2 flex items-center justify-center transition-all",
            checked
                ? "border-primary bg-primary shadow-inner"
                : "border-input group-hover:border-primary"
        )}>
            {checked && <Check className="w-3.5 h-3.5 text-primary-foreground animate-in zoom-in duration-200"/>}
        </div>
        <span className="text-sm font-medium text-card-foreground group-hover:text-primary transition-colors">
            {label}
        </span>
        <input
            type="checkbox"
            className="sr-only"
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
        />
    </label>
)

// Form Actions Component (já existente - mantido para referência)
interface FormActionsProps {
    onCancel: () => void,
    isSubmitting?: boolean,
    submitLabel?: string,
    cancelLabel?: string,
    isValid?: boolean,
    onSubmit?: (e: React.FormEvent) => Promise<void>,
    isPage?: boolean | undefined
}

export const FormActions = ({
                                onCancel,
                                isSubmitting = false,
                                submitLabel = "Salvar",
                                cancelLabel = "Cancelar",
                                isValid = true,
                                onSubmit,
                                isPage
                            }: FormActionsProps) => {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (onSubmit) {
            onSubmit(e)
        }
    }

    return (
        <div className="flex gap-3 justify-end pt-6 border-t border-border">
            <button
                type="button"
                onClick={onCancel}
                className="px-6 py-3 rounded-lg font-medium bg-muted text-foreground border border-border hover:bg-muted/80 transition-all hover:shadow-sm"
            >
                {cancelLabel}
            </button>
            <button
                type={onSubmit ? "button" : "submit"}
                onClick={onSubmit ? handleSubmit : undefined}
                disabled={isSubmitting || !isValid}
                className="px-6 py-3 rounded-lg font-medium bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg flex items-center gap-2"
            >
                {isSubmitting ? (
                    <>
                        <div
                            className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin"/>
                        Salvando...
                    </>
                ) : (
                    submitLabel
                )}
            </button>
        </div>
    )
}