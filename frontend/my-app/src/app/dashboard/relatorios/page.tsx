"use client"

import { useState } from "react"
import { BarChart2, Download, Calendar, Users, DollarSign } from "lucide-react"

export default function RelatoriosPage() {
    const [dateRange, setDateRange] = useState("month")

    const reportData = {
        revenue: 42500,
        patients: 248,
        appointments: 156,
        newPatients: 26
    }

    const monthlyData = [
        { month: "Jan", revenue: 38000, patients: 210, appointments: 140 },
        { month: "Fev", revenue: 42000, patients: 230, appointments: 150 },
        { month: "Mar", revenue: 45000, patients: 248, appointments: 156 },
    ]

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Relatórios</h1>
                    <p className="text-gray-600 dark:text-gray-400">Acompanhe o desempenho da clínica</p>
                </div>
                <div className="flex gap-3">
                    <select
                        value={dateRange}
                        onChange={(e) => setDateRange(e.target.value)}
                        className="px-4 py-2 border border-gray-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="week">Esta Semana</option>
                        <option value="month">Este Mês</option>
                        <option value="quarter">Este Trimestre</option>
                        <option value="year">Este Ano</option>
                    </select>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2">
                        <Download className="h-4 w-4" />
                        Exportar
                    </button>
                </div>
            </div>

            {/* Cards de Métricas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-zinc-700">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                            <DollarSign className="h-6 w-6" />
                        </div>
                        <span className="text-sm text-green-600 dark:text-green-400 font-medium">+12%</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                        R$ {reportData.revenue.toLocaleString('pt-BR')}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Faturamento Total</p>
                </div>

                <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-zinc-700">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 rounded-xl bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400">
                            <Users className="h-6 w-6" />
                        </div>
                        <span className="text-sm text-green-600 dark:text-green-400 font-medium">+8%</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{reportData.patients}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Pacientes Ativos</p>
                </div>

                <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-zinc-700">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 rounded-xl bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400">
                            <Calendar className="h-6 w-6" />
                        </div>
                        <span className="text-sm text-green-600 dark:text-green-400 font-medium">+5%</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{reportData.appointments}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Consultas Realizadas</p>
                </div>

                <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-zinc-700">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 rounded-xl bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
                            <Users className="h-6 w-6" />
                        </div>
                        <span className="text-sm text-green-600 dark:text-green-400 font-medium">+15%</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{reportData.newPatients}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Novos Pacientes</p>
                </div>
            </div>

            {/* Gráficos e Tabelas */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Gráfico de Faturamento */}
                <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-lg border border-gray-100 dark:border-zinc-700 p-6">
                    <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                        <BarChart2 className="h-5 w-5 text-blue-600" />
                        Faturamento Mensal
                    </h3>
                    <div className="space-y-4">
                        {monthlyData.map((data, index) => (
                            <div key={index} className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="font-medium text-gray-900 dark:text-white">{data.month}</span>
                                    <span className="text-gray-600 dark:text-gray-400">R$ {data.revenue.toLocaleString('pt-BR')}</span>
                                </div>
                                <div className="w-full bg-gray-200 dark:bg-zinc-600 rounded-full h-2">
                                    <div
                                        className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                                        style={{ width: `${(data.revenue / 50000) * 100}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Estatísticas de Consultas */}
                <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-lg border border-gray-100 dark:border-zinc-700 p-6">
                    <h3 className="text-lg font-semibold mb-6">Distribuição de Consultas</h3>
                    <div className="space-y-4">
                        {[
                            { procedure: "Limpeza Dental", count: 45, color: "bg-blue-500" },
                            { procedure: "Consulta de Rotina", count: 38, color: "bg-green-500" },
                            { procedure: "Ortodontia", count: 28, color: "bg-amber-500" },
                            { procedure: "Extração", count: 22, color: "bg-red-500" },
                            { procedure: "Outros", count: 23, color: "bg-purple-500" },
                        ].map((item, index) => (
                            <div key={index} className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                                    <span className="text-sm text-gray-900 dark:text-white">{item.procedure}</span>
                                </div>
                                <span className="text-sm font-medium text-gray-900 dark:text-white">{item.count}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}