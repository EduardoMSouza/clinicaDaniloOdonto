package consultorio.domain.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.DayOfWeek;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class HorarioTrabalho {
    @Enumerated(EnumType.STRING)
    @Column(name = "dia_semana", nullable = false)
    private DayOfWeek diaSemana;

    @Column(name = "hora_inicio_manha")
    private LocalTime horaInicioManha;

    @Column(name = "hora_fim_manha")
    private LocalTime horaFimManha;

    @Column(name = "hora_inicio_tarde")
    private LocalTime horaInicioTarde;

    @Column(name = "hora_fim_tarde")
    private LocalTime horaFimTarde;

    @Column(name = "ativo")
    private Boolean ativo = true;
}