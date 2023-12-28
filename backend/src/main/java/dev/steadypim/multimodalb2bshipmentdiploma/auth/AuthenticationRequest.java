package dev.steadypim.multimodalb2bshipmentdiploma.auth;

public record AuthenticationRequest(
        String email,
        String password
) {
}
