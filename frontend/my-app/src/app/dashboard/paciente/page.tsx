"use client"

import { useState } from "react"
import { Users, Search, Plus, Filter, MoreVertical } from "lucide-react"

interface Patient {
    id: number
    name: string
    email: string
    phone: string
    lastVisit: string
    status: 'ativo' | 'inativo'
}

export default function PacientePage() {
    const [searchTerm, setSearchTerm] = useState("")

    const patients: Patient[] = [
        { id: 1, name: "João Silva", email: "joao@email.com", phone: "(11) 99999-9999", lastVisit: "2024-01-15", status: "ativo" },
        { id: 2, name: "Maria Oliveira", email: "maria@email.com", phone: "(11) 98888-8888", lastVisit: "2024-01-10", status: "ativo" },
        { id: 3, name: "Pedro Santos", email: "pedro@email.com", phone: "(11) 97777-7777", lastVisit: "2023-12-20", status: "inativo" },
        { id: 4, name: "Ana Costa", email: "ana@email.com", phone: "(11) 96666-6666", lastVisit: "2024-01-12", status: "ativo" },
    ]

    const filteredPatients = patients.filter(patient =>
        patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.email.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Pacientes</h1>
                    <p className="text-gray-600 dark:text-gray-400">Gerencie o cadastro de pacientes</p>
                </div>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Novo Paciente
                </button>
            </div>

            {/* Barra de Pesquisa e Filtros */}
            <div className="flex gap-4">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input
                        type="text"
                        placeholder="Buscar pacientes..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <button className="px-4 py-2 border border-gray-300 dark:border-zinc-600 rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-700 transition flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    Filtros
                </button>
            </div>

            {/* Tabela de Pacientes */}
            <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-lg border border-gray-100 dark:border-zinc-700 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 dark:bg-zinc-700">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Paciente
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Contato
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Última Visita
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Ações
                            </th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-zinc-600">
                        {filteredPatients.map((patient) => (
                            <tr key={patient.id} className="hover:bg-gray-50 dark:hover:bg-zinc-700 transition">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 font-medium text-sm">
                                            {patient.name.charAt(0)}
                                        </div>
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                {patient.name}
                                            </div>
                                            <div className="text-sm text-gray-500 dark:text-gray-400">
                                                {patient.email}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900 dark:text-white">{patient.phone}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900 dark:text-white">
                                        {new Date(patient.lastVisit).toLocaleDateString('pt-BR')}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        patient.status === 'ativo'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                            : 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300'
                    }`}>
                      {patient.status}
                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition">
                                        <MoreVertical className="h-4 w-4" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}