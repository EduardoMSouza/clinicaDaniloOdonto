// components/domain/pacientes/PacienteComplete.tsx
"use client"

import type React from "react"
import { PacienteType } from "@/types/pacientesType"
import { Check, X, User, Phone, FileText, Calendar, MapPin, HeartPulse, Edit, Briefcase, AlertTriangle, Heart, Stethoscope, Droplets } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PacienteCompleteProps {
    paciente: PacienteType
    onClose?: () => void
    onEdit?: (paciente: PacienteType) => void
    isPage?: boolean
}

export function PacienteComplete({ paciente, onClose, onEdit, isPage = false }: PacienteCompleteProps) {
    if (!paciente) {
        return (
            <div className="p-6 text-center bg-card rounded-xl border border-border">
                <p className="text-muted-foreground">Paciente não encontrado ou dados indisponíveis.</p>
            </div>
        )
    }

    const BooleanBadge = ({ value }: { value: boolean }) =>
        value ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                <Check className="w-3.5 h-3.5" /> Sim
            </span>
        ) : (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-destructive/10 text-destructive">
                <X className="w-3.5 h-3.5" /> Não
            </span>
        )

    const Section = ({
                         title,
                         children,
                         className = ""
                     }: {
        title: string;
        children: React.ReactNode;
        className?: string
    }) => (
        <div className={`bg-card border border-border rounded-xl p-4 shadow-sm ${className}`}>
            <h3 className="text-lg font-semibold text-card-foreground mb-3 pb-2 border-b border-border">
                {title}
            </h3>
            {children}
        </div>
    )

    const Field = ({
                       label,
                       value,
                       icon: Icon,
                       fullWidth = false,
                   }: {
        label: string
        value: any
        icon?: React.ComponentType<{ className?: string }>
        fullWidth?: boolean
    }) => (
        <div className={`flex flex-col gap-1 ${fullWidth ? "col-span-full" : ""}`}>
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                {Icon && <Icon className="w-3.5 h-3.5" />}
                {label}
            </span>
            <span className="text-sm font-medium text-card-foreground break-words">
                {value || "-"}
            </span>
        </div>
    )

    // Avatar com iniciais
    const initials = paciente.nome
        ? paciente.nome.trim().split(" ").map(n => n[0]).slice(0, 2).join("").toUpperCase()
        : null

    // Formatar data
    const formatDate = (date?: string) => {
        if (!date) return "-"
        return new Date(date).toLocaleDateString('pt-BR')
    }

    // Calcular idade
    const getIdade = () => {
        if (!paciente.dataNascimento) return "-"
        const nascimento = new Date(paciente.dataNascimento)
        const hoje = new Date()
        let idade = hoje.getFullYear() - nascimento.getFullYear()
        const mes = hoje.getMonth() - nascimento.getMonth()
        if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) idade--
        return `${idade} anos`
    }

    return (
        <div className="space-y-6">
            {/* Header com ações quando é página */}
            {isPage && (
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Detalhes do Paciente</h1>
                        <p className="text-gray-600">
                            {paciente.nome} - Prontuário: {paciente.prontuarioNumero}
                        </p>
                    </div>
                    {onEdit && (
                        <Button
                            onClick={() => onEdit(paciente)}
                            className="flex items-center gap-2"
                        >
                            <Edit className="w-4 h-4" />
                            Editar Paciente
                        </Button>
                    )}
                </div>
            )}

            {/* Conteúdo principal */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Sidebar */}
                <div className="space-y-4">
                    <div className="bg-card border border-border rounded-xl p-4 shadow-sm text-center">
                        <div className="w-20 h-20 mx-auto bg-primary/10 text-primary rounded-full flex items-center justify-center text-2xl font-bold mb-3 border-2 border-primary/20">
                            {initials || <User className="w-10 h-10" />}
                        </div>
                        <h2 className="text-lg font-bold text-card-foreground">{paciente.nome}</h2>
                        <p className="text-sm text-muted-foreground mt-1">Prontuário: {paciente.prontuarioNumero}</p>
                        <div className="mt-3">
                            <BooleanBadge value={paciente.status} />
                        </div>
                    </div>

                    <Section title="Informações de Contato">
                        <div className="space-y-3">
                            <Field
                                label="Telefone"
                                value={paciente.telefone}
                                icon={Phone}
                            />
                            <Field
                                label="CPF"
                                value={paciente.cpf}
                                icon={FileText}
                            />
                            <Field
                                label="Data Nascimento"
                                value={formatDate(paciente.dataNascimento)}
                                icon={Calendar}
                            />
                            <Field
                                label="RG"
                                value={paciente.rg}
                                icon={FileText}
                            />
                            <Field
                                label="Órgão Expedidor"
                                value={paciente.orgaoExpedidor}
                                icon={FileText}
                            />
                        </div>
                    </Section>

                    <Section title="Endereço">
                        <Field
                            label="Endereço Residencial"
                            value={paciente.enderecoResidencial}
                            icon={MapPin}
                            fullWidth
                        />
                    </Section>

                    <Section title="Convênio Médico">
                        <div className="space-y-3">
                            <Field
                                label="Convênio"
                                value={paciente.convenio}
                                icon={FileText}
                            />
                            <Field
                                label="Número Inscrição"
                                value={paciente.numeroInscricao}
                                icon={FileText}
                            />
                        </div>
                    </Section>
                </div>

                {/* Conteúdo Principal */}
                <div className="lg:col-span-2 space-y-4">
                    <Section title="Informações Pessoais">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Field
                                label="Nome Completo"
                                value={paciente.nome}
                                icon={User}
                            />
                            <Field
                                label="Prontuário"
                                value={paciente.prontuarioNumero}
                                icon={FileText}
                            />
                            <Field
                                label="Profissão"
                                value={paciente.profissao}
                                icon={Briefcase}
                            />
                            <Field
                                label="Convênio"
                                value={paciente.convenio}
                                icon={FileText}
                            />
                            <Field
                                label="Idade"
                                value={getIdade()}
                                fullWidth
                            />
                            <Field
                                label="Sexo"
                                value={paciente.sexo}
                            />
                            <Field
                                label="Naturalidade"
                                value={paciente.naturalidade}
                            />
                            <Field
                                label="Nacionalidade"
                                value={paciente.nacionalidade}
                            />
                            <Field
                                label="Indicado por"
                                value={paciente.indicadoPor}
                                fullWidth
                            />
                        </div>
                    </Section>

                    {/* Anamnese */}
                    <Section title="Anamnese">
                        <div className="space-y-4">
                            <Field
                                label="Queixa Principal"
                                value={paciente.queixaPrincipal}
                                icon={AlertTriangle}
                                fullWidth
                            />
                            <Field
                                label="Evolução da Doença Atual"
                                value={paciente.evolucaoDoencaAtual}
                                icon={AlertTriangle}
                                fullWidth
                            />

                            {/* Condições de Saúde */}
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                <div className="flex items-center gap-2">
                                    <BooleanBadge value={!!paciente.febreReumatica} />
                                    <span className="text-sm">Febre Reumática</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <BooleanBadge value={!!paciente.hepatite} />
                                    <span className="text-sm">Hepatite</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <BooleanBadge value={!!paciente.diabetes} />
                                    <span className="text-sm">Diabetes</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <BooleanBadge value={!!paciente.hipertensaoArterialSistemica} />
                                    <span className="text-sm">Hipertensão</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <BooleanBadge value={!!paciente.portadorHiv} />
                                    <span className="text-sm">Portador HIV</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <BooleanBadge value={!!paciente.alteracaoCoagulacaoSanguinea} />
                                    <span className="text-sm">Alteração Coagulação</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <BooleanBadge value={!!paciente.reacoesAlergicas} />
                                    <span className="text-sm">Alergias</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <BooleanBadge value={!!paciente.doencasSistemicas} />
                                    <span className="text-sm">Doenças Sistêmicas</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <BooleanBadge value={!!paciente.internacaoRecente} />
                                    <span className="text-sm">Internação Recente</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <BooleanBadge value={!!paciente.utilizandoMedicacao} />
                                    <span className="text-sm">Usando Medicação</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <BooleanBadge value={!!paciente.fumante} />
                                    <span className="text-sm">Fumante</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <BooleanBadge value={!!paciente.bebidasAlcoolicas} />
                                    <span className="text-sm">Bebidas Alcoólicas</span>
                                </div>
                            </div>

                            {/* Detalhes condicionais */}
                            {paciente.fumante && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                    <Field
                                        label="Quantidade de Cigarros"
                                        value={paciente.fumanteQuantidade}
                                    />
                                    <Field
                                        label="Tempo como Fumante"
                                        value={paciente.tempoFumo}
                                    />
                                </div>
                            )}

                            {paciente.reacoesAlergicas && (
                                <Field
                                    label="Quais Alergias"
                                    value={paciente.problemasAlergicosQuais}
                                    fullWidth
                                />
                            )}
                        </div>
                    </Section>

                    {/* Questionário de Saúde */}
                    <Section title="Questionário de Saúde">
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                <div className="flex items-center gap-2">
                                    <BooleanBadge value={!!paciente.sofreDoenca} />
                                    <span className="text-sm">Sofre de Doença</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <BooleanBadge value={!!paciente.tratamentoMedicoAtual} />
                                    <span className="text-sm">Tratamento Médico</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <BooleanBadge value={!!paciente.gravidez} />
                                    <span className="text-sm">Gravidez</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <BooleanBadge value={!!paciente.usoMedicacao} />
                                    <span className="text-sm">Uso de Medicação</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <BooleanBadge value={!!paciente.teveAlergia} />
                                    <span className="text-sm">Teve Alergia</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <BooleanBadge value={!!paciente.foiOperado} />
                                    <span className="text-sm">Foi Operado</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <BooleanBadge value={!!paciente.problemasCicatrizacao} />
                                    <span className="text-sm">Problemas Cicatrização</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <BooleanBadge value={!!paciente.problemasAnestesia} />
                                    <span className="text-sm">Problemas Anestesia</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <BooleanBadge value={!!paciente.problemasHemorragia} />
                                    <span className="text-sm">Problemas Hemorragia</span>
                                </div>
                            </div>

                            {/* Detalhes condicionais */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {paciente.sofreDoenca && (
                                    <Field
                                        label="Quais Doenças"
                                        value={paciente.sofreDoencaQuais}
                                    />
                                )}
                                {paciente.usoMedicacao && (
                                    <Field
                                        label="Quais Medicações"
                                        value={paciente.usoMedicacaoQuais}
                                    />
                                )}
                                {paciente.teveAlergia && (
                                    <Field
                                        label="Quais Alergias"
                                        value={paciente.teveAlergiaQuais}
                                    />
                                )}
                                {paciente.foiOperado && (
                                    <Field
                                        label="Quais Cirurgias"
                                        value={paciente.foiOperadoQuais}
                                    />
                                )}
                            </div>

                            <Field
                                label="Telefone do Médico Assistente"
                                value={paciente.medicoAssistenteTelefone}
                                icon={Phone}
                            />
                            <Field
                                label="Hábitos"
                                value={paciente.habitos}
                                fullWidth
                            />
                            <Field
                                label="Antecedentes Familiares"
                                value={paciente.antecedentesFamiliares}
                                fullWidth
                            />
                        </div>
                    </Section>

                    {/* Inspeção Bucal */}
                    <Section title="Inspeção Bucal">
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                <Field label="Língua" value={paciente.lingua} />
                                <Field label="Mucosa" value={paciente.mucosa} />
                                <Field label="Palato" value={paciente.palato} />
                                <Field label="Lábios" value={paciente.labios} />
                                <Field label="Gengivas" value={paciente.gengivas} />
                                <Field label="Nariz" value={paciente.nariz} />
                                <Field label="Face" value={paciente.face} />
                                <Field label="Gânglios" value={paciente.ganglios} />
                                <Field label="Glândulas Salivares" value={paciente.glandulasSalivares} />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <BooleanBadge value={!!paciente.alteracaoOclusao} />
                                        <span className="text-sm">Alteração de Oclusão</span>
                                    </div>
                                    {paciente.alteracaoOclusao && (
                                        <Field
                                            label="Tipo de Alteração"
                                            value={paciente.alteracaoOclusaoTipo}
                                        />
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <BooleanBadge value={!!paciente.protese} />
                                        <span className="text-sm">Usa Prótese</span>
                                    </div>
                                    {paciente.protese && (
                                        <Field
                                            label="Tipo de Prótese"
                                            value={paciente.proteseTipo}
                                        />
                                    )}
                                </div>
                            </div>

                            <Field
                                label="Outras Observações"
                                value={paciente.outrasObservacoes}
                                fullWidth
                            />
                        </div>
                    </Section>

                    {paciente.nomeResponsavel && (
                        <Section title="Responsável">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Field
                                    label="Nome do Responsável"
                                    value={paciente.nomeResponsavel}
                                />
                                <Field
                                    label="CPF do Responsável"
                                    value={paciente.cpfResponsavel}
                                />
                                <Field
                                    label="Estado Civil"
                                    value={paciente.estadoCivilResponsavel}
                                />
                                <Field
                                    label="Cônjuge"
                                    value={paciente.conjugeResponsavel}
                                />
                                <Field
                                    label="RG do Responsável"
                                    value={paciente.rgResponsavel}
                                />
                                <Field
                                    label="Órgão Expedidor (Resp.)"
                                    value={paciente.orgaoExpedidorResponsavel}
                                />
                                <Field
                                    label="RG do Cônjuge"
                                    value={paciente.rgConjuge}
                                />
                                <Field
                                    label="Órgão Expedidor (Cônjuge)"
                                    value={paciente.orgaoExpedidorConjuge}
                                />
                                <Field
                                    label="CPF do Cônjuge"
                                    value={paciente.cpfConjuge}
                                />
                            </div>
                        </Section>
                    )}

                    <Section title="Status do Cadastro">
                        <div className="flex items-center justify-between p-3 bg-muted/50 border border-border rounded-lg">
                            <div>
                                <span className="text-sm font-medium text-card-foreground">
                                    Status do Paciente
                                </span>
                                <p className="text-sm text-muted-foreground">
                                    {paciente.status
                                        ? "Paciente ativo no sistema"
                                        : "Paciente inativo no sistema"
                                    }
                                </p>
                            </div>
                            <BooleanBadge value={paciente.status} />
                        </div>
                    </Section>
                </div>
            </div>

            {/* Footer com ações quando não é página (modal) */}
            {!isPage && (
                <div className="flex justify-end gap-3 pt-4 border-t border-border">
                    <Button
                        variant="outline"
                        onClick={onClose}
                    >
                        Fechar
                    </Button>
                    {onEdit && (
                        <Button
                            onClick={() => onEdit(paciente)}
                            className="flex items-center gap-2"
                        >
                            <Edit className="w-4 h-4" />
                            Editar Paciente
                        </Button>
                    )}
                </div>
            )}
        </div>
    )
}