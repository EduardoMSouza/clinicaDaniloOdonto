// types/DentistaType.ts

export interface DentistaRequest {
    nome: string;
    cro: string;
    especialidade: string;
    telefone: string;
    email: string;
    ativo: boolean;
}

export interface DentistaResponse {
    id: number;
    nome: string;
    cro: string;
    especialidade: string;
    telefone: string;
    email: string;
    ativo: boolean;
}

export interface DentistaFormData {
    nome: string;
    cro: string;
    especialidade: string;
    telefone: string;
    email: string;
    ativo: boolean;
}

export interface DentistaListResponse {
    content: DentistaResponse[];
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
}

// Para uso em selects/dropdowns
export interface DentistaOption {
    value: number;
    label: string;
    cro: string;
    especialidade: string;
}

// Filtros para busca
export interface DentistaFilter {
    nome?: string;
    cro?: string;
    especialidade?: string;
    ativo?: boolean;
}

// Estatísticas (se necessário)
export interface DentistaStats {
    total: number;
    ativos: number;
    inativos: number;
    porEspecialidade: { [key: string]: number };
}

// Hook de estado do dentista
export interface DentistaState {
    dentistas: DentistaResponse[];
    selectedDentista: DentistaResponse | null;
    loading: boolean;
    error: string | null;
    filters: DentistaFilter;
}

// Ações para useReducer (se usar gerenciamento de estado)
export type DentistaAction =
    | { type: 'SET_LOADING'; payload: boolean }
    | { type: 'SET_DENTISTAS'; payload: DentistaResponse[] }
    | { type: 'SET_SELECTED_DENTISTA'; payload: DentistaResponse | null }
    | { type: 'ADD_DENTISTA'; payload: DentistaResponse }
    | { type: 'UPDATE_DENTISTA'; payload: DentistaResponse }
    | { type: 'DELETE_DENTISTA'; payload: number }
    | { type: 'SET_FILTERS'; payload: DentistaFilter }
    | { type: 'SET_ERROR'; payload: string };

// Validação com Zod (opcional)
import { z } from 'zod';

export const dentistaRequestSchema = z.object({
    nome: z.string().min(1, 'Nome é obrigatório').max(100, 'Nome muito longo'),
    cro: z.string().min(1, 'CRO é obrigatório').max(20, 'CRO muito longo'),
    especialidade: z.string().min(1, 'Especialidade é obrigatória').max(50, 'Especialidade muito longa'),
    telefone: z.string().max(20, 'Telefone muito longo').optional(),
    email: z.string().email('Email inválido').max(100, 'Email muito longo').optional(),
    ativo: z.boolean().default(true)
});

export type DentistaRequestValidation = z.infer<typeof dentistaRequestSchema>;

// Constantes para especialidades (se houver valores fixos)
export const ESPECIALIDADES = {
    ORTODONTIA: 'Ortodontia',
    ENDODONTIA: 'Endodontia',
    PERIODONTIA: 'Periodontia',
    CIRURGIA: 'Cirurgia',
    IMPLANTODONTIA: 'Implantodontia',
    DENTISTICA: 'Dentística',
    ODONTOPEDIATRIA: 'Odontopediatria',
    PROTESE: 'Prótese',
    RADIOLOGIA: 'Radiologia',
    GERAL: 'Clínico Geral'
} as const;

export type Especialidade = typeof ESPECIALIDADES[keyof typeof ESPECIALIDADES];

// Utilitários
export class DentistaUtils {
    static toOption(dentista: DentistaResponse): DentistaOption {
        return {
            value: dentista.id,
            label: `${dentista.nome} - ${dentista.cro}`,
            cro: dentista.cro,
            especialidade: dentista.especialidade
        };
    }

    static toFormData(dentista?: DentistaResponse): DentistaFormData {
        if (!dentista) {
            return {
                nome: '',
                cro: '',
                especialidade: '',
                telefone: '',
                email: '',
                ativo: true
            };
        }

        return {
            nome: dentista.nome,
            cro: dentista.cro,
            especialidade: dentista.especialidade,
            telefone: dentista.telefone || '',
            email: dentista.email || '',
            ativo: dentista.ativo
        };
    }

    static formatTelefone(telefone: string): string {
        // Formatação básica de telefone
        const cleaned = telefone.replace(/\D/g, '');
        if (cleaned.length === 11) {
            return cleaned.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
        }
        if (cleaned.length === 10) {
            return cleaned.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
        }
        return telefone;
    }

    static getStatusColor(ativo: boolean): string {
        return ativo ? 'success' : 'error';
    }

    static getStatusText(ativo: boolean): string {
        return ativo ? 'Ativo' : 'Inativo';
    }
}

// Hook personalizado para dentistas
export interface UseDentistasReturn {
    dentistas: DentistaResponse[];
    loading: boolean;
    error: string | null;
    createDentista: (data: DentistaRequest) => Promise<void>;
    updateDentista: (id: number, data: DentistaRequest) => Promise<void>;
    deleteDentista: (id: number) => Promise<void>;
    activateDentista: (id: number) => Promise<void>;
    inactivateDentista: (id: number) => Promise<void>;
    refetch: () => Promise<void>;
}

