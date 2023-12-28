package dev.steadypim.multimodalb2bshipmentdiploma.auth;

import dev.steadypim.multimodalb2bshipmentdiploma.jwt.JWTUtil;
import dev.steadypim.multimodalb2bshipmentdiploma.user.profile.api.dtos.UserProfileDTO;
import dev.steadypim.multimodalb2bshipmentdiploma.user.profile.api.mapper.UserProfileMapper;
import dev.steadypim.multimodalb2bshipmentdiploma.user.profile.entity.UserProfile;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final AuthenticationManager authenticationManager;
    private final UserProfileMapper mapper;
    private final JWTUtil jwtUtil;

    public AuthenticationResponse login(AuthenticationRequest request){
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.email(),
                        request.password()
                )
        );

        UserProfile principal = (UserProfile)authentication.getPrincipal();
        UserProfileDTO userProfileDTO = mapper.toDto(principal);
        String token = jwtUtil.issueToken(userProfileDTO.email(), userProfileDTO.userType().toString());
        return new AuthenticationResponse(userProfileDTO, token);
    }
}
