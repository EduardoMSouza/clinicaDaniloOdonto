"use client"

import {ChangeEvent, FormEvent, useEffect, useState} from "react"
import {useRouter} from "next/navigation"
import {toast} from "sonner"

import {PacienteFormType, PacienteType, Sexo} from "@/types/pacientesTypes"

import {pacienteService} from "@/services/pacientesService"

import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"

import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Textarea} from "@/components/ui/textarea"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {Dialog, DialogContent} from "@/components/ui/dialog";

function formatEnum(value: string) {
    return value
        .toLowerCase()
        .replace(/_/g, " ")
        .replace(/^\w/, (c) => c.toUpperCase());
}

// Componente de botões de rádio para booleanos
interface RadioBooleanProps {
    value: boolean | null;
    onChange: (value: boolean) => void;
    label: string;
}

function RadioBoolean({ value, onChange, label }: RadioBooleanProps) {
    return (
        <div className="space-y-3">
            <Label>{label}</Label>
            <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="radio"
                        name={label}
                        value="true"
                        checked={value === true}
                        onChange={() => onChange(true)}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                    />
                    <span className="text-sm">Sim</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="radio"
                        name={label}
                        value="false"
                        checked={value === false}
                        onChange={() => onChange(false)}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                    />
                    <span className="text-sm">Não</span>
                </label>
            </div>
        </div>
    );
}

interface PacienteFormEditProps {
    open: boolean
    setOpen: (v: boolean) => void
    paciente: PacienteType
    onSuccess: () => void
    isPage?: boolean
}

