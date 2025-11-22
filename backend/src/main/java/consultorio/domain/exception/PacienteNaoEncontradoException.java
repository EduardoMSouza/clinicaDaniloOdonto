package consultorio.domain.exception;

public class PacienteNaoEncontradoException extends RuntimeException {
    public PacienteNaoEncontradoException(Long id) {
        super(String.format("Paciente com ID %d não encontrado", id));
    }

    public PacienteNaoEncontradoException(String prontuario) {
        super(String.format("Paciente com prontuário %s não encontrado", prontuario));
    }
}
