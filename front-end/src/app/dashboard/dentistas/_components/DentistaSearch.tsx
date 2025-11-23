import { useState } from 'react';

interface DentistaSearchProps {
    onSearch: (term: string) => void;
    onFilterByStatus: (status: string) => void;
    onFilterByEspecialidade: (especialidade: string) => void;
}

export const DentistaSearch = ({
                                   onSearch,
                                   onFilterByStatus,
                                   onFilterByEspecialidade
                               }: DentistaSearchProps) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch(searchTerm);
    };

    const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onFilterByStatus(e.target.value);
    };

    const handleEspecialidadeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onFilterByEspecialidade(e.target.value);
    };

    return (
        <div className="dentista-search">
            <form onSubmit={handleSearch} className="search-form">
                <div className="search-input">
                    <input
                        type="text"
                        placeholder="Buscar por nome..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button type="submit">Buscar</button>
                </div>
            </form>

            <div className="filters">
                <select onChange={handleStatusChange} defaultValue="">
                    <option value="">Todos os status</option>
                    <option value="ativo">Ativos</option>
                    <option value="inativo">Inativos</option>
                </select>

                <select onChange={handleEspecialidadeChange} defaultValue="">
                    <option value="">Todas especialidades</option>
                    <option value="Ortodontia">Ortodontia</option>
                    <option value="Endodontia">Endodontia</option>
                    <option value="Periodontia">Periodontia</option>
                    <option value="Cirurgia">Cirurgia</option>
                    <option value="Clínico Geral">Clínico Geral</option>
                </select>
            </div>

            <style jsx>{`
        .dentista-search {
          background: white;
          padding: 20px;
          border-radius: 8px;
          margin-bottom: 20px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        .search-form {
          margin-bottom: 15px;
        }
        
        .search-input {
          display: flex;
          gap: 10px;
        }
        
        .search-input input {
          flex: 1;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 4px;
        }
        
        .search-input button {
          padding: 10px 20px;
          background: #007bff;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        
        .filters {
          display: flex;
          gap: 15px;
        }
        
        .filters select {
          padding: 8px 12px;
          border: 1px solid #ddd;
          border-radius: 4px;
          background: white;
        }
        
        @media (max-width: 768px) {
          .search-input {
            flex-direction: column;
          }
          
          .filters {
            flex-direction: column;
          }
        }
      `}</style>
        </div>
    );
};