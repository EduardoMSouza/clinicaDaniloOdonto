import { useState } from 'react';
import {DentistaRequest} from "@/types/dentistaType";
import dentistaService from "@/services/dentistasService";


interface DentistaFormCreateProps {
    onSuccess: () => void;
    onCancel: () => void;
}

export const DentistaFormCreate = ({ onSuccess, onCancel }: DentistaFormCreateProps) => {
    const [formData, setFormData] = useState<DentistaRequest>({
        nome: '',
        cro: '',
        especialidade: '',
        telefone: '',
        email: '',
        ativo: true
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // Validação básica
            if (!formData.nome.trim() || !formData.cro.trim() || !formData.especialidade.trim()) {
                setError('Nome, CRO e Especialidade são obrigatórios');
                return;
            }

            await dentistaService.create(formData);
            onSuccess();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="dentista-form">
            <h2>Novo Dentista</h2>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Nome *</label>
                    <input
                        type="text"
                        name="nome"
                        value={formData.nome}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>CRO *</label>
                        <input
                            type="text"
                            name="cro"
                            value={formData.cro}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Especialidade *</label>
                        <input
                            type="text"
                            name="especialidade"
                            value={formData.especialidade}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Telefone</label>
                        <input
                            type="text"
                            name="telefone"
                            value={formData.telefone}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label>
                        <input
                            type="checkbox"
                            name="ativo"
                            checked={formData.ativo}
                            onChange={handleChange}
                        />
                        Dentista Ativo
                    </label>
                </div>

                {error && <div className="error">{error}</div>}

                <div className="form-actions">
                    <button type="button" onClick={onCancel} className="btn btn-secondary">
                        Cancelar
                    </button>
                    <button type="submit" disabled={loading} className="btn btn-primary">
                        {loading ? 'Salvando...' : 'Salvar'}
                    </button>
                </div>
            </form>

            <style jsx>{`
        .dentista-form {
          background: white;
          padding: 20px;
          border-radius: 8px;
          max-width: 500px;
        }
        
        h2 {
          margin-bottom: 20px;
        }
        
        .form-group {
          margin-bottom: 15px;
        }
        
        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
        }
        
        label {
          display: block;
          margin-bottom: 5px;
          font-weight: bold;
        }
        
        input[type="text"],
        input[type="email"] {
          width: 100%;
          padding: 8px;
          border: 1px solid #ddd;
          border-radius: 4px;
        }
        
        input[type="checkbox"] {
          margin-right: 8px;
        }
        
        .error {
          background: #f8d7da;
          color: #721c24;
          padding: 10px;
          border-radius: 4px;
          margin-bottom: 15px;
        }
        
        .form-actions {
          display: flex;
          justify-content: flex-end;
          gap: 10px;
          margin-top: 20px;
        }
        
        .btn {
          padding: 10px 20px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        
        .btn-primary {
          background: #007bff;
          color: white;
        }
        
        .btn-secondary {
          background: #6c757d;
          color: white;
        }
        
        .btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
      `}</style>
        </div>
    );
};