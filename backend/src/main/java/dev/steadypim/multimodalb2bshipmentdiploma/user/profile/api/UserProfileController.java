package dev.steadypim.multimodalb2bshipmentdiploma.user.profile.api;

import dev.steadypim.multimodalb2bshipmentdiploma.jwt.JWTUtil;
import dev.steadypim.multimodalb2bshipmentdiploma.user.profile.api.dto.UserProfileDTO;
import dev.steadypim.multimodalb2bshipmentdiploma.user.profile.api.dto.UserProfileRegistrationDTO;
import dev.steadypim.multimodalb2bshipmentdiploma.user.profile.api.mapper.UserProfileMapper;
import dev.steadypim.multimodalb2bshipmentdiploma.user.profile.service.UserProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;

@RestController()
@RequestMapping("user")
@RequiredArgsConstructor
public class UserProfileController {

    private final UserProfileService service;
    private final UserProfileMapper mapper;
    private final JWTUtil jwtUtil;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(
            @RequestBody UserProfileRegistrationDTO dto) {
        service.register(mapper.toEntity(dto));

        String jwtToken = jwtUtil.issueToken(dto.email(), dto.type());

        return ResponseEntity.ok()
                             .header(AUTHORIZATION, jwtToken)
                             .build();
    }

    @GetMapping("/")
    public List<UserProfileDTO> getAllUsers() {
        return mapper.toDtoList(service.getAll());
    }

}
