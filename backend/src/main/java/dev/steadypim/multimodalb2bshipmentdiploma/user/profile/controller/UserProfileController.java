package dev.steadypim.multimodalb2bshipmentdiploma.user.profile.controller;

import dev.steadypim.multimodalb2bshipmentdiploma.jwt.JWTUtil;
import dev.steadypim.multimodalb2bshipmentdiploma.user.profile.dtos.UserProfileRegistrationDTO;
import dev.steadypim.multimodalb2bshipmentdiploma.user.profile.mapper.UserProfileMapper;
import dev.steadypim.multimodalb2bshipmentdiploma.user.profile.service.UserProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

}
