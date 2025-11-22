package consultorio.api.controller;

import consultorio.api.dto.request.EvolucaoTratamentoRequest;
import consultorio.api.dto.response.EvolucaoTratamentoResponse;
import consultorio.domain.service.EvolucaoTratamentoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/evolucao-tratamento")
@RequiredArgsConstructor
public class EvolucaoTratamentoController {

    private final EvolucaoTratamentoService service;

    @PostMapping
    public ResponseEntity<EvolucaoTratamentoResponse> criar(@RequestBody EvolucaoTratamentoRequest dto) {
        return ResponseEntity.ok(service.criar(dto));
    }

    @GetMapping("/{id}")
    public ResponseEntity<EvolucaoTratamentoResponse> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(service.buscarPorId(id));
    }

    @GetMapping
    public ResponseEntity<List<EvolucaoTratamentoResponse>> listarTodos() {
        return ResponseEntity.ok(service.listarTodos());
    }

    @PutMapping("/{id}")
    public ResponseEntity<EvolucaoTratamentoResponse> atualizar(@PathVariable Long id,
                                                                   @RequestBody EvolucaoTratamentoRequest dto) {
        return ResponseEntity.ok(service.atualizar(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        service.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
