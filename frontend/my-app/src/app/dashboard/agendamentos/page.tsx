"use client"

import { useState } from "react"
import { Calendar, Clock, Search, Plus, Filter } from "lucide-react"

interface Appointment {
    id: number
    patient: string
    date: string
    time: string
    procedure: string
    status: 'confirmado' | 'pendente' | 'cancelado'
}

export default function AgendamentosPage() {
    const [selectedDate, setSelectedDate] = useState("")
    const [searchTerm, setSearchTerm] = useState("")

    const appointments: Appointment[] = [
        { id: 1, patient: "João Silva", date: "2024-01-20", time: "09:00", procedure: "Limpeza Dental", status: "confirmado" },
        { id: 2, patient: "Maria Oliveira", date: "2024-01-20", time: "10:30", procedure: "Consulta de Rotina", status: "confirmado" },
        { id: 3, patient: "Pedro Santos", date: "2024-01-20", time: "14:00", procedure: "Ortodontia", status: "pendente" },
        { id: 4, patient: "Ana Costa", date: "2024-01-21", time: "11:00", procedure: "Extração", status: "confirmado" },
    ]

    const filteredAppointments = appointments.filter(appointment =>
        appointment.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.procedure.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'confirmado': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
            case 'pendente': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
            case 'cancelado': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
            default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300'
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Agendamentos</h1>
                    <p className="text-gray-600 dark:text-gray-400">Gerencie consultas e horários</p>
                </div>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Novo Agendamento
                </button>
            </div>

            {/* Filtros e Pesquisa */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input
                        type="text"
                        placeholder="Buscar por paciente ou procedimento..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
            </div>

            {/* Lista de Agendamentos */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Agendamentos do Dia */}
                <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-lg border border-gray-100 dark:border-zinc-700 p-6">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <Clock className="h-5 w-5 text-blue-600" />
                        Agendamentos de Hoje
                    </h3>
                    <div className="space-y-4">
                        {filteredAppointments
                            .filter(app => app.date === new Date().toISOString().split('T')[0])
                            .map((appointment) => (
                                <div key={appointment.id} className="p-4 border border-gray-200 dark:border-zinc-600 rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-700 transition">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <p className="font-medium text-gray-900 dark:text-white">{appointment.patient}</p>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">{appointment.procedure}</p>
                                        </div>
                                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(appointment.status)}`}>
                      {appointment.status}
                    </span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                        <Clock className="h-4 w-4" />
                                        {appointment.time}
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>

                {/* Todos os Agendamentos */}
                <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-lg border border-gray-100 dark:border-zinc-700 p-6">
                    <h3 className="text-lg font-semibold mb-4">Todos os Agendamentos</h3>
                    <div className="space-y-4">
                        {filteredAppointments.map((appointment) => (
                            <div key={appointment.id} className="p-4 border border-gray-200 dark:border-zinc-600 rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-700 transition">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <p className="font-medium text-gray-900 dark:text-white">{appointment.patient}</p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">{appointment.procedure}</p>
                                    </div>
                                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(appointment.status)}`}>
                    {appointment.status}
                  </span>
                                </div>
                                <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-400">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="h-4 w-4" />
                                        {new Date(appointment.date).toLocaleDateString('pt-BR')}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Clock className="h-4 w-4" />
                                        {appointment.time}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}