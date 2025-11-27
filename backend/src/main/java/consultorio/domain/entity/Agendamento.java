package consultorio.domain.entity;

import consultorio.domain.entity.enums.StatusAgendamento;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "agendamentos")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Agendamento {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "paciente_id", nullable = false)
    private Paciente paciente;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "dentista_id", nullable = false)
    private Dentista dentista;

    @Column(nullable = false)
    private LocalDateTime dataHora;

    // ✅ CALCULADO automaticamente baseado na duração
    @Column(nullable = false)
    private LocalDateTime dataHoraFim;

    private Integer duracaoMinutos = 30; // ✅ Valor padrão de 30 minutos

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private StatusAgendamento status = StatusAgendamento.AGENDADO;

    private String procedimento;
    private String observacoes;

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "updated_at")
    private LocalDateTime updatedAt = LocalDateTime.now();

    // ✅ CALLBACKS UNIFICADOS - APENAS UM @PreUpdate
    @PrePersist
    @PreUpdate
    public void calcularCampos() {
        // ✅ Calcular dataHoraFim sempre que dataHora ou duracaoMinutos mudar
        if (this.duracaoMinutos != null && this.dataHora != null) {
            this.dataHoraFim = this.dataHora.plusMinutes(this.duracaoMinutos);
        }

        // ✅ Atualizar updatedAt
        this.updatedAt = LocalDateTime.now();

        // ✅ Garantir que createdAt seja definido apenas na primeira vez
        if (this.createdAt == null) {
            this.createdAt = LocalDateTime.now();
        }
    }

    // ✅ MÉTODO CONVENIENTE para criar agendamento
    public static Agendamento criarAgendamento(Paciente paciente, Dentista dentista,
                                               LocalDateTime dataHora, String procedimento) {
        Agendamento agendamento = new Agendamento();
        agendamento.setPaciente(paciente);
        agendamento.setDentista(dentista);
        agendamento.setDataHora(dataHora);
        agendamento.setProcedimento(procedimento);
        agendamento.calcularCampos(); // Garante que dataHoraFim seja calculado
        return agendamento;
    }
}