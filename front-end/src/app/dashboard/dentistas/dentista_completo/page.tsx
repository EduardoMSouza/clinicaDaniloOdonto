'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {DentistaResponse} from "@/types/dentistaType";
import dentistaService from "@/services/dentistasService";
import {DentistaComplete} from "@/app/dashboard/dentistas/_components/DentistaComplete";


export default function DentistaCompletoPage() {
    const params = useParams();
    const router = useRouter();
    const id = parseInt(params.id as string);

    const [dentista, setDentista] = useState<DentistaResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        loadDentista();
    }, [id]);

    const loadDentista = async () => {
        try {
            const data = await dentistaService.getById(id);
            setDentista(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        router.push('/dentistas');
    };

    const handleEdit = (dentista: DentistaResponse) => {
        router.push(`/dentistas/editar_dentista/${dentista.id}`);
    };

    if (loading) {
        return (
            <div className="page-loading">
                <div className="spinner"></div>
                <p>Carregando dentista...</p>
            </div>
        );
    }

    if (error || !dentista) {
        return (
            <div className="page-error">
                <h2>{error || 'Dentista não encontrado'}</h2>
                <button onClick={() => router.push('/dentistas')} className="btn btn-primary">
                    Voltar para a lista
                </button>
            </div>
        );
    }

    return (
        <div className="dentista-completo-page">
            <div className="page-overlay">
                <DentistaComplete
                    dentista={dentista}
                    onClose={handleClose}
                    onEdit={handleEdit}
                />
            </div>

            <style jsx>{`
        .dentista-completo-page {
          padding: 20px;
          background: #f8f9fa;
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: flex-start;
        }
        
        .page-overlay {
          width: 100%;
          max-width: 600px;
        }
        
        .page-loading, .page-error {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 40px;
          text-align: center;
        }
        
        .spinner {
          width: 40px;
          height: 40px;
          border: 4px solid #f3f3f3;
          border-top: 4px solid #007bff;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 16px;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .btn {
          padding: 10px 20px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          margin-top: 16px;
        }
        
        .btn-primary {
          background: #007bff;
          color: white;
        }
      `}</style>
        </div>
    );
}