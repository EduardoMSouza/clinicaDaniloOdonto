"use client";

import { useThemeConfig } from "./active-theme";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectSeparator,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Check } from "lucide-react";

// ==================== TEMAS DISPONÍVEIS ====================
const COLOR_THEMES = [
    { name: "Padrão",     value: "default",      hue: "235 85% 65%" },     // azul clássico
    { name: "Azul",       value: "blue",         hue: "217 91% 60%" },
    { name: "Verde",      value: "green",        hue: "152 78% 52%" },
    { name: "Âmbar",      value: "amber",        hue: "45 93% 60%" },
    { name: "Roxo",       value: "purple",       hue: "270 95% 65%" },
    { name: "Rosa",       value: "pink",         hue: "330 81% 62%" },
    { name: "Vermelho",   value: "red",          hue: "0 84% 60%" },
    { name: "Laranja",    value: "orange",       hue: "24 94% 62%" },
    { name: "Teal",       value: "teal",         hue: "162 78% 48%" },
] as const;

const SCALED_THEMES = [
    { name: "Padrão (Escalado)", value: "default-scaled" },
    { name: "Azul (Escalado)",   value: "blue-scaled" },
    { name: "Verde (Escalado)",  value: "green-scaled" },
    { name: "Roxo (Escalado)",   value: "purple-scaled" },
] as const;

const MONO_THEMES = [
    { name: "Monocromático", value: "mono-scaled" },
] as const;

// =========================================================
export function ThemeSelector() {
    const { activeTheme, setActiveTheme } = useThemeConfig();

    // Detecta se o tema atual tem preview de cor
    const currentColorTheme = COLOR_THEMES.find(t => t.value === activeTheme);
    const currentDisplayName =
        COLOR_THEMES.find(t => t.value === activeTheme)?.name ||
        SCALED_THEMES.find(t => t.value === activeTheme)?.name ||
        MONO_THEMES.find(t => t.value === activeTheme)?.name ||
        "Tema";

    return (
        <div className="flex items-center gap-3">
            <Label htmlFor="theme-selector" className="text-sm font-medium whitespace-nowrap">
                Tema:
            </Label>

            <Select value={activeTheme} onValueChange={setActiveTheme}>
                <SelectTrigger
                    id="theme-selector"
                    className="w-64 h-10 border-border"
                >
                    <SelectValue>
                        <div className="flex items-center gap-3">
                            {/* Preview da cor atual */}
                            {currentColorTheme && (
                                <div
                                    className="w-4 h-4 rounded-full border-2 border-foreground/20 shadow-sm"
                                    style={{ backgroundColor: `hsl(${currentColorTheme.hue})` }}
                                />
                            )}
                            <span className="font-medium">{currentDisplayName}</span>
                        </div>
                    </SelectValue>
                </SelectTrigger>

                <SelectContent className="max-h-96">
                    {/* === TEMAS COLORIDOS === */}
                    <SelectGroup>
                        <SelectLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                            Cores
                        </SelectLabel>
                        {COLOR_THEMES.map((theme) => (
                            <SelectItem key={theme.value} value={theme.value}>
                                <div className="flex items-center justify-between w-full">
                                    <div className="flex items-center gap-3">
                                        <div
                                            className="w-4 h-4 rounded-full border-2 border-foreground/20 shadow-sm"
                                            style={{ backgroundColor: `hsl(${theme.hue})` }}
                                        />
                                        <span>{theme.name}</span>
                                    </div>
                                    {activeTheme === theme.value && (
                                        <Check className="w-4 h-4 text-primary" />
                                    )}
                                </div>
                            </SelectItem>
                        ))}
                    </SelectGroup>

                    <SelectSeparator />

                    {/* === TEMAS ESCALADOS === */}
                    <SelectGroup>
                        <SelectLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                            Escalados
                        </SelectLabel>
                        {SCALED_THEMES.map((theme) => (
                            <SelectItem key={theme.value} value={theme.value}>
                                <div className="flex items-center justify-between w-full">
                                    <span>{theme.name}</span>
                                    {activeTheme === theme.value && (
                                        <Check className="w-4 h-4 text-primary" />
                                    )}
                                </div>
                            </SelectItem>
                        ))}
                    </SelectGroup>

                    <SelectSeparator />

                    {/* === MONOCROMÁTICO === */}
                    <SelectGroup>
                        <SelectLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                            Monocromático
                        </SelectLabel>
                        {MONO_THEMES.map((theme) => (
                            <SelectItem key={theme.value} value={theme.value}>
                                <div className="flex items-center justify-between w-full">
                                    <span>{theme.name}</span>
                                    {activeTheme === theme.value && (
                                        <Check className="w-4 h-4 text-primary" />
                                    )}
                                </div>
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    );
}