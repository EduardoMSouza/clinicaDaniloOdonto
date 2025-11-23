
import { DentistaCard } from './DentistaCard';
import {DentistaResponse} from "@/types/dentistaType";

interface DentistaListProps {
    dentistas: DentistaResponse[];
    onEdit: (dentista: DentistaResponse) => void;
    onView: (dentista: DentistaResponse) => void;
    onToggleStatus: (dentista: DentistaResponse) => void;
    loading: boolean;
}

export const DentistaList = ({
                                 dentistas,
                                 onEdit,
                                 onView,
                                 onToggleStatus,
                                 loading
                             }: DentistaListProps) => {
    if (loading) {
        return (
            <div className="loading">
                <div className="spinner"></div>
                <p>Carregando dentistas...</p>
            </div>
        );
    }

    if (dentistas.length === 0) {
        return (
            <div className="empty-state">
                <h3>Nenhum dentista encontrado</h3>
                <p>Tente ajustar os filtros de busca ou cadastre um novo dentista.</p>
            </div>
        );
    }

    return (
        <div className="dentista-list">
            {dentistas.map(dentista => (
                <DentistaCard
                    key={dentista.id}
                    dentista={dentista}
                    onEdit={onEdit}
                    onView={onView}
                    onToggleStatus={onToggleStatus}
                />
            ))}

            <style jsx>{`
        .dentista-list {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 16px;
          padding: 20px 0;
        }
        
        .loading {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 40px;
          color: #6c757d;
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
        
        .empty-state {
          text-align: center;
          padding: 40px;
          color: #6c757d;
        }
        
        .empty-state h3 {
          margin-bottom: 8px;
        }
      `}</style>
        </div>
    );
};