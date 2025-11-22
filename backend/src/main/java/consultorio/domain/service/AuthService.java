//package consultorio.domain.service;
//
//
//import consultorio.api.dto.request.LoginRequest;
//import consultorio.api.dto.response.LoginResponse;
//import consultorio.config.security.JwtTokenService;
//import consultorio.domain.entity.Usuario;
//import consultorio.domain.repository.UsuarioRepository;
//;
//
//import lombok.RequiredArgsConstructor;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.stereotype.Service;
//
//@Service
//@RequiredArgsConstructor
//public class AuthService {
//
//    private final UsuarioRepository usuarioRepository;
//    private final JwtTokenService jwtTokenService;
//    private final PasswordEncoder passwordEncoder;
//
//    public LoginResponse login(LoginRequest request) {
//
//        Usuario usuario = usuarioRepository.findByEmail(request.getEmail())
//                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
//
//        if (!passwordEncoder.matches(request.getPassword(), usuario.getSenha())) {
//            throw new RuntimeException("Senha incorreta");
//        }
//
//        String token = jwtTokenService.gerarToken(usuario.getEmail());
//
//        return new LoginResponse(token, usuario.getNome());
//    }
//}
