'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import dentistaService from "@/services/dentistasService";
import {DentistaResponse} from "@/types/dentistaType";
import {DentistaSearch} from "@/app/dashboard/dentistas/_components/DentistaSearch";
import {DentistaList} from "@/app/dashboard/dentistas/_components/DentistaList";
import {DentistaComplete} from "@/app/dashboard/dentistas/_components/DentistaComplete";
import {DentistaHeader} from "@/app/dashboard/dentistas/_components/DentistaHeader";
import {DentistaFormEdit} from "@/app/dashboard/dentistas/_components/DentistaFormEdit";


export default function DentistasPage() {
    const router = useRouter();

    const [dentistas, setDentistas] = useState<DentistaResponse[]>([]);
    const [filteredDentistas, setFilteredDentistas] = useState<DentistaResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedDentista, setSelectedDentista] = useState<DentistaResponse | null>(null);
    const [showComplete, setShowComplete] = useState(false);
    const [showEdit, setShowEdit] = useState(false);

    useEffect(() => {
        loadDentistas();
    }, []);

    const loadDentistas = async () => {
        try {
            const data = await dentistaService.getAll();
            setDentistas(data);
            setFilteredDentistas(data);
        } catch (error) {
            console.error('Erro ao carregar dentistas:', error);
            alert('Erro ao carregar dentistas');
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (term: string) => {
        if (!term.trim()) {
            setFilteredDentistas(dentistas);
            return;
        }

        const filtered = dentistas.filter(dentista =>
            dentista.nome.toLowerCase().includes(term.toLowerCase()) ||
            dentista.cro.toLowerCase().includes(term.toLowerCase()) ||
            dentista.especialidade.toLowerCase().includes(term.toLowerCase())
        );
        setFilteredDentistas(filtered);
    };

    const handleFilterByStatus = (status: string) => {
        if (status === '') {
            setFilteredDentistas(dentistas);
        } else if (status === 'ativo') {
            setFilteredDentistas(dentistas.filter(d => d.ativo));
        } else if (status === 'inativo') {
            setFilteredDentistas(dentistas.filter(d => !d.ativo));
        }
    };

    const handleFilterByEspecialidade = (especialidade: string) => {
        if (!especialidade) {
            setFilteredDentistas(dentistas);
            return;
        }

        const filtered = dentistas.filter(dentista =>
            dentista.especialidade.toLowerCase().includes(especialidade.toLowerCase())
        );
        setFilteredDentistas(filtered);
    };

    const handleAddDentista = () => {
        router.push('/dentistas/novo_dentista');
    };

    const handleViewDentista = (dentista: DentistaResponse) => {
        setSelectedDentista(dentista);
        setShowComplete(true);
    };

    const handleEditDentista = (dentista: DentistaResponse) => {
        setSelectedDentista(dentista);
        setShowEdit(true);
    };

    const handleToggleStatus = async (dentista: DentistaResponse) => {
        if (!window.confirm(`Tem certeza que deseja ${dentista.ativo ? 'inativar' : 'ativar'} este dentista?`)) {
            return;
        }

        try {
            if (dentista.ativo) {
                await dentistaService.inactivate(dentista.id);
            } else {
                await dentistaService.activate(dentista.id);
            }
            await loadDentistas();
            alert(`Dentista ${dentista.ativo ? 'inativado' : 'ativado'} com sucesso!`);
        } catch (error: any) {
            alert(error.message);
        }
    };

    const handleCloseModal = () => {
        setShowComplete(false);
        setShowEdit(false);
        setSelectedDentista(null);
    };

    const handleEditSuccess = async () => {
        setShowEdit(false);
        setSelectedDentista(null);
        await loadDentistas();
    };

    return (
        <div className="dentistas-page">
            <div className="page-content">
                <DentistaHeader
                    onAddDentista={handleAddDentista}
                    dentistasCount={filteredDentistas.length}
                />

                <DentistaSearch
                    onSearch={handleSearch}
                    onFilterByStatus={handleFilterByStatus}
                    onFilterByEspecialidade={handleFilterByEspecialidade}
                />

                <DentistaList
                    dentistas={filteredDentistas}
                    onEdit={handleEditDentista}
                    onView={handleViewDentista}
                    onToggleStatus={handleToggleStatus}
                    loading={loading}
                />
            </div>

            {/* Modal de visualização completa */}
            {showComplete && selectedDentista && (
                <div className="modal-overlay">
                    <DentistaComplete
                        dentista={selectedDentista}
                        onClose={handleCloseModal}
                        onEdit={handleEditDentista}
                    />
                </div>
            )}

            {/* Modal de edição */}
            {showEdit && selectedDentista && (
                <div className="modal-overlay">
                    <DentistaFormEdit
                        dentista={selectedDentista}
                        onSuccess={handleEditSuccess}
                        onCancel={handleCloseModal}
                    />
                </div>
            )}

            <style jsx>{`
        .dentistas-page {
          padding: 20px;
          background: #f8f9fa;
          min-height: 100vh;
        }
        
        .page-content {
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;
          z-index: 1000;
        }
      `}</style>
        </div>
    );
}