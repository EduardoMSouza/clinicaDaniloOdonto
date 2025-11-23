'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {DentistaResponse} from "@/types/dentistaType";
import dentistaService from "@/services/dentistasService";
import {DentistaFormEdit} from "@/app/dashboard/dentistas/_components/DentistaFormEdit";


export default function EditarDentistaPage() {
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

    const handleSuccess = () => {
        router.push('/dentistas');
    };

    const handleCancel = () => {
        router.push('/dentistas');
    };

    if (loading) {
        return (
            <div className="page-loading">
                <div className="spinner"></div>
                <p>Carregando dentista...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="page-error">
                <h2>Erro</h2>
                <p>{error}</p>
                <button onClick={() => router.push('/dentistas')} className="btn btn-primary">
                    Voltar para a lista
                </button>
            </div>
        );
    }

    if (!dentista) {
        return (
            <div className="page-error">
                <h2>Dentista não encontrado</h2>
                <button onClick={() => router.push('/dentistas')} className="btn btn-primary">
                    Voltar para a lista
                </button>
            </div>
        );
    }

    return (
        <div className="editar-dentista-page">
            <div className="page-container">
                <DentistaFormEdit
                    dentista={dentista}
                    onSuccess={handleSuccess}
                    onCancel={handleCancel}
                />
            </div>

            <style jsx>{`
        .editar-dentista-page {
          padding: 20px;
          background: #f8f9fa;
          min-height: 100vh;
        }
        
        .page-container {
          max-width: 500px;
          margin: 0 auto;
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