package consultorio.domain.exception;

public class EntidadeNaoEncontradaException extends RuntimeException {
    public EntidadeNaoEncontradaException(String mensagem) {
        super(mensagem);
    }

    public EntidadeNaoEncontradaException(String entidade, Long id) {
        super(entidade + " não encontrado(a) com ID: " + id);
    }
}
