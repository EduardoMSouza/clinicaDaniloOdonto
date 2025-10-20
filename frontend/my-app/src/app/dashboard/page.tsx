"use client"

import { useRouter } from "next/navigation"
import { CalendarDays, Users, BarChart2, Plus } from "lucide-react"

export default function DashboardPage() {
    const router = useRouter()

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
                    <p className="text-gray-600 dark:text-gray-400">Visão geral da clínica</p>
                </div>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Nova Consulta
                </button>
            </div>

            {/* Cards de Estatísticas */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-zinc-700">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                                <Users className="h-6 w-6" />
                            </div>
                            <h3 className="text-lg font-semibold">Pacientes</h3>
                        </div>
                        <span className="text-xs font-medium px-2 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
              +12%
            </span>
                    </div>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white mb-2">248</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">26 novos este mês</p>
                </div>

                <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-zinc-700">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <div className="p-3 rounded-xl bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400">
                                <CalendarDays className="h-6 w-6" />
                            </div>
                            <h3 className="text-lg font-semibold">Agendamentos</h3>
                        </div>
                        <span className="text-xs font-medium px-2 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300">
              Hoje
            </span>
                    </div>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white mb-2">32</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">5 confirmados</p>
                </div>

                <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-zinc-700">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <div className="p-3 rounded-xl bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400">
                                <BarChart2 className="h-6 w-6" />
                            </div>
                            <h3 className="text-lg font-semibold">Faturamento</h3>
                        </div>
                        <span className="text-xs font-medium px-2 py-1 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300">
              Mensal
            </span>
                    </div>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white mb-2">R$ 42,5k</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">+8% vs último mês</p>
                </div>
            </div>

            {/* Próximas Consultas */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-lg border border-gray-100 dark:border-zinc-700 p-6">
                    <h3 className="text-lg font-semibold mb-4">Próximas Consultas</h3>
                    <div className="space-y-4">
                        {[
                            { name: "João Silva", time: "09:00", procedure: "Limpeza Dental", status: "confirmado" },
                            { name: "Maria Oliveira", time: "10:30", procedure: "Consulta de Rotina", status: "confirmado" },
                            { name: "Pedro Santos", time: "14:00", procedure: "Ortodontia", status: "pendente" },
                        ].map((appointment, index) => (
                            <div key={index} className="flex items-center justify-between p-3 border border-gray-100 dark:border-zinc-700 rounded-lg">
                                <div>
                                    <p className="font-medium text-gray-900 dark:text-white">{appointment.name}</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">{appointment.procedure}</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-medium text-gray-900 dark:text-white">{appointment.time}</p>
                                    <span className={`text-xs px-2 py-1 rounded-full ${
                                        appointment.status === 'confirmado'
                                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                                            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                                    }`}>
                    {appointment.status}
                  </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-lg border border-gray-100 dark:border-zinc-700 p-6">
                    <h3 className="text-lg font-semibold mb-4">Atividades Recentes</h3>
                    <div className="space-y-4">
                        {[
                            { action: "Consulta concluída", patient: "Ana Costa", time: "2 horas atrás" },
                            { action: "Ficha atualizada", patient: "Carlos Lima", time: "5 horas atrás" },
                            { action: "Novo agendamento", patient: "Mariana Souza", time: "1 dia atrás" },
                        ].map((activity, index) => (
                            <div key={index} className="flex items-center gap-3 p-3 border border-gray-100 dark:border-zinc-700 rounded-lg">
                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                <div className="flex-1">
                                    <p className="text-sm text-gray-900 dark:text-white">
                                        <span className="font-medium">{activity.action}</span> - {activity.patient}
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}