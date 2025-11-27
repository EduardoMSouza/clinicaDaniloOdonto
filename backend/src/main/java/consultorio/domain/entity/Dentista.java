package consultorio.domain.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "dentistas")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Dentista {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nome;

    @Column(unique = true, nullable = false)
    private String cro;

    private String email;
    private String telefone;
    private String especialidade;

    @Column(nullable = false)
    private Boolean ativo = true;

    //horarios do dentista
    @ElementCollection
    @CollectionTable(name = "dentista_horarios", joinColumns = @JoinColumn(name = "dentista_id"))
    private List<HorarioTrabalho> horarios = new ArrayList<>();

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "updated_at")
    private LocalDateTime updatedAt = LocalDateTime.now();

    // ✅ ADICIONAR Callback para updatedAt
    @PreUpdate
    public void preUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}