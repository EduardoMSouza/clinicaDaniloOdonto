package consultorio.domain.repository;

import consultorio.domain.entity.Agendamento;
import consultorio.domain.entity.enums.StatusAgendamento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface AgendamentoRepository extends JpaRepository<Agendamento, Long> {

    // Buscar agendamentos por dentista e data
    List<Agendamento> findByDentistaIdAndDataHoraBetween(Long dentistaId, LocalDateTime start, LocalDateTime end);

    // Buscar agendamentos por paciente
    List<Agendamento> findByPacienteId(Long pacienteId);

    // Buscar agendamentos por status
    List<Agendamento> findByStatus(StatusAgendamento status);

    // Buscar agendamentos por período
    List<Agendamento> findByDataHoraBetween(LocalDateTime start, LocalDateTime end);

    // Verificar conflito de horário - CORRIGIDO
    @Query("""
        SELECT COUNT(a) > 0 FROM Agendamento a 
        WHERE a.dentista.id = :dentistaId 
        AND a.status NOT IN :statusExcluidos
        AND (
            (a.dataHora < :dataHoraFim AND a.dataHoraFim > :dataHora)
            OR (a.dataHora = :dataHora)
        )
        AND (:agendamentoId IS NULL OR a.id != :agendamentoId)
    """)
    boolean existsConflitoHorario(
            @Param("dentistaId") Long dentistaId,
            @Param("dataHora") LocalDateTime dataHora,
            @Param("dataHoraFim") LocalDateTime dataHoraFim,
            @Param("statusExcluidos") List<StatusAgendamento> statusExcluidos,
            @Param("agendamentoId") Long agendamentoId);

    // Agendamentos do dia - CORRIGIDO
    @Query("SELECT a FROM Agendamento a WHERE CAST(a.dataHora AS localdate) = :data AND a.status IN :statuses")
    List<Agendamento> findAgendamentosPorData(
            @Param("data") LocalDate data,
            @Param("statuses") List<StatusAgendamento> statuses);

    // Próximos agendamentos
    List<Agendamento> findByDataHoraAfterAndStatusInOrderByDataHoraAsc(
            LocalDateTime dataHora, List<StatusAgendamento> statuses);

    // Agendamentos do dia de hoje - método auxiliar
    default List<Agendamento> findAgendamentosHoje(List<StatusAgendamento> statuses) {
        return findAgendamentosPorData(LocalDate.now(), statuses);
    }
}