import { Separator } from "@/components/ui/separator";
import { useSidebar } from "@/components/ui/sidebar";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import {ThemeSelector} from "@/components/layout/theme/theme-selector";
import {ModeSwitcher} from "@/components/layout/theme/mode-switcher";

export function SiteHeader() {
    const { toggleSidebar, state } = useSidebar();

    return (
        <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
            <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleSidebar}
                    className="-ml-1 h-8 w-8"
                >
                    <ChevronLeft
                        className={`h-4 w-4 transition-transform duration-200 ${
                            state === "collapsed" ? "rotate-180" : "rotate-0"
                        }`}
                    />
                    <span className="sr-only">
            {state === "expanded" ? "Recolher sidebar" : "Expandir sidebar"}
          </span>
                </Button>

                <Separator
                    orientation="vertical"
                    className="mx-2 data-[orientation=vertical]:h-4"
                />

                <div className="ml-auto flex items-center gap-2">
                    <ThemeSelector />
                    <ModeSwitcher />
                </div>
            </div>
        </header>
    );
}