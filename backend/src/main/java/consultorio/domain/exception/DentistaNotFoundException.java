package consultorio.domain.exception;

public class DentistaNotFoundException extends RuntimeException {
    public DentistaNotFoundException(String message) {
        super(message);
    }

    public DentistaNotFoundException(Long id) {
        super("Dentista não encontrado com ID: " + id);
    }
}