export default function PacienteFormEdit({
                                             open,
                                             setOpen,
                                             paciente,
                                             onSuccess,
                                             isPage = false
                                         }: PacienteFormEditProps) {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)

    // Inicializa o form com os dados do paciente
    const [form, setForm] = useState<PacienteFormType>({
        nome: paciente.nome || "",
        telefone: paciente.telefone || "",
        cpf: paciente.cpf || "",
        rg: paciente.rg || "",
        orgaoExpedidor: paciente.orgaoExpedidor || "",
        dataNascimento: paciente.dataNascimento ? new Date(paciente.dataNascimento) : null,
        naturalidade: paciente.naturalidade || "",
        nacionalidade: paciente.nacionalidade || "",
        sexo: paciente.sexo as Sexo,
        enderecoResidencial: paciente.enderecoResidencial || "",
        profissao: paciente.profissao || "",
        indicadoPor: paciente.indicadoPor || "",
        status: paciente.status ?? true,

        // Responsável
        nomeResponsavel: paciente.nomeResponsavel || "",
        cpfResponsavel: paciente.cpfResponsavel || "",
        estadoCivilResponsavel: paciente.estadoCivilResponsavel || "",
        conjugeResponsavel: paciente.conjugeResponsavel || "",

        // Convênio
        convenio: paciente.convenio || "",
        numeroInscricao: paciente.numeroInscricao || "",

        // Inspeção bucal
        lingua: paciente.lingua || "",
        mucosa: paciente.mucosa || "",
        palato: paciente.palato || "",
        labios: paciente.labios || "",
        gengivas: paciente.gengivas || "",
        nariz: paciente.nariz || "",
        face: paciente.face || "",
        ganglios: paciente.ganglios || "",
        glandulasSalivares: paciente.glandulasSalivares || "",
        alteracaoOclusao: paciente.alteracaoOclusao || false,
        alteracaoOclusaoTipo: paciente.alteracaoOclusaoTipo || "",
        protese: paciente.protese || false,
        proteseTipo: paciente.proteseTipo || "",
        outrasObservacoes: paciente.outrasObservacoes || "",

        // Anamnese
        febreReumatica: paciente.febreReumatica || false,
        hepatite: paciente.hepatite || false,
        diabetes: paciente.diabetes || false,
        hipertensaoArterialSistemica: paciente.hipertensaoArterialSistemica || false,
        portadorHiv: paciente.portadorHiv || false,
        alteracaoCoagulacaoSanguinea: paciente.alteracaoCoagulacaoSanguinea || false,
        reacoesAlergicas: paciente.reacoesAlergicas || false,
        doencasSistemicas: paciente.doencasSistemicas || false,
        internacaoRecente: paciente.internacaoRecente || false,
        utilizandoMedicacao: paciente.utilizandoMedicacao || false,
        fumante: paciente.fumante || false,
        bebidasAlcoolicas: paciente.bebidasAlcoolicas || false,
        problemasCardiacos: paciente.problemasCardiacos || false,
        problemasRenais: paciente.problemasRenais || false,
        problemasGastricos: paciente.problemasGastricos || false,
        problemasRespiratorios: paciente.problemasRespiratorios || false,
        problemasAlergicos: paciente.problemasAlergicos || false,
        problemasAlergicosQuais: paciente.problemasAlergicosQuais || "",
        problemasArticularesOuReumatismo: paciente.problemasArticularesOuReumatismo || false,
        queixaPrincipal: paciente.queixaPrincipal || "",

        // Questionário saúde
        sofreDoenca: paciente.sofreDoenca || false,
        sofreDoencaQuais: paciente.sofreDoencaQuais || "",
        tratamentoMedicoAtual: paciente.tratamentoMedicoAtual || false,
        gravidez: paciente.gravidez || false,
        usoMedicacao: paciente.usoMedicacao || false,
        usoMedicacaoQuais: paciente.usoMedicacaoQuais || "",
        teveAlergia: paciente.teveAlergia || false,
        foiOperado: paciente.foiOperado || false,
        problemasCicatrizacao: paciente.problemasCicatrizacao || false,
        problemasAnestesia: paciente.problemasAnestesia || false,
        problemasHemorragia: paciente.problemasHemorragia || false,
    })

    // Atualiza o form quando o paciente muda
    useEffect(() => {
        setForm({
            nome: paciente.nome || "",
            telefone: paciente.telefone || "",
            cpf: paciente.cpf || "",
            rg: paciente.rg || "",
            orgaoExpedidor: paciente.orgaoExpedidor || "",
            dataNascimento: paciente.dataNascimento ? new Date(paciente.dataNascimento) : null,
            naturalidade: paciente.naturalidade || "",
            nacionalidade: paciente.nacionalidade || "",
            sexo: Sexo.MASCULINO as Sexo,
            enderecoResidencial: paciente.enderecoResidencial || "",
            profissao: paciente.profissao || "",
            indicadoPor: paciente.indicadoPor || "",
            status: paciente.status ?? true,

            // Responsável
            nomeResponsavel: paciente.nomeResponsavel || "",
            cpfResponsavel: paciente.cpfResponsavel || "",
            estadoCivilResponsavel: paciente.estadoCivilResponsavel || "",
            conjugeResponsavel: paciente.conjugeResponsavel || "",

            // Convênio
            convenio: paciente.convenio || "",
            numeroInscricao: paciente.numeroInscricao || "",

            // Inspeção bucal
            lingua: paciente.lingua || "",
            mucosa: paciente.mucosa || "",
            palato: paciente.palato || "",
            labios: paciente.labios || "",
            gengivas: paciente.gengivas || "",
            nariz: paciente.nariz || "",
            face: paciente.face || "",
            ganglios: paciente.ganglios || "",
            glandulasSalivares: paciente.glandulasSalivares || "",
            alteracaoOclusao: paciente.alteracaoOclusao || false,
            alteracaoOclusaoTipo: paciente.alteracaoOclusaoTipo || "",
            protese: paciente.protese || false,
            proteseTipo: paciente.proteseTipo || "",
            outrasObservacoes: paciente.outrasObservacoes || "",

            // Anamnese
            febreReumatica: paciente.febreReumatica || false,
            hepatite: paciente.hepatite || false,
            diabetes: paciente.diabetes || false,
            hipertensaoArterialSistemica: paciente.hipertensaoArterialSistemica || false,
            portadorHiv: paciente.portadorHiv || false,
            alteracaoCoagulacaoSanguinea: paciente.alteracaoCoagulacaoSanguinea || false,
            reacoesAlergicas: paciente.reacoesAlergicas || false,
            doencasSistemicas: paciente.doencasSistemicas || false,
            internacaoRecente: paciente.internacaoRecente || false,
            utilizandoMedicacao: paciente.utilizandoMedicacao || false,
            fumante: paciente.fumante || false,
            bebidasAlcoolicas: paciente.bebidasAlcoolicas || false,
            problemasCardiacos: paciente.problemasCardiacos || false,
            problemasRenais: paciente.problemasRenais || false,
            problemasGastricos: paciente.problemasGastricos || false,
            problemasRespiratorios: paciente.problemasRespiratorios || false,
            problemasAlergicos: paciente.problemasAlergicos || false,
            problemasAlergicosQuais: paciente.problemasAlergicosQuais || "",
            problemasArticularesOuReumatismo: paciente.problemasArticularesOuReumatismo || false,
            queixaPrincipal: paciente.queixaPrincipal || "",

            // Questionário saúde
            sofreDoenca: paciente.sofreDoenca || false,
            sofreDoencaQuais: paciente.sofreDoencaQuais || "",
            tratamentoMedicoAtual: paciente.tratamentoMedicoAtual || false,
            gravidez: paciente.gravidez || false,
            usoMedicacao: paciente.usoMedicacao || false,
            usoMedicacaoQuais: paciente.usoMedicacaoQuais || "",
            teveAlergia: paciente.teveAlergia || false,
            foiOperado: paciente.foiOperado || false,
            problemasCicatrizacao: paciente.problemasCicatrizacao || false,
            problemasAnestesia: paciente.problemasAnestesia || false,
            problemasHemorragia: paciente.problemasHemorragia || false,
        })
    }, [paciente])

    // handler genérico
    const handleChange = (field: keyof PacienteFormType) =>
        (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            setForm((prev) => ({
                ...prev,
                [field]: e.target.value,
            }));
        };

    const handleDateChange = (field: keyof PacienteFormType) =>
        (e: ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value ? new Date(e.target.value) : null;
            setForm((prev) => ({
                ...prev,
                [field]: value,
            }));
        };

    const handleSelect = (field: keyof PacienteFormType, value: string | boolean) => {
        setForm((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    // handler para radio boolean
    const handleRadioBoolean = (field: keyof PacienteFormType) =>
        (value: boolean) => {
            setForm((prev) => ({
                ...prev,
                [field]: value,
            }));
        };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {
            setIsSubmitting(true);

            await pacienteService.update(paciente.id, {
                ...(form as any),
                dataNascimento: form.dataNascimento
                    ? form.dataNascimento.toISOString().split("T")[0]
                    : null
            });

            toast.success("Paciente atualizado com sucesso!");
            onSuccess();
            if (!isPage) {
                setOpen(false);
            }
        } catch (err: any) {
            console.error(err);
            toast.error("Erro ao atualizar paciente.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleClose = () => {
        if (isPage) {
            router.push("/dashboard/pacientes");
        } else {
            setOpen(false);
        }
    };

    const content = (
        <div className="flex justify-center px-4 py-6">
            <Card className="w-full max-w-5xl">
                <CardHeader>
                    <CardTitle>Editar Paciente</CardTitle>
                    <CardDescription>
                        Editando dados do paciente: <strong>{paciente.nome}</strong>
                        {paciente.prontuarioNumero && ` - Prontuário: ${paciente.prontuarioNumero}`}
                    </CardDescription>
                </CardHeader>

                <form onSubmit={handleSubmit}>
                    <CardContent>
                        <Tabs defaultValue="dados" className="w-full">

                            {/* ------------ LISTA DE ABAS ------------ */}
                            <TabsList className="grid grid-cols-4 lg:grid-cols-7 gap-2 mb-6">
                                <TabsTrigger value="dados">Dados Básicos</TabsTrigger>
                                <TabsTrigger value="responsavel">Responsável</TabsTrigger>
                                <TabsTrigger value="convenio">Convênio</TabsTrigger>
                                <TabsTrigger value="inspecao">Inspeção Bucal</TabsTrigger>
                                <TabsTrigger value="anamnese">Anamnese</TabsTrigger>
                                <TabsTrigger value="questionario">Questionário</TabsTrigger>
                                <TabsTrigger value="final">Finalização</TabsTrigger>
                            </TabsList>

                            {/* ======================================= */}
                            {/*               ABA: DADOS               */}
                            {/* ======================================= */}
                            <TabsContent value="dados">
                                <div className="grid md:grid-cols-2 gap-4">

                                    <div className="space-y-1">
                                        <Label>Nome*</Label>
                                        <Input
                                            value={form.nome}
                                            onChange={handleChange("nome")}
                                            required
                                        />
                                    </div>

                                    <div className="space-y-1">
                                        <Label>Telefone</Label>
                                        <Input
                                            value={form.telefone ?? ""}
                                            onChange={handleChange("telefone")}
                                        />
                                    </div>

                                    <div className="space-y-1">
                                        <Label>CPF</Label>
                                        <Input
                                            value={form.cpf ?? ""}
                                            onChange={handleChange("cpf")}
                                        />
                                    </div>

                                    <div className="space-y-1">
                                        <Label>RG</Label>
                                        <Input
                                            value={form.rg ?? ""}
                                            onChange={handleChange("rg")}
                                        />
                                    </div>

                                    <div className="space-y-1">
                                        <Label>Órgão Expedidor</Label>
                                        <Input
                                            value={form.orgaoExpedidor ?? ""}
                                            onChange={handleChange("orgaoExpedidor")}
                                        />
                                    </div>

                                    <div className="space-y-1">
                                        <Label>Data de nascimento</Label>
                                        <Input
                                            type="date"
                                            value={
                                                form.dataNascimento
                                                    ? form.dataNascimento.toISOString().split("T")[0]
                                                    : ""
                                            }
                                            onChange={handleDateChange("dataNascimento")}
                                        />
                                    </div>

                                    <div className="space-y-1">
                                        <Label>Sexo</Label>
                                        <Select
                                            value={form.sexo ?? ""}
                                            onValueChange={(v) => handleSelect("sexo", v)}
                                        >
                                            <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                                            <SelectContent>
                                                {Object.values(Sexo).map((s) => (
                                                    <SelectItem key={s} value={s}>{formatEnum(s)}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-1">
                                        <Label>Naturalidade</Label>
                                        <Input
                                            value={form.naturalidade ?? ""}
                                            onChange={handleChange("naturalidade")}
                                        />
                                    </div>

                                    <div className="space-y-1">
                                        <Label>Nacionalidade</Label>
                                        <Input
                                            value={form.nacionalidade ?? ""}
                                            onChange={handleChange("nacionalidade")}
                                        />
                                    </div>

                                    <div className="space-y-1 col-span-2">
                                        <Label>Endereço residencial</Label>
                                        <Input
                                            value={form.enderecoResidencial ?? ""}
                                            onChange={handleChange("enderecoResidencial")}
                                        />
                                    </div>

                                    <div className="space-y-1">
                                        <Label>Profissão</Label>
                                        <Input
                                            value={form.profissao ?? ""}
                                            onChange={handleChange("profissao")}
                                        />
                                    </div>

                                    <div className="space-y-1">
                                        <Label>Indicado por</Label>
                                        <Input
                                            value={form.indicadoPor ?? ""}
                                            onChange={handleChange("indicadoPor")}
                                        />
                                    </div>

                                    <div className="space-y-1">
                                        <Label>Status</Label>
                                        <Select
                                            value={form.status ? "true" : "false"}
                                            onValueChange={(v) => handleSelect("status", v === "true")}
                                        >
                                            <SelectTrigger><SelectValue /></SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="true">Ativo</SelectItem>
                                                <SelectItem value="false">Inativo</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                </div>
                            </TabsContent>

                            {/* ======================================= */}
                            {/*           ABA: RESPONSÁVEL             */}
                            {/* ======================================= */}
                            <TabsContent value="responsavel">
                                <div className="grid md:grid-cols-2 gap-4">

                                    <div className="space-y-1">
                                        <Label>Nome do responsável</Label>
                                        <Input
                                            value={form.nomeResponsavel ?? ""}
                                            onChange={handleChange("nomeResponsavel")}
                                        />
                                    </div>

                                    <div className="space-y-1">
                                        <Label>CPF responsável</Label>
                                        <Input
                                            value={form.cpfResponsavel ?? ""}
                                            onChange={handleChange("cpfResponsavel")}
                                        />
                                    </div>

                                    <div className="space-y-1">
                                        <Label>Estado civil responsável</Label>
                                        <Input
                                            value={form.estadoCivilResponsavel ?? ""}
                                            onChange={handleChange("estadoCivilResponsavel")}
                                        />
                                    </div>

                                    <div className="space-y-1">
                                        <Label>Cônjuge</Label>
                                        <Input
                                            value={form.conjugeResponsavel ?? ""}
                                            onChange={handleChange("conjugeResponsavel")}
                                        />
                                    </div>

                                </div>
                            </TabsContent>

                            {/* ======================================= */}
                            {/*           ABA: CONVÊNIO                */}
                            {/* ======================================= */}
                            <TabsContent value="convenio">
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <Label>Convênio</Label>
                                        <Input
                                            value={form.convenio ?? ""}
                                            onChange={handleChange("convenio")}
                                        />
                                    </div>

                                    <div className="space-y-1">
                                        <Label>Nº inscrição</Label>
                                        <Input
                                            value={form.numeroInscricao ?? ""}
                                            onChange={handleChange("numeroInscricao")}
                                        />
                                    </div>
                                </div>
                            </TabsContent>

                            {/* ======================================= */}
                            {/*          ABA: INSPEÇÃO BUCAL           */}
                            {/* ======================================= */}
                            <TabsContent value="inspecao">
                                <div className="grid md:grid-cols-2 gap-4">

                                    {[
                                        "lingua", "mucosa", "palato", "labios", "gengivas",
                                        "nariz", "face", "ganglios", "glandulasSalivares"
                                    ].map((field) => (
                                        <div className="space-y-1" key={field}>
                                            <Label>{formatEnum(field)}</Label>
                                            <Input
                                                value={(form as any)[field] ?? ""}
                                                onChange={handleChange(field as any)}
                                            />
                                        </div>
                                    ))}

                                    {/* boolean com radio buttons */}
                                    <RadioBoolean
                                        value={form.alteracaoOclusao ?? null}
                                        onChange={handleRadioBoolean("alteracaoOclusao")}
                                        label="Alteração de oclusão?"
                                    />

                                    <div className="space-y-1">
                                        <Label>Tipo de alteração</Label>
                                        <Input
                                            value={form.alteracaoOclusaoTipo ?? ""}
                                            onChange={handleChange("alteracaoOclusaoTipo")}
                                        />
                                    </div>

                                    <RadioBoolean
                                        value={form.protese ?? null}
                                        onChange={handleRadioBoolean("protese")}
                                        label="Prótese?"
                                    />

                                    <div className="space-y-1">
                                        <Label>Tipo de prótese</Label>
                                        <Input
                                            value={form.proteseTipo ?? ""}
                                            onChange={handleChange("proteseTipo")}
                                        />
                                    </div>

                                    <div className="col-span-2 space-y-1">
                                        <Label>Outras observações</Label>
                                        <Textarea
                                            value={form.outrasObservacoes ?? ""}
                                            onChange={handleChange("outrasObservacoes")}
                                        />
                                    </div>

                                </div>
                            </TabsContent>

                            {/* ======================================= */}
                            {/*           ABA: ANAMNESE                */}
                            {/* ======================================= */}
                            <TabsContent value="anamnese">
                                <div className="grid md:grid-cols-2 gap-4">

                                    {[
                                        { field: "febreReumatica", label: "Febre Reumática?" },
                                        { field: "hepatite", label: "Hepatite?" },
                                        { field: "diabetes", label: "Diabetes?" },
                                        { field: "hipertensaoArterialSistemica", label: "Hipertensão Arterial?" },
                                        { field: "portadorHiv", label: "Portador HIV?" },
                                        { field: "alteracaoCoagulacaoSanguinea", label: "Alteração na Coagulação Sanguínea?" },
                                        { field: "reacoesAlergicas", label: "Reações Alérgicas?" },
                                        { field: "doencasSistemicas", label: "Doenças Sistêmicas?" },
                                        { field: "internacaoRecente", label: "Internação Recente?" },
                                        { field: "utilizandoMedicacao", label: "Utilizando Medicação?" },
                                        { field: "fumante", label: "Fumante?" },
                                        { field: "bebidasAlcoolicas", label: "Consome Bebidas Alcoólicas?" },
                                        { field: "problemasCardiacos", label: "Problemas Cardíacos?" },
                                        { field: "problemasRenais", label: "Problemas Renais?" },
                                        { field: "problemasGastricos", label: "Problemas Gástricos?" },
                                        { field: "problemasRespiratorios", label: "Problemas Respiratórios?" },
                                        { field: "problemasAlergicos", label: "Problemas Alérgicos?" },
                                        { field: "problemasArticularesOuReumatismo", label: "Problemas Articulares ou Reumatismo?" }
                                    ].map(({ field, label }) => (
                                        <RadioBoolean
                                            key={field}
                                            value={(form as any)[field] ?? null}
                                            onChange={handleRadioBoolean(field as any)}
                                            label={label}
                                        />
                                    ))}

                                    <div className="space-y-1">
                                        <Label>Quais alergias?</Label>
                                        <Textarea
                                            value={form.problemasAlergicosQuais ?? ""}
                                            onChange={handleChange("problemasAlergicosQuais")}
                                        />
                                    </div>

                                    <div className="space-y-1">
                                        <Label>Queixa principal</Label>
                                        <Textarea
                                            value={form.queixaPrincipal ?? ""}
                                            onChange={handleChange("queixaPrincipal")}
                                        />
                                    </div>

                                </div>
                            </TabsContent>

                            {/* ======================================= */}
                            {/*        ABA: QUESTIONÁRIO SAÚDE         */}
                            {/* ======================================= */}
                            <TabsContent value="questionario">
                                <div className="grid md:grid-cols-2 gap-4">

                                    {[
                                        { field: "sofreDoenca", label: "Sofre de alguma doença?" },
                                        { field: "tratamentoMedicoAtual", label: "Faz tratamento médico atualmente?" },
                                        { field: "gravidez", label: "Está grávida?" },
                                        { field: "usoMedicacao", label: "Faz uso de medicação?" },
                                        { field: "teveAlergia", label: "Já teve alergia?" },
                                        { field: "foiOperado", label: "Já foi operado?" },
                                        { field: "problemasCicatrizacao", label: "Tem problemas com cicatrização?" },
                                        { field: "problemasAnestesia", label: "Tem problemas com anestesia?" },
                                        { field: "problemasHemorragia", label: "Tem problemas com hemorragia?" }
                                    ].map(({ field, label }) => (
                                        <RadioBoolean
                                            key={field}
                                            value={(form as any)[field] ?? null}
                                            onChange={handleRadioBoolean(field as any)}
                                            label={label}
                                        />
                                    ))}

                                    <div className="space-y-1">
                                        <Label>Sofre doença — quais?</Label>
                                        <Textarea
                                            value={form.sofreDoencaQuais ?? ""}
                                            onChange={handleChange("sofreDoencaQuais")}
                                        />
                                    </div>

                                    <div className="space-y-1">
                                        <Label>Uso medicação — quais?</Label>
                                        <Textarea
                                            value={form.usoMedicacaoQuais ?? ""}
                                            onChange={handleChange("usoMedicacaoQuais")}
                                        />
                                    </div>

                                </div>
                            </TabsContent>

                            {/* ======================================= */}
                            {/*             ABA: FINALIZAÇÃO            */}
                            {/* ======================================= */}
                            <TabsContent value="final">
                                <div className="space-y-3">
                                    <Label>Observações finais</Label>
                                    <Textarea
                                        value={form.outrasObservacoes ?? ""}
                                        onChange={handleChange("outrasObservacoes")}
                                        rows={4}
                                    />
                                </div>
                            </TabsContent>

                        </Tabs>
                    </CardContent>

                    <CardFooter className="flex justify-end gap-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleClose}
                        >
                            Cancelar
                        </Button>

                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "Atualizando..." : "Atualizar Paciente"}
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    )

    // Se for modal, usa Dialog
    if (!isPage) {
        return (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
                    {content}
                </DialogContent>
            </Dialog>
        )
    }

    // Se for página, retorna o conteúdo diretamente
    return content
}