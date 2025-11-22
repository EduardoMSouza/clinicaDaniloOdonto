package consultorio.domain.repository;

import consultorio.api.dto.response.PacienteResumoResponse;
import consultorio.domain.entity.Paciente;
import consultorio.domain.repository.projection.PacienteResumoProjection;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PacienteRepository extends JpaRepository<Paciente, Long> {

    // Consulta otimizada usando projection
    @Query("SELECT p.nome as nome, p.cpf as cpf, p.dataNascimento as dataNascimento, " +
            "p.createdAt as criadoEm, p.prontuarioNumero as prontuarioNumero " +
            "FROM Paciente p")
    List<PacienteResumoProjection> findAllResumo();


    // Consulta com busca por nome
    @Query("SELECT p.nome as nome, p.cpf as cpf, p.dataNascimento as dataNascimento, " +
            "p.createdAt as criadoEm, p.prontuarioNumero as prontuarioNumero " +
            "FROM Paciente p WHERE LOWER(p.nome) LIKE LOWER(CONCAT('%', :nome, '%'))")
    List<PacienteResumoProjection> findResumoByNomeContaining(@Param("nome") String nome);

    // Métodos existentes mantidos...
    Optional<Paciente> findByCpf(String cpf);
    Optional<Paciente> findByRg(String rg);
    boolean existsByCpf(String cpf);
    boolean existsByRg(String rg);

    @Query("SELECT p FROM Paciente p WHERE p.cpf = :cpf AND p.id != :id")
    boolean existsByCpfAndIdNot(@Param("cpf") String cpf, @Param("id") Long id);

    @Query("SELECT p FROM Paciente p WHERE p.rg = :rg AND p.id != :id")
    boolean existsByRgAndIdNot(@Param("rg") String rg, @Param("id") Long id);

    List<Paciente> findByStatus(Boolean status);
    List<Paciente> findByNomeContainingIgnoreCase(String nome);

    Page<Paciente> findByStatus(Boolean status, Pageable pageable);
    Page<Paciente> findByNomeContainingIgnoreCase(String nome, Pageable pageable);
}