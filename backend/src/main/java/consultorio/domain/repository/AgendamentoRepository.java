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

    // ===========================================================
    // 🔍 BUSCAS SIMPLES (Spring Data Method Query)
    // ===========================================================

    List<Agendamento> findByPacienteId(Long pacienteId);

    List<Agendamento> findByDentistaId(Long dentistaId);

    List<Agendamento> findByDentistaIdAndPacienteId(Long dentistaId, Long pacienteId);

    List<Agendamento> findByStatus(StatusAgendamento status);

    List<Agendamento> findByStatusIn(List<StatusAgendamento> statuses);

    List<Agendamento> findByDataHoraBetween(LocalDateTime start, LocalDateTime end);

    List<Agendamento> findByDataHoraAfter(LocalDateTime dataHora);

    List<Agendamento> findByDataHoraBefore(LocalDateTime dataHora);

    List<Agendamento> findByDentistaIdAndDataHoraBetween(Long dentistaId, LocalDateTime start, LocalDateTime end);

    List<Agendamento> findByDentistaIdAndDataHoraAfter(Long dentistaId, LocalDateTime dataHora);


    // ===========================================================
    // 🔍 BUSCAR AGENDAMENTOS EM UMA DATA (SEM DATE())
    // ===========================================================

    @Query("""
        SELECT a FROM Agendamento a
        WHERE a.dataHora >= :inicio AND a.dataHora < :fim
    """)
    List<Agendamento> findByData(
            @Param("inicio") LocalDateTime inicio,
            @Param("fim") LocalDateTime fim
    );

    @Query("""
        SELECT a FROM Agendamento a
        WHERE a.dentista.id = :dentistaId
        AND a.dataHora >= :inicio AND a.dataHora < :fim
    """)
    List<Agendamento> findByDentistaIdAndData(
            @Param("dentistaId") Long dentistaId,
            @Param("inicio") LocalDateTime inicio,
            @Param("fim") LocalDateTime fim
    );


    // ===========================================================
    // 🔍 CONFLITOS DE HORÁRIO
    // ===========================================================
    @Query("""
        SELECT COUNT(a) > 0 FROM Agendamento a
        WHERE a.dentista.id = :dentistaId
        AND a.status IN :statuses
        AND (a.dataHora < :fim AND a.dataHoraFim > :inicio)
        AND (:agendamentoId IS NULL OR a.id <> :agendamentoId)
    """)
    boolean existsConflitoHorario(
            @Param("dentistaId") Long dentistaId,
            @Param("inicio") LocalDateTime inicio,
            @Param("fim") LocalDateTime fim,
            @Param("statuses") List<StatusAgendamento> statuses,
            @Param("agendamentoId") Long agendamentoId
    );


    // ===========================================================
    // 🔍 HORÁRIO EXATO DISPONÍVEL
    // ===========================================================
    @Query("""
        SELECT COUNT(a) = 0 FROM Agendamento a
        WHERE a.dentista.id = :dentistaId
        AND a.dataHora = :dataHora
        AND a.status IN :statuses
    """)
    boolean isHorarioDisponivel(
            @Param("dentistaId") Long dentistaId,
            @Param("dataHora") LocalDateTime dataHora,
            @Param("statuses") List<StatusAgendamento> statuses
    );


    // ===========================================================
    // 🔍 PRÓXIMOS AGENDAMENTOS
    // ===========================================================
    @Query("""
        SELECT a FROM Agendamento a
        WHERE a.dataHora >= :hoje
        AND a.status IN :statuses
        ORDER BY a.dataHora ASC
    """)
    List<Agendamento> findProximosAgendamentos(
            @Param("hoje") LocalDateTime hoje,
            @Param("statuses") List<StatusAgendamento> statuses
    );


    // ===========================================================
    // 🔍 AGENDAMENTOS DO DIA (SEM CURRENT_DATE + 1)
    // ===========================================================
    @Query("""
        SELECT a FROM Agendamento a
        WHERE a.dentista.id = :dentistaId
        AND a.dataHora >= :inicio AND a.dataHora < :fim
        AND a.status IN :statuses
        ORDER BY a.dataHora ASC
    """)
    List<Agendamento> findAgendamentosHoje(
            @Param("dentistaId") Long dentistaId,
            @Param("inicio") LocalDateTime inicio,
            @Param("fim") LocalDateTime fim,
            @Param("statuses") List<StatusAgendamento> statuses
    );


    // ===========================================================
    // 🔍 AGENDAMENTOS POR MÊS (SEM YEAR(), MONTH())
    // ===========================================================
    @Query("""
        SELECT a FROM Agendamento a
        WHERE a.dentista.id = :dentistaId
        AND a.dataHora >= :inicio AND a.dataHora < :fim
        ORDER BY a.dataHora ASC
    """)
    List<Agendamento> findByDentistaIdAndMes(
            @Param("dentistaId") Long dentistaId,
            @Param("inicio") LocalDateTime inicio,
            @Param("fim") LocalDateTime fim
    );


    // ===========================================================
    // 🔍 PACIENTE COM AGENDAMENTOS FUTUROS
    // ===========================================================
    @Query("""
        SELECT COUNT(a) > 0 FROM Agendamento a
        WHERE a.paciente.id = :pacienteId
        AND a.dataHora > :agora
        AND a.status IN :statuses
    """)
    boolean existsAgendamentoFuturo(
            @Param("pacienteId") Long pacienteId,
            @Param("agora") LocalDateTime agora,
            @Param("statuses") List<StatusAgendamento> statuses
    );


    // ===========================================================
    // 🔍 CONTAGENS OTIMIZADAS
    // ===========================================================
    @Query("SELECT COUNT(a) FROM Agendamento a WHERE a.status = :status")
    Long countByStatus(@Param("status") StatusAgendamento status);

    @Query("SELECT COUNT(a) FROM Agendamento a WHERE a.dentista.id = :dentistaId AND a.status = :status")
    Long countByDentistaIdAndStatus(
            @Param("dentistaId") Long dentistaId,
            @Param("status") StatusAgendamento status
    );

    @Query("SELECT COUNT(a) FROM Agendamento a WHERE a.dataHora BETWEEN :inicio AND :fim")
    Long countByPeriodo(
            @Param("inicio") LocalDateTime inicio,
            @Param("fim") LocalDateTime fim
    );
}
