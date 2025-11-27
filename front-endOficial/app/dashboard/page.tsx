// app/dashboard/page.tsx


import data from "./data.json"
import {ChartAreaInteractive} from "@/components/ui/chart-area-interactive";
import {DataTable} from "@/components/base/data-display/data-table";

export default function DashboardPage() {
    return (
        <div className="flex flex-1 flex-col gap-6 p-4 lg:p-6">

            <div>
                <h1 className="text-2xl font-semibold mb-2">Dashboard</h1>
                <p className="text-neutral-500">
                    Visão geral do sistema, métricas e estatísticas clínicas.
                </p>
            </div>

            <div className="px-2 lg:px-0">
                <ChartAreaInteractive />
            </div>

            <DataTable data={data} />
        </div>
    )
}
