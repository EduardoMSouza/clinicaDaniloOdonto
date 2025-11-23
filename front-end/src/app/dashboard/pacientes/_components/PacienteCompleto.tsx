"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { PacienteType } from "@/types/pacientesTypes"

export default function PacienteCompleto({ paciente }: { paciente: PacienteType }) {

    const formatDate = (d?: string) =>
        d ? new Date(d).toLocaleDateString("pt-BR") : "-"

    const formatBoolean = (v?: boolean) =>
        v ? (
            <Badge className="bg-emerald-700/40 border border-emerald-700 text-emerald-300 font-medium">Sim</Badge>
        ) : (
            <Badge className="bg-red-800/30 border border-red-800 text-red-300 font-medium">Não</Badge>
        )

    // Função para formatar labels dos campos
    const formatLabel = (key: string) => {
        const labels: { [key: string]: string } = {
            // Dados básicos
            prontuarioNumero: "Nº Prontuário",
            nome: "Nome",
            telefone: "Telefone",
            cpf: "CPF",
            rg: "RG",
            orgaoExpedidor: "Órgão Expedidor",
            dataNascimento: "Data de Nascimento",
            naturalidade: "Naturalidade",
            nacionalidade: "Nacionalidade",
            profissao: "Profissão",
            enderecoResidencial: "Endereço Residencial",
            indicadoPor: "Indicado Por",
            status: "Status",

            // Responsável
            nomeResponsavel: "Nome do Responsável",
            cpfResponsavel: "CPF do Responsável",
            estadoCivilResponsavel: "Estado Civil",
            conjugeResponsavel: "Cônjuge",

            // Convênio
            convenio: "Convênio",
            numeroInscricao: "Nº Inscrição",

            // Inspeção bucal
            lingua: "Língua",
            mucosa: "Mucosa",
            palato: "Palato",
            labios: "Lábios",
            gengivas: "Gengivas",
            nariz: "Nariz",
            face: "Face",
            ganglios: "Gânglios",
            glandulasSalivares: "Glândulas Salivares",
            alteracaoOclusao: "Alteração de Oclusão",
            alteracaoOclusaoTipo: "Tipo de Alteração",
            protese: "Prótese",
            proteseTipo: "Tipo de Prótese",
            outrasObservacoes: "Outras Observações",

            // Anamnese
            febreReumatica: "Febre Reumática",
            hepatite: "Hepatite",
            diabetes: "Diabetes",
            hipertensaoArterialSistemica: "Hipertensão Arterial",
            portadorHiv: "Portador HIV",
            alteracaoCoagulacaoSanguinea: "Alteração Coagulação Sanguínea",
            reacoesAlergicas: "Reações Alérgicas",
            doencasSistemicas: "Doenças Sistêmicas",
            internacaoRecente: "Internação Recente",
            utilizandoMedicacao: "Utilizando Medicação",
            fumante: "Fumante",
            bebidasAlcoolicas: "Bebidas Alcoólicas",
            problemasCardiacos: "Problemas Cardíacos",
            problemasRenais: "Problemas Renais",
            problemasGastricos: "Problemas Gástricos",
            problemasRespiratorios: "Problemas Respiratórios",
            problemasAlergicos: "Problemas Alérgicos",
            problemasAlergicosQuais: "Quais Alergias",
            problemasArticularesOuReumatismo: "Problemas Articulares/Reumatismo",
            queixaPrincipal: "Queixa Principal",

            // Questionário
            sofreDoenca: "Sofre de Doença",
            tratamentoMedicoAtual: "Tratamento Médico Atual",
            gravidez: "Gravidez",
            usoMedicacao: "Uso de Medicação",
            teveAlergia: "Teve Alergia",
            foiOperado: "Foi Operado",
            problemasCicatrizacao: "Problemas com Cicatrização",
            problemasAnestesia: "Problemas com Anestesia",
            problemasHemorragia: "Problemas com Hemorragia",
            sofreDoencaQuais: "Quais Doenças",
            usoMedicacaoQuais: "Quais Medicações"
        }

        return labels[key] || key
    }

    return (
        <div className="space-y-8">

            {/* ============================= */}
            {/*     DADOS BÁSICOS             */}
            {/* ============================= */}
            <Card className="bg-[#0e1111] border-[#1b2222]">
                <CardHeader>
                    <CardTitle className="text-gray-200 text-xl">Dados Básicos</CardTitle>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-4 text-gray-300">
                    <p><strong className="text-gray-400">Nome:</strong> {paciente.nome}</p>
                    <p><strong className="text-gray-400">Prontuário:</strong> {paciente.prontuarioNumero ?? "-"}</p>

                    <p><strong className="text-gray-400">Telefone:</strong> {paciente.telefone ?? "-"}</p>
                    <p><strong className="text-gray-400">CPF:</strong> {paciente.cpf ?? "-"}</p>

                    <p><strong className="text-gray-400">RG:</strong> {paciente.rg ?? "-"}</p>
                    <p><strong className="text-gray-400">Órgão expedidor:</strong> {paciente.orgaoExpedidor ?? "-"}</p>

                    <p><strong className="text-gray-400">Data Nasc.:</strong> {formatDate(paciente.dataNascimento)}</p>
                    <p><strong className="text-gray-400">Profissão:</strong> {paciente.profissao ?? "-"}</p>

                    <p><strong className="text-gray-400">Naturalidade:</strong> {paciente.naturalidade ?? "-"}</p>
                    <p><strong className="text-gray-400">Nacionalidade:</strong> {paciente.nacionalidade ?? "-"}</p>

                    <p className="md:col-span-2">
                        <strong className="text-gray-400">Endereço:</strong> {paciente.enderecoResidencial ?? "-"}
                    </p>

                    <p className="md:col-span-2">
                        <strong className="text-gray-400">Indicado por:</strong> {paciente.indicadoPor ?? "-"}
                    </p>

                    <p>
                        <strong className="text-gray-400">Status:</strong> {formatBoolean(paciente.status)}
                    </p>
                </CardContent>
            </Card>

            {/* ============================= */}
            {/*     RESPONSÁVEL               */}
            {/* ============================= */}
            {(paciente.nomeResponsavel || paciente.cpfResponsavel) && (
                <Card className="bg-[#0e1111] border-[#1b2222]">
                    <CardHeader>
                        <CardTitle className="text-gray-200 text-xl">Responsável</CardTitle>
                    </CardHeader>
                    <CardContent className="grid md:grid-cols-2 gap-4 text-gray-300">
                        <p><strong className="text-gray-400">Nome:</strong> {paciente.nomeResponsavel ?? "-"}</p>
                        <p><strong className="text-gray-400">CPF:</strong> {paciente.cpfResponsavel ?? "-"}</p>

                        <p><strong className="text-gray-400">Estado civil:</strong> {paciente.estadoCivilResponsavel ?? "-"}</p>
                        <p><strong className="text-gray-400">Cônjuge:</strong> {paciente.conjugeResponsavel ?? "-"}</p>
                    </CardContent>
                </Card>
            )}

            {/* ============================= */}
            {/*     CONVÊNIO                  */}
            {/* ============================= */}
            {(paciente.convenio || paciente.numeroInscricao) && (
                <Card className="bg-[#0e1111] border-[#1b2222]">
                    <CardHeader>
                        <CardTitle className="text-gray-200 text-xl">Convênio</CardTitle>
                    </CardHeader>
                    <CardContent className="grid md:grid-cols-2 gap-4 text-gray-300">
                        <p><strong className="text-gray-400">Convênio:</strong> {paciente.convenio ?? "-"}</p>
                        <p><strong className="text-gray-400">Nº Inscrição:</strong> {paciente.numeroInscricao ?? "-"}</p>
                    </CardContent>
                </Card>
            )}

            {/* ============================= */}
            {/*     INSPEÇÃO BUCAL           */}
            {/* ============================= */}
            <Card className="bg-[#0e1111] border-[#1b2222]">
                <CardHeader>
                    <CardTitle className="text-gray-200 text-xl">Inspeção Bucal</CardTitle>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-4 text-gray-300">

                    {[
                        "lingua", "mucosa", "palato", "labios", "gengivas", "nariz", "face",
                        "ganglios", "glandulasSalivares"
                    ].map(f => (
                        <p key={f}>
                            <strong className="text-gray-400">{formatLabel(f)}:</strong> {(paciente as any)[f] ?? "-"}
                        </p>
                    ))}

                    <p><strong className="text-gray-400">Alteração de oclusão:</strong> {formatBoolean(paciente.alteracaoOclusao)}</p>
                    <p><strong className="text-gray-400">Tipo:</strong> {paciente.alteracaoOclusaoTipo ?? "-"}</p>

                    <p><strong className="text-gray-400">Prótese:</strong> {formatBoolean(paciente.protese)}</p>
                    <p><strong className="text-gray-400">Tipo da prótese:</strong> {paciente.proteseTipo ?? "-"}</p>

                    <p className="md:col-span-2">
                        <strong className="text-gray-400">Outras observações:</strong> {paciente.outrasObservacoes ?? "-"}
                    </p>

                </CardContent>
            </Card>

            {/* ============================= */}
            {/*     ANAMNESE                 */}
            {/* ============================= */}
            <Card className="bg-[#0e1111] border-[#1b2222]">
                <CardHeader>
                    <CardTitle className="text-gray-200 text-xl">Anamnese</CardTitle>
                </CardHeader>

                <CardContent className="grid md:grid-cols-2 gap-4 text-gray-300">
                    {[
                        "febreReumatica", "hepatite", "diabetes",
                        "hipertensaoArterialSistemica", "portadorHiv",
                        "alteracaoCoagulacaoSanguinea", "reacoesAlergicas",
                        "doencasSistemicas", "internacaoRecente",
                        "utilizandoMedicacao", "fumante", "bebidasAlcoolicas",
                        "problemasCardiacos", "problemasRenais",
                        "problemasGastricos", "problemasRespiratorios",
                        "problemasAlergicos", "problemasArticularesOuReumatismo"
                    ].map(f => (
                        <p key={f}>
                            <strong className="text-gray-400">{formatLabel(f)}:</strong> {formatBoolean((paciente as any)[f])}
                        </p>
                    ))}

                    <p className="md:col-span-2">
                        <strong className="text-gray-400">Quais alergias:</strong> {paciente.problemasAlergicosQuais ?? "-"}
                    </p>

                    <p className="md:col-span-2">
                        <strong className="text-gray-400">Queixa principal:</strong> {paciente.queixaPrincipal ?? "-"}
                    </p>

                </CardContent>
            </Card>

            {/* ============================= */}
            {/*     QUESTIONÁRIO SAÚDE       */}
            {/* ============================= */}
            <Card className="bg-[#0e1111] border-[#1b2222]">
                <CardHeader>
                    <CardTitle className="text-gray-200 text-xl">Questionário de Saúde</CardTitle>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-4 text-gray-300">

                    {[
                        "sofreDoenca", "tratamentoMedicoAtual", "gravidez",
                        "usoMedicacao", "teveAlergia", "foiOperado",
                        "problemasCicatrizacao", "problemasAnestesia",
                        "problemasHemorragia"
                    ].map(f => (
                        <p key={f}>
                            <strong className="text-gray-400">{formatLabel(f)}:</strong> {formatBoolean((paciente as any)[f])}
                        </p>
                    ))}

                    <p className="md:col-span-2">
                        <strong className="text-gray-400">Doenças — quais:</strong> {paciente.sofreDoencaQuais ?? "-"}
                    </p>

                    <p className="md:col-span-2">
                        <strong className="text-gray-400">Medicações — quais:</strong> {paciente.usoMedicacaoQuais ?? "-"}
                    </p>

                </CardContent>
            </Card>

        </div>
    )
}