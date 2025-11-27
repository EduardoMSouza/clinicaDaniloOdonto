"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { PlusCircle, Trash2, Save, ArrowLeft } from "lucide-react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { PlanoDentalRequest, PlanoDentalResponse } from "@/types/planoDentalType"
import {
    criarPlanoDental,
    buscarPlanosDentaisPorPaciente,
    deletarPlanoDental,
    atualizarPlanoDental
} from "@/services/planoDentalService"

interface LinhaPlano {
    dente: string
    procedimento: string
    valor: string
}

export default function PlanoDentalPage() {
    const searchParams = useSearchParams()
    const pacienteIdFromUrl = searchParams.get('pacienteId')
    const pacienteNomeFromUrl = searchParams.get('pacienteNome')

    const [linhas, setLinhas] = useState<LinhaPlano[]>([
        { dente: "", procedimento: "", valor: "" }
    ])

    const [observacoes, setObservacoes] = useState("")
    const [status, setStatus] = useState<boolean>(true)
    const [pacienteId, setPacienteId] = useState<number>(
        pacienteIdFromUrl ? Number(pacienteIdFromUrl) : 1
    )
    const [loading, setLoading] = useState(false)
    const [planos, setPlanos] = useState<PlanoDentalResponse[]>([])

    useEffect(() => {
        if (pacienteId) {
            carregarPlanos()
        }
    }, [pacienteId])

    const carregarPlanos = async () => {
        try {
            const planosData = await buscarPlanosDentaisPorPaciente(pacienteId)
            setPlanos(planosData)
        } catch (error) {
            console.error("Erro ao carregar planos dentais:", error)
            alert("Erro ao carregar planos dentais")
        }
    }

    const adicionarLinha = () => {
        setLinhas([...linhas, { dente: "", procedimento: "", valor: "" }])
    }

    const removerLinha = (index: number) => {
        setLinhas(linhas.filter((_, i) => i !== index))
    }

    const atualizarLinha = (
        index: number,
        campo: keyof LinhaPlano,
        valor: string
    ) => {
        const novasLinhas = [...linhas]
        novasLinhas[index][campo] = valor
        setLinhas(novasLinhas)
    }

    const calcularTotal = () => {
        return linhas.reduce((acc, linha) => {
            const valorNumerico = linha.valor.replace(/[^\d,]/g, '').replace(',', '.')
            const v = parseFloat(valorNumerico)
            return acc + (isNaN(v) ? 0 : v)
        }, 0)
    }

    const formatarValor = (valor: string): number => {
        const valorNumerico = valor.replace(/[^\d,]/g, '').replace(',', '.')
        return parseFloat(valorNumerico) || 0
    }

    const salvarPlanoDental = async () => {
        // Validar se há pelo menos uma linha preenchida
        const linhasValidas = linhas.filter(linha =>
            linha.dente.trim() && linha.procedimento.trim() && linha.valor
        )

        if (linhasValidas.length === 0) {
            alert("Preencha pelo menos um procedimento para salvar o plano dental.")
            return
        }

        setLoading(true)
        try {
            // Para cada linha válida, criar um plano dental individual
            const promises = linhasValidas.map(async (linha) => {
                const planoRequest: PlanoDentalRequest = {
                    dente: linha.dente.trim(),
                    procedimento: linha.procedimento.trim(),
                    valor: formatarValor(linha.valor),
                    pacienteId: pacienteId
                }
                return await criarPlanoDental(planoRequest)
            })

            await Promise.all(promises)
            await carregarPlanos()

            // Limpar formulário após salvar
            setLinhas([{ dente: "", procedimento: "", valor: "" }])
            setObservacoes("")

            alert("Plano dental salvo com sucesso!")
        } catch (error) {
            console.error("Erro ao salvar plano dental:", error)
            alert("Erro ao salvar plano dental")
        } finally {
            setLoading(false)
        }
    }

    const deletarPlano = async (id: number) => {
        if (confirm("Tem certeza que deseja excluir este plano dental?")) {
            try {
                await deletarPlanoDental(id)
                await carregarPlanos()
                alert("Plano dental excluído com sucesso!")
            } catch (error) {
                console.error("Erro ao excluir plano dental:", error)
                alert("Erro ao excluir plano dental")
            }
        }
    }

    const toggleStatusPlano = async (plano: PlanoDentalResponse) => {
        try {
            const request: PlanoDentalRequest = {
                dente: plano.dente,
                procedimento: plano.procedimento,
                valor: plano.valor,
                pacienteId: plano.pacienteId
            }

            await atualizarPlanoDental(plano.id, request)
            await carregarPlanos()
            alert("Plano dental atualizado com sucesso!")
        } catch (error) {
            console.error("Erro ao atualizar plano:", error)
            alert("Erro ao atualizar plano dental")
        }
    }

    const formatarMoeda = (valor: number): string => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(valor)
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
                    <h1 className="text-2xl font-bold">Plano Dental</h1>
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
                        PLANO DENTAL - TRATAMENTOS
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
                            <input
                                type="checkbox"
                                id="status"
                                checked={status}
                                onChange={(e) => setStatus(e.target.checked)}
                                className="w-4 h-4"
                            />
                            <label htmlFor="status" className="text-sm font-medium">
                                Plano Ativo
                            </label>
                        </div>
                    </div>

                    <div className="border rounded-lg overflow-hidden">
                        <div className="grid grid-cols-12 bg-muted text-sm font-medium border-b">
                            <div className="col-span-2 p-3 border-r">Dente</div>
                            <div className="col-span-7 p-3 border-r">Procedimento</div>
                            <div className="col-span-2 p-3 border-r">Valor</div>
                            <div className="col-span-1 p-3">Ações</div>
                        </div>

                        {linhas.map((linha, index) => (
                            <div
                                key={index}
                                className="grid grid-cols-12 border-b last:border-none"
                            >
                                <div className="col-span-2 p-2 border-r">
                                    <Input
                                        className="h-9"
                                        value={linha.dente}
                                        onChange={(e) => atualizarLinha(index, "dente", e.target.value)}
                                        placeholder="Ex: 11"
                                    />
                                </div>

                                <div className="col-span-7 p-2 border-r">
                                    <Input
                                        className="h-9"
                                        value={linha.procedimento}
                                        onChange={(e) =>
                                            atualizarLinha(index, "procedimento", e.target.value)
                                        }
                                        placeholder="Procedimento realizado"
                                    />
                                </div>

                                <div className="col-span-2 p-2 border-r">
                                    <Input
                                        className="h-9"
                                        value={linha.valor}
                                        onChange={(e) => {
                                            // Permite apenas números, vírgula e ponto
                                            const valor = e.target.value.replace(/[^\d,.]/g, '')
                                            atualizarLinha(index, "valor", valor)
                                        }}
                                        placeholder="R$ 0,00"
                                    />
                                </div>

                                <div className="col-span-1 p-2 flex items-center justify-center">
                                    {linhas.length > 1 && (
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => removerLinha(index)}
                                        >
                                            <Trash2 className="w-4 h-4 text-destructive" />
                                        </Button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex gap-4">
                        <Button
                            className="flex items-center gap-2"
                            variant="outline"
                            onClick={adicionarLinha}
                        >
                            <PlusCircle className="w-4 h-4" />
                            Adicionar Linha
                        </Button>

                        <Button
                            className="flex items-center gap-2 ml-auto"
                            onClick={salvarPlanoDental}
                            disabled={loading}
                        >
                            <Save className="w-4 h-4" />
                            {loading ? "Salvando..." : "Salvar Plano Dental"}
                        </Button>
                    </div>

                    <div>
                        <p className="font-medium mb-2">Observações:</p>
                        <Textarea
                            placeholder="Digite as observações do plano dental..."
                            value={observacoes}
                            onChange={(e) => setObservacoes(e.target.value)}
                            className="min-h-[120px]"
                        />
                    </div>

                    <div className="flex justify-end text-lg font-semibold pt-4 border-t">
                        Valor Total:{" "}
                        <span className="ml-2 text-primary">
              {formatarMoeda(calcularTotal())}
            </span>
                    </div>
                </CardContent>
            </Card>

            <Card className="shadow-md border-border">
                <CardHeader>
                    <CardTitle className="text-xl font-semibold">
                        Planos Dentais Salvos
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {planos.length === 0 ? (
                        <p className="text-muted-foreground text-center py-8">
                            Nenhum plano dental salvo ainda.
                        </p>
                    ) : (
                        <div className="space-y-4">
                            {planos.map((plano) => (
                                <div
                                    key={plano.id}
                                    className="border rounded-lg p-4 space-y-3"
                                >
                                    <div className="flex justify-between items-start">
                                        <div className="space-y-2 flex-1">
                                            <h4 className="font-semibold">
                                                Dente: {plano.dente} | {plano.procedimento}
                                            </h4>
                                            <p className="text-sm text-muted-foreground">
                                                Valor: {formatarMoeda(plano.valor)} |
                                                Status: <span className={plano.status ? "text-green-600" : "text-red-600"}>
                          {plano.status ? "Ativo" : "Inativo"}
                        </span>
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                Criado em: {new Date(plano.dataCriacao).toLocaleDateString('pt-BR')}
                                            </p>
                                            {plano.observacoes && (
                                                <p className="text-sm">
                                                    Observações: {plano.observacoes}
                                                </p>
                                            )}
                                        </div>
                                        <div className="flex gap-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => toggleStatusPlano(plano)}
                                            >
                                                {plano.status ? "Desativar" : "Ativar"}
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => deletarPlano(plano.id)}
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