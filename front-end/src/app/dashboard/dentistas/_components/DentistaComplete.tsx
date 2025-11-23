import {DentistaResponse} from "@/types/dentistaType";


interface DentistaCompleteProps {
    dentista: DentistaResponse;
    onClose: () => void;
    onEdit: (dentista: DentistaResponse) => void;
}

export const DentistaComplete = ({ dentista, onClose, onEdit }: DentistaCompleteProps) => {
    return (
        <div className="dentista-complete">
            <div className="header">
                <h2>Detalhes do Dentista</h2>
                <button onClick={onClose} className="close-btn">×</button>
            </div>

            <div className="dentista-content">
                <div className="section">
                    <h3>Informações Pessoais</h3>
                    <div className="info-grid">
                        <div className="info-item">
                            <label>Nome:</label>
                            <span>{dentista.nome}</span>
                        </div>
                        <div className="info-item">
                            <label>CRO:</label>
                            <span>{dentista.cro}</span>
                        </div>
                        <div className="info-item">
                            <label>Especialidade:</label>
                            <span>{dentista.especialidade}</span>
                        </div>
                        <div className="info-item">
                            <label>Email:</label>
                            <span>{dentista.email || 'Não informado'}</span>
                        </div>
                        <div className="info-item">
                            <label>Telefone:</label>
                            <span>{dentista.telefone || 'Não informado'}</span>
                        </div>
                        <div className="info-item">
                            <label>Status:</label>
                            <span className={`status ${dentista.ativo ? 'active' : 'inactive'}`}>
                {dentista.ativo ? 'Ativo' : 'Inativo'}
              </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="actions">
                <button onClick={onClose} className="btn btn-secondary">
                    Fechar
                </button>
                <button onClick={() => onEdit(dentista)} className="btn btn-primary">
                    Editar Dentista
                </button>
            </div>

            <style jsx>{`
        .dentista-complete {
          background: white;
          border-radius: 8px;
          max-width: 600px;
          max-height: 80vh;
          overflow-y: auto;
        }
        
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px;
          border-bottom: 1px solid #dee2e6;
        }
        
        .close-btn {
          background: none;
          border: none;
          font-size: 24px;
          cursor: pointer;
        }
        
        .dentista-content {
          padding: 20px;
        }
        
        .section {
          margin-bottom: 20px;
        }
        
        .section h3 {
          margin-bottom: 12px;
          color: #495057;
        }
        
        .info-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        
        .info-item {
          display: flex;
          flex-direction: column;
        }
        
        .info-item label {
          font-weight: bold;
          color: #6c757d;
          font-size: 12px;
          margin-bottom: 4px;
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
        
        .actions {
          display: flex;
          justify-content: flex-end;
          gap: 12px;
          padding: 20px;
          border-top: 1px solid #dee2e6;
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
      `}</style>
        </div>
    );
};