package consultorio.api.controller;

import consultorio.api.dto.request.DentistaRequest;
import consultorio.api.dto.request.HorarioTrabalhoRequest;
import consultorio.api.dto.response.DentistaResponse;
import consultorio.domain.service.DentistaService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/dentistas")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class DentistaController {

    private final DentistaService dentistaService;

    // ====================== CRUD BÁSICO ======================
    @PostMapping
    public ResponseEntity<DentistaResponse> criar(@Valid @RequestBody DentistaRequest request) {
        return ResponseEntity.status(201).body(dentistaService.create(request));
    }

    @GetMapping
    public ResponseEntity<List<DentistaResponse>> listarTodos() {
        return ResponseEntity.ok(dentistaService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<DentistaResponse> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(dentistaService.findById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<DentistaResponse> atualizar(
            @PathVariable Long id,
            @Valid @RequestBody DentistaRequest request) {
        return ResponseEntity.ok(dentistaService.update(id, request));
    }

    @PatchMapping("/{id}/ativar")
    public ResponseEntity<DentistaResponse> ativar(@PathVariable Long id) {
        return ResponseEntity.ok(dentistaService.activate(id));
    }

    @PatchMapping("/{id}/inativar")
    public ResponseEntity<DentistaResponse> inativar(@PathVariable Long id) {
        return ResponseEntity.ok(dentistaService.inactivate(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable Long id) {
        dentistaService.delete(id);
        return ResponseEntity.noContent().build();
    }

    // ====================== BUSCAS AVANÇADAS ======================
    @GetMapping("/ativos")
    public ResponseEntity<List<DentistaResponse>> ativos() {
        return ResponseEntity.ok(dentistaService.findByStatus(true));
    }

    @GetMapping("/inativos")
    public ResponseEntity<List<DentistaResponse>> inativos() {
        return ResponseEntity.ok(dentistaService.findByStatus(false));
    }

    @GetMapping("/especialidade/{especialidade}")
    public ResponseEntity<List<DentistaResponse>> porEspecialidade(@PathVariable String especialidade) {
        return ResponseEntity.ok(dentistaService.findByEspecialidade(especialidade));
    }

    @GetMapping("/buscar")
    public ResponseEntity<List<DentistaResponse>> buscarPorNome(@RequestParam String nome) {
        return ResponseEntity.ok(dentistaService.findByNomeContaining(nome));
    }

    // ====================== HORÁRIOS DO DENTISTA ======================
    @PostMapping("/{id}/horarios/padrao")
    public ResponseEntity<Void> configurarHorariosPadrao(@PathVariable Long id) {
        dentistaService.configurarHorarioPadrao(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}/horarios/{dia}")
    public ResponseEntity<Void> atualizarHorarioDoDia(
            @PathVariable Long id,
            @PathVariable DayOfWeek dia,
            @Valid @RequestBody HorarioTrabalhoRequest request) {

        dentistaService.atualizarHorarioDia(
                id,
                dia,
                request.getHoraInicioManha(),
                request.getHoraFimManha(),
                request.getHoraInicioTarde(),
                request.getHoraFimTarde()
        );
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{id}/horarios-disponiveis")
    public ResponseEntity<List<LocalDateTime>> horariosDisponiveis(
            @PathVariable Long id,
            @RequestParam("data") LocalDate data) {

        return ResponseEntity.ok(dentistaService.consultarHorariosDisponiveis(id, data));
    }

    // ====================== VALIDAÇÃO RÁPIDA ======================
    @GetMapping("/existe/cro/{cro}")
    public ResponseEntity<Boolean> existeCro(@PathVariable String cro) {
        return ResponseEntity.ok(dentistaService.existsByCro(cro));
    }

    @GetMapping("/existe/email/{email}")
    public ResponseEntity<Boolean> existeEmail(@PathVariable String email) {
        return ResponseEntity.ok(dentistaService.existsByEmail(email));
    }
}