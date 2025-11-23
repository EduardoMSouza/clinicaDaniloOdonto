package consultorio.domain.service;

import consultorio.api.dto.mapper.DentistaMapper;
import consultorio.api.dto.request.DentistaRequest;
import consultorio.api.dto.response.DentistaResponse;
import consultorio.domain.entity.Dentista;
import consultorio.domain.repository.DentistaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DentistaService {

    private final DentistaRepository dentistaRepository;
    private final DentistaMapper dentistaMapper;

    @Transactional
    public DentistaResponse create(DentistaRequest request) {
        // Verifica se CRO já existe
        if (request.getCro() != null && !request.getCro().isBlank() &&
                dentistaRepository.existsByCro(request.getCro())) {
            throw new RuntimeException("Já existe um dentista cadastrado com este CRO: " + request.getCro());
        }

        // Verifica se email já existe (se informado)
        if (request.getEmail() != null && !request.getEmail().isBlank() &&
                dentistaRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Já existe um dentista cadastrado com este email: " + request.getEmail());
        }

        Dentista dentista = dentistaMapper.toEntity(request);
        Dentista savedDentista = dentistaRepository.save(dentista);
        return dentistaMapper.toEntityResponse(savedDentista);
    }

    @Transactional(readOnly = true)
    public List<DentistaResponse> findAll() {
        List<Dentista> dentistas = dentistaRepository.findAll();
        return dentistaMapper.toEntityResponseList(dentistas);
    }

    @Transactional(readOnly = true)
    public DentistaResponse findById(Long id) {
        Dentista dentista = dentistaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Dentista não encontrado com id: " + id));
        return dentistaMapper.toEntityResponse(dentista);
    }

    @Transactional(readOnly = true)
    public DentistaResponse findByCro(String cro) {
        Dentista dentista = dentistaRepository.findByCro(cro)
                .orElseThrow(() -> new RuntimeException("Dentista não encontrado com CRO: " + cro));
        return dentistaMapper.toEntityResponse(dentista);
    }

    @Transactional(readOnly = true)
    public DentistaResponse findByEmail(String email) {
        Dentista dentista = dentistaRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Dentista não encontrado com email: " + email));
        return dentistaMapper.toEntityResponse(dentista);
    }

    @Transactional
    public DentistaResponse update(Long id, DentistaRequest request) {
        Dentista existingDentista = dentistaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Dentista não encontrado com id: " + id));

        // Verifica se o CRO já existe em outro dentista (se informado)
        if (request.getCro() != null && !request.getCro().isBlank() &&
                !request.getCro().equals(existingDentista.getCro())) {
            if (dentistaRepository.existsByCroAndIdNot(request.getCro(), id)) {
                throw new RuntimeException("Já existe outro dentista cadastrado com este CRO: " + request.getCro());
            }
        }

        // Verifica se o email já existe em outro dentista (se informado)
        if (request.getEmail() != null && !request.getEmail().isBlank() &&
                !request.getEmail().equals(existingDentista.getEmail())) {
            if (dentistaRepository.existsByEmailAndIdNot(request.getEmail(), id)) {
                throw new RuntimeException("Já existe outro dentista cadastrado com este email: " + request.getEmail());
            }
        }

        dentistaMapper.updateFromRequest(request, existingDentista);
        Dentista updatedDentista = dentistaRepository.save(existingDentista);
        return dentistaMapper.toEntityResponse(updatedDentista);
    }

    @Transactional
    public void delete(Long id) {
        if (!dentistaRepository.existsById(id)) {
            throw new RuntimeException("Dentista não encontrado com id: " + id);
        }
        dentistaRepository.deleteById(id);
    }

    @Transactional
    public DentistaResponse activate(Long id) {
        Dentista dentista = dentistaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Dentista não encontrado com id: " + id));

        dentista.setAtivo(true);
        Dentista updatedDentista = dentistaRepository.save(dentista);
        return dentistaMapper.toEntityResponse(updatedDentista);
    }

    @Transactional
    public DentistaResponse inactivate(Long id) {
        Dentista dentista = dentistaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Dentista não encontrado com id: " + id));

        dentista.setAtivo(false);
        Dentista updatedDentista = dentistaRepository.save(dentista);
        return dentistaMapper.toEntityResponse(updatedDentista);
    }

    @Transactional(readOnly = true)
    public List<DentistaResponse> findByStatus(Boolean ativo) {
        List<Dentista> dentistas = ativo ?
                dentistaRepository.findByAtivoTrue() :
                dentistaRepository.findByAtivoFalse();
        return dentistaMapper.toEntityResponseList(dentistas);
    }

    @Transactional(readOnly = true)
    public List<DentistaResponse> findByEspecialidade(String especialidade) {
        List<Dentista> dentistas = dentistaRepository.findByEspecialidadeContainingIgnoreCase(especialidade);
        return dentistaMapper.toEntityResponseList(dentistas);
    }

    @Transactional(readOnly = true)
    public List<DentistaResponse> findByNomeContaining(String nome) {
        List<Dentista> dentistas = dentistaRepository.findByNomeContainingIgnoreCaseAndAtivo(nome);
        return dentistaMapper.toEntityResponseList(dentistas);
    }

    @Transactional(readOnly = true)
    public boolean existsByCro(String cro) {
        return dentistaRepository.existsByCro(cro);
    }

    @Transactional(readOnly = true)
    public boolean existsByEmail(String email) {
        return dentistaRepository.existsByEmail(email);
    }
}