"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { PlusCircle, Trash2, Save, Calendar, ArrowLeft } from "lucide-react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { EvolucaoTratamentoRequest, EvolucaoTratamentoResponse } from "@/types/evolucaoTratamentoType"
import { evolucaoTratamentoService } from "@/services/evolucaoTratamentoService"

export default function EvolucaoTratamentoPage() {
    const searchParams = useSearchParams()
    const pacienteIdFromUrl = searchParams.get('pacienteId')
    const pacienteNomeFromUrl = searchParams.get('pacienteNome')

    const [dataProcedimento, setDataProcedimento] = useState("")
    const [evolucaoIntercorrenciasTratamento, setEvolucaoIntercorrenciasTratamento] = useState("")
    const [pacienteId, setPacienteId] = useState<number>(
        pacienteIdFromUrl ? Number(pacienteIdFromUrl) : 1
    )
    const [loading, setLoading] = useState(false)
    const [evolucoes, setEvolucoes] = useState<EvolucaoTratamentoResponse[]>([])
    const [editandoId, setEditandoId] = useState<number | null>(null)

    useEffect(() => {
        if (pacienteId) {
            carregarEvolucoes()
        }
    }, [pacienteId])

    const carregarEvolucoes = async () => {
        try {
            const evolucoesData = await evolucaoTratamentoService.buscarPorPaciente(pacienteId)
            setEvolucoes(evolucoesData)
        } catch (error) {
            console.error("Erro ao carregar evoluções de tratamento:", error)
        }
    }

    const limparFormulario = () => {
        setDataProcedimento("")
        setEvolucaoIntercorrenciasTratamento("")
        setEditandoId(null)
    }

    const salvarEvolucaoTratamento = async () => {
        if (!dataProcedimento) {
            alert("A data do procedimento é obrigatória!")
            return
        }

        setLoading(true)
        try {
            const request: EvolucaoTratamentoRequest = {
                dataProcedimento,
                evolucaoIntercorrenciasTratamento,
                pacienteId
            }

            if (editandoId) {
                await evolucaoTratamentoService.atualizar(editandoId, request)
                alert("Evolução de tratamento atualizada com sucesso!")
            } else {
                await evolucaoTratamentoService.criar(request)
                alert("Evolução de tratamento salva com sucesso!")
            }

            await carregarEvolucoes()
            limparFormulario()
        } catch (error) {
            console.error("Erro ao salvar evolução de tratamento:", error)
            alert("Erro ao salvar evolução de tratamento")
        } finally {
            setLoading(false)
        }
    }

    const editarEvolucao = (evolucao: EvolucaoTratamentoResponse) => {
        setDataProcedimento(evolucao.dataProcedimento)
        setEvolucaoIntercorrenciasTratamento(evolucao.evolucaoIntercorrenciasTratamento || "")
        setEditandoId(evolucao.id)
    }

    const cancelarEdicao = () => {
        limparFormulario()
    }

    const deletarEvolucao = async (id: number) => {
        if (confirm("Tem certeza que deseja excluir esta evolução de tratamento?")) {
            try {
                await evolucaoTratamentoService.deletar(id)
                await carregarEvolucoes()
                alert("Evolução de tratamento excluída com sucesso!")
            } catch (error) {
                console.error("Erro ao excluir evolução de tratamento:", error)
                alert("Erro ao excluir evolução de tratamento")
            }
        }
    }

    const formatarData = (dataString: string) => {
        return new Date(dataString).toLocaleDateString('pt-BR')
    }

    return (
        <div className="mx-auto max-w-6xl py-10 space-y-8">
            <div className="flex items-center gap-4">
                <Link href="/dashboard/pacientes">
                    <Button variant="outline" size="sm">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Voltar para Pacientes
                    </Button>
                </Link>
                <div>
                    <h1 className="text-2xl font-bold">Evolução de Tratamento</h1>
                    {pacienteNomeFromUrl && (
                        <p className="text-muted-foreground">
                            Paciente: {decodeURIComponent(pacienteNomeFromUrl)}
                        </p>
                    )}
                </div>
            </div>

            <Card className="shadow-md border-border">
                <CardHeader>
                    <CardTitle className="text-2xl font-semibold text-center">
                        REGISTRO DE EVOLUÇÃO DE TRATAMENTO
                    </CardTitle>
                </CardHeader>

                <CardContent className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            {pacienteNomeFromUrl && (
                                <p className="text-sm font-medium">
                                    Nome: {decodeURIComponent(pacienteNomeFromUrl)}
                                </p>
                            )}
                        </div>
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm font-medium">
                                Data: {new Date().toLocaleDateString('pt-BR')}
                            </span>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="grid grid-cols-1 gap-2">
                            <label htmlFor="dataProcedimento" className="text-sm font-medium">
                                Data do Procedimento *
                            </label>
                            <Input
                                id="dataProcedimento"
                                type="date"
                                value={dataProcedimento}
                                onChange={(e) => setDataProcedimento(e.target.value)}
                                className="h-9"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="evolucao" className="text-sm font-medium">
                                Evolução e Intercorrências do Tratamento
                            </label>
                            <Textarea
                                id="evolucao"
                                placeholder="Descreva a evolução do tratamento, intercorrências, observações..."
                                value={evolucaoIntercorrenciasTratamento}
                                onChange={(e) => setEvolucaoIntercorrenciasTratamento(e.target.value)}
                                className="min-h-[120px]"
                            />
                        </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                        {editandoId && (
                            <Button
                                className="flex items-center gap-2"
                                variant="outline"
                                onClick={cancelarEdicao}
                            >
                                Cancelar Edição
                            </Button>
                        )}

                        <Button
                            className="flex items-center gap-2 ml-auto"
                            onClick={salvarEvolucaoTratamento}
                            disabled={loading || !dataProcedimento}
                        >
                            <Save className="w-4 h-4" />
                            {loading
                                ? "Salvando..."
                                : editandoId
                                    ? "Atualizar Evolução"
                                    : "Salvar Evolução"
                            }
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <Card className="shadow-md border-border">
                <CardHeader>
                    <CardTitle className="text-xl font-semibold">
                        Evoluções de Tratamento Registradas
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {evolucoes.length === 0 ? (
                        <p className="text-muted-foreground text-center py-8">
                            Nenhuma evolução de tratamento registrada ainda.
                        </p>
                    ) : (
                        <div className="space-y-4">
                            {evolucoes.map((evolucao) => (
                                <div
                                    key={evolucao.id}
                                    className="border rounded-lg p-4 space-y-3"
                                >
                                    <div className="flex justify-between items-start">
                                        <div className="space-y-2 flex-1">
                                            <div className="flex items-center gap-4">
                                                <h4 className="font-semibold">
                                                    Data do Procedimento: {formatarData(evolucao.dataProcedimento)}
                                                </h4>
                                            </div>

                                            {evolucao.evolucaoIntercorrenciasTratamento && (
                                                <div>
                                                    <p className="text-sm font-medium mb-1">Evolução e Intercorrências:</p>
                                                    <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-md">
                                                        {evolucao.evolucaoIntercorrenciasTratamento}
                                                    </p>
                                                </div>
                                            )}

                                            <div className="flex gap-4 text-xs text-muted-foreground">
                                                <span>Paciente: {evolucao.nomePaciente}</span>
                                                <span>ID: {evolucao.id}</span>
                                            </div>
                                        </div>

                                        <div className="flex gap-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => editarEvolucao(evolucao)}
                                            >
                                                Editar
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => deletarEvolucao(evolucao.id!)}
                                            >
                                                <Trash2 className="w-4 h-4 text-destructive" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}