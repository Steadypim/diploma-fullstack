package dev.steadypim.multimodalb2bshipmentdiploma.auth;

public record AuthenticationRequest(
        String username,
        String password
) {
}
