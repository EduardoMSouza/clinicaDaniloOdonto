package consultorio.api.controller;

import consultorio.api.dto.request.EvolucaoTratamentoRequest;
import consultorio.api.dto.request.PacienteRequest;
import consultorio.api.dto.request.PlanoDentalRequest;

import consultorio.api.dto.response.EvolucaoTratamentoResponse;
import consultorio.api.dto.response.PacienteResponse;

import consultorio.api.dto.response.PlanoDentalResponse;
import consultorio.domain.repository.projection.PacienteResumoProjection;

import consultorio.domain.service.PacienteService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pacientes")
@RequiredArgsConstructor
public class PacienteController {

    private final PacienteService pacienteService;

    @PostMapping
    public ResponseEntity<PacienteResponse> create(@Valid @RequestBody PacienteRequest request) {
        PacienteResponse response = pacienteService.create(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping
    public ResponseEntity<List<PacienteResponse>> findAll() {
        List<PacienteResponse> responses = pacienteService.findAll();
        return ResponseEntity.ok(responses);
    }

    @GetMapping("/resumo")
    public ResponseEntity<List<PacienteResumoProjection>> findAllResumo() {
        List<PacienteResumoProjection> responses = pacienteService.findAllResumo();
        return ResponseEntity.ok(responses);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PacienteResponse> findById(@PathVariable Long id) {
        PacienteResponse response = pacienteService.findById(id);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/prontuario/{prontuario}")
    public ResponseEntity<PacienteResponse> findByProntuario(@PathVariable String prontuario) {
        PacienteResponse response = pacienteService.findByProntuario(prontuario);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/cpf/{cpf}")
    public ResponseEntity<PacienteResponse> findByCpf(@PathVariable String cpf) {
        PacienteResponse response = pacienteService.findByCpf(cpf);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PacienteResponse> update(
            @PathVariable Long id,
            @Valid @RequestBody PacienteRequest request) {
        PacienteResponse response = pacienteService.update(id, request);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        pacienteService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}/inactivate")
    public ResponseEntity<PacienteResponse> inactivate(@PathVariable Long id) {
        PacienteResponse response = pacienteService.inactivate(id);
        return ResponseEntity.ok(response);
    }

    @PatchMapping("/{id}/activate")
    public ResponseEntity<PacienteResponse> activate(@PathVariable Long id) {
        PacienteResponse response = pacienteService.activate(id);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<PacienteResponse>> findByStatus(@PathVariable Boolean status) {
        List<PacienteResponse> responses = pacienteService.findByStatus(status);
        return ResponseEntity.ok(responses);
    }

    @GetMapping("/search")
    public ResponseEntity<List<PacienteResponse>> findByNomeContaining(
            @RequestParam String nome) {
        List<PacienteResponse> responses = pacienteService.findByNomeContaining(nome);
        return ResponseEntity.ok(responses);
    }

    @GetMapping("/exists/cpf/{cpf}")
    public ResponseEntity<Boolean> existsByCpf(@PathVariable String cpf) {
        boolean exists = pacienteService.existsByCpf(cpf);
        return ResponseEntity.ok(exists);
    }

    @GetMapping("/exists/rg/{rg}")
    public ResponseEntity<Boolean> existsByRg(@PathVariable String rg) {
        boolean exists = pacienteService.existsByRg(rg);
        return ResponseEntity.ok(exists);
    }
}