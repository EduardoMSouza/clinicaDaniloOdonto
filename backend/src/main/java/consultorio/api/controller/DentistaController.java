package consultorio.api.controller;

import consultorio.api.dto.request.DentistaRequest;
import consultorio.api.dto.response.DentistaResponse;
import consultorio.domain.service.DentistaService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/dentistas")
@RequiredArgsConstructor
public class DentistaController {

    private final DentistaService dentistaService;

    @PostMapping
    public ResponseEntity<DentistaResponse> create(@Valid @RequestBody DentistaRequest request) {
        DentistaResponse response = dentistaService.create(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping
    public ResponseEntity<List<DentistaResponse>> findAll() {
        List<DentistaResponse> responses = dentistaService.findAll();
        return ResponseEntity.ok(responses);
    }

    @GetMapping("/{id}")
    public ResponseEntity<DentistaResponse> findById(@PathVariable Long id) {
        DentistaResponse response = dentistaService.findById(id);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/cro/{cro}")
    public ResponseEntity<DentistaResponse> findByCro(@PathVariable String cro) {
        DentistaResponse response = dentistaService.findByCro(cro);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<DentistaResponse> findByEmail(@PathVariable String email) {
        DentistaResponse response = dentistaService.findByEmail(email);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<DentistaResponse> update(
            @PathVariable Long id,
            @Valid @RequestBody DentistaRequest request) {
        DentistaResponse response = dentistaService.update(id, request);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        dentistaService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}/activate")
    public ResponseEntity<DentistaResponse> activate(@PathVariable Long id) {
        DentistaResponse response = dentistaService.activate(id);
        return ResponseEntity.ok(response);
    }

    @PatchMapping("/{id}/inactivate")
    public ResponseEntity<DentistaResponse> inactivate(@PathVariable Long id) {
        DentistaResponse response = dentistaService.inactivate(id);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/status/{ativo}")
    public ResponseEntity<List<DentistaResponse>> findByStatus(@PathVariable Boolean ativo) {
        List<DentistaResponse> responses = dentistaService.findByStatus(ativo);
        return ResponseEntity.ok(responses);
    }

    @GetMapping("/especialidade/{especialidade}")
    public ResponseEntity<List<DentistaResponse>> findByEspecialidade(@PathVariable String especialidade) {
        List<DentistaResponse> responses = dentistaService.findByEspecialidade(especialidade);
        return ResponseEntity.ok(responses);
    }

    @GetMapping("/search")
    public ResponseEntity<List<DentistaResponse>> findByNomeContaining(@RequestParam String nome) {
        List<DentistaResponse> responses = dentistaService.findByNomeContaining(nome);
        return ResponseEntity.ok(responses);
    }

    @GetMapping("/exists/cro/{cro}")
    public ResponseEntity<Boolean> existsByCro(@PathVariable String cro) {
        boolean exists = dentistaService.existsByCro(cro);
        return ResponseEntity.ok(exists);
    }

    @GetMapping("/exists/email/{email}")
    public ResponseEntity<Boolean> existsByEmail(@PathVariable String email) {
        boolean exists = dentistaService.existsByEmail(email);
        return ResponseEntity.ok(exists);
    }
}