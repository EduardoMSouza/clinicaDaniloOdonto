// AgendamentoController.java
package consultorio.api.controller;

import consultorio.api.dto.request.AgendamentoRequest;
import consultorio.api.dto.response.AgendamentoResponse;
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
@CrossOrigin(origins = "*") // Ajuste conforme necessário
public class AgendamentoController {

    private final AgendamentoService agendamentoService;

    // ====================== CREATE ======================
    @PostMapping
    public ResponseEntity<AgendamentoResponse> criar(@Valid @RequestBody AgendamentoRequest request) {
        AgendamentoResponse response = agendamentoService.create(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    // ====================== READ ======================
    @GetMapping("/{id}")
    public ResponseEntity<AgendamentoResponse> buscarPorId(@PathVariable Long id) {
        AgendamentoResponse response = agendamentoService.findById(id);
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<List<AgendamentoResponse>> listarTodos() {
        return ResponseEntity.ok(agendamentoService.findAll());
    }

    @GetMapping("/dentista/{dentistaId}")
    public ResponseEntity<List<AgendamentoResponse>> porDentista(@PathVariable Long dentistaId) {
        return ResponseEntity.ok(agendamentoService.findByDentista(dentistaId));
    }

    @GetMapping("/paciente/{pacienteId}")
    public ResponseEntity<List<AgendamentoResponse>> porPaciente(@PathVariable Long pacienteId) {
        return ResponseEntity.ok(agendamentoService.findByPaciente(pacienteId));
    }

    @GetMapping("/data/{data}")
    public ResponseEntity<List<AgendamentoResponse>> porData(
            @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate data) {
        return ResponseEntity.ok(agendamentoService.findByData(data));
    }

    @GetMapping("/dentista/{dentistaId}/data/{data}")
    public ResponseEntity<List<AgendamentoResponse>> porDentistaEData(
            @PathVariable Long dentistaId,
            @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate data) {
        return ResponseEntity.ok(agendamentoService.findByDentistaAndData(dentistaId, data));
    }

    @GetMapping("/periodo")
    public ResponseEntity<List<AgendamentoResponse>> porPeriodo(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime inicio,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime fim) {
        return ResponseEntity.ok(agendamentoService.findByPeriodo(inicio, fim));
    }

    @GetMapping("/dentista/{dentistaId}/periodo")
    public ResponseEntity<List<AgendamentoResponse>> porDentistaEPeriodo(
            @PathVariable Long dentistaId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime inicio,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime fim) {
        return ResponseEntity.ok(agendamentoService.findByDentistaAndPeriodo(dentistaId, inicio, fim));
    }

    // ====================== CONSULTAS ESPECIAIS ======================
    @GetMapping("/hoje")
    public ResponseEntity<List<AgendamentoResponse>> hoje() {
        return ResponseEntity.ok(agendamentoService.findAgendamentosHoje());
    }

    @GetMapping("/proximos")
    public ResponseEntity<List<AgendamentoResponse>> proximos() {
        return ResponseEntity.ok(agendamentoService.findProximosAgendamentos());
    }

    @GetMapping("/dentista/{dentistaId}/hoje")
    public ResponseEntity<List<AgendamentoResponse>> hojeDoDentista(@PathVariable Long dentistaId) {
        return ResponseEntity.ok(agendamentoService.findAgendamentosDoDentistaHoje(dentistaId));
    }

    // ====================== HORÁRIOS DISPONÍVEIS ======================
    @GetMapping("/disponiveis/{dentistaId}/{data}")
    public ResponseEntity<List<LocalDateTime>> horariosDisponiveis(
            @PathVariable Long dentistaId,
            @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate data) {
        return ResponseEntity.ok(agendamentoService.consultarHorariosDisponiveis(dentistaId, data));
    }

    // ====================== UPDATE ======================
    @PutMapping("/{id}")
    public ResponseEntity<AgendamentoResponse> atualizar(
            @PathVariable Long id,
            @Valid @RequestBody AgendamentoRequest request) {
        AgendamentoResponse response = agendamentoService.update(id, request);
        return ResponseEntity.ok(response);
    }

    // ====================== STATUS ======================
    @PatchMapping("/{id}/confirmar")
    public ResponseEntity<AgendamentoResponse> confirmar(@PathVariable Long id) {
        return ResponseEntity.ok(agendamentoService.confirmar(id));
    }

    @PatchMapping("/{id}/cancelar")
    public ResponseEntity<AgendamentoResponse> cancelar(@PathVariable Long id) {
        return ResponseEntity.ok(agendamentoService.cancelar(id));
    }

    @PatchMapping("/{id}/em-atendimento")
    public ResponseEntity<AgendamentoResponse> emAtendimento(@PathVariable Long id) {
        return ResponseEntity.ok(agendamentoService.emAtendimento(id));
    }

    @PatchMapping("/{id}/finalizar")
    public ResponseEntity<AgendamentoResponse> finalizar(@PathVariable Long id) {
        return ResponseEntity.ok(agendamentoService.finalizar(id));
    }

    // ====================== DELETE ======================
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable Long id) {
        agendamentoService.delete(id);
        return ResponseEntity.noContent().build();
    }
}