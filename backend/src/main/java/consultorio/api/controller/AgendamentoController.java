package consultorio.api.controller;

import consultorio.api.dto.request.AgendamentoRequest;
import consultorio.api.dto.response.AgendamentoResponse;
import consultorio.domain.entity.enums.StatusAgendamento;
import consultorio.domain.service.AgendamentoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/agendamentos")
@RequiredArgsConstructor
public class AgendamentoController {

    private final AgendamentoService agendamentoService;

    @PostMapping
    public ResponseEntity<AgendamentoResponse> create(@Valid @RequestBody AgendamentoRequest request) {
        AgendamentoResponse response = agendamentoService.create(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping
    public ResponseEntity<List<AgendamentoResponse>> findAll() {
        List<AgendamentoResponse> responses = agendamentoService.findAll();
        return ResponseEntity.ok(responses);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AgendamentoResponse> findById(@PathVariable Long id) {
        AgendamentoResponse response = agendamentoService.findById(id);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<AgendamentoResponse> update(
            @PathVariable Long id,
            @Valid @RequestBody AgendamentoRequest request) {
        AgendamentoResponse response = agendamentoService.update(id, request);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        agendamentoService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}/status/{status}")
    public ResponseEntity<AgendamentoResponse> updateStatus(
            @PathVariable Long id,
            @PathVariable StatusAgendamento status) {
        AgendamentoResponse response = agendamentoService.updateStatus(id, status);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/dentista/{dentistaId}")
    public ResponseEntity<List<AgendamentoResponse>> findByDentistaAndPeriodo(
            @PathVariable Long dentistaId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime start,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime end) {
        List<AgendamentoResponse> responses = agendamentoService.findByDentistaAndPeriodo(dentistaId, start, end);
        return ResponseEntity.ok(responses);
    }

    @GetMapping("/paciente/{pacienteId}")
    public ResponseEntity<List<AgendamentoResponse>> findByPaciente(@PathVariable Long pacienteId) {
        List<AgendamentoResponse> responses = agendamentoService.findByPaciente(pacienteId);
        return ResponseEntity.ok(responses);
    }

    @GetMapping("/hoje")
    public ResponseEntity<List<AgendamentoResponse>> findAgendamentosHoje() {
        List<AgendamentoResponse> responses = agendamentoService.findAgendamentosHoje();
        return ResponseEntity.ok(responses);
    }

    @GetMapping("/data/{data}")
    public ResponseEntity<List<AgendamentoResponse>> findAgendamentosPorData(
            @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate data) {
        List<AgendamentoResponse> responses = agendamentoService.findAgendamentosPorData(data);
        return ResponseEntity.ok(responses);
    }

    @GetMapping("/proximos")
    public ResponseEntity<List<AgendamentoResponse>> findProximosAgendamentos() {
        List<AgendamentoResponse> responses = agendamentoService.findProximosAgendamentos();
        return ResponseEntity.ok(responses);
    }
}