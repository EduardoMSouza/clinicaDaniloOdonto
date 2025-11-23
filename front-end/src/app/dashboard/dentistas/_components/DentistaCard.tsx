import {DentistaResponse} from "@/types/dentistaType";


interface DentistaCardProps {
    dentista: DentistaResponse;
    onEdit: (dentista: DentistaResponse) => void;
    onView: (dentista: DentistaResponse) => void;
    onToggleStatus: (dentista: DentistaResponse) => void;
}

export const DentistaCard = ({ dentista, onEdit, onView, onToggleStatus }: DentistaCardProps) => {
    return (
        <div className={`dentista-card ${!dentista.ativo ? 'inactive' : ''}`}>
            <div className="dentista-info">
                <h3>{dentista.nome}</h3>
                <div className="dentista-details">
                    <span className="cro">CRO: {dentista.cro}</span>
                    <span className="especialidade">{dentista.especialidade}</span>
                    <span className="email">{dentista.email}</span>
                    <span className="telefone">{dentista.telefone}</span>
                </div>
                <div className={`status ${dentista.ativo ? 'active' : 'inactive'}`}>
                    {dentista.ativo ? 'Ativo' : 'Inativo'}
                </div>
            </div>

            <div className="dentista-actions">
                <button onClick={() => onView(dentista)} className="btn-view">
                    Ver
                </button>
                <button onClick={() => onEdit(dentista)} className="btn-edit">
                    Editar
                </button>
                <button
                    onClick={() => onToggleStatus(dentista)}
                    className={`btn-status ${dentista.ativo ? 'inactivate' : 'activate'}`}
                >
                    {dentista.ativo ? 'Inativar' : 'Ativar'}
                </button>
            </div>

            <style jsx>{`
        .dentista-card {
          background: white;
          border-radius: 8px;
          padding: 16px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          border-left: 4px solid #007bff;
        }
        
        .dentista-card.inactive {
          opacity: 0.6;
          border-left-color: #6c757d;
        }
        
        .dentista-info h3 {
          margin: 0 0 8px 0;
          color: #333;
        }
        
        .dentista-details {
          display: flex;
          flex-direction: column;
          gap: 4px;
          margin-bottom: 12px;
        }
        
        .cro {
          font-weight: bold;
          color: #007bff;
        }
        
        .especialidade {
          background: #e9ecef;
          padding: 2px 8px;
          border-radius: 12px;
          font-size: 12px;
          width: fit-content;
        }
        
        .status {
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: bold;
          width: fit-content;
        }
        
        .status.active {
          background: #d4edda;
          color: #155724;
        }
        
        .status.inactive {
          background: #f8d7da;
          color: #721c24;
        }
        
        .dentista-actions {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }
        
        button {
          padding: 6px 12px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 12px;
        }
        
        .btn-view {
          background: #17a2b8;
          color: white;
        }
        
        .btn-edit {
          background: #ffc107;
          color: #212529;
        }
        
        .btn-status.inactivate {
          background: #dc3545;
          color: white;
        }
        
        .btn-status.activate {
          background: #28a745;
          color: white;
        }
      `}</style>
        </div>
    );
};