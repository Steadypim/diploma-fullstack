package dev.steadypim.multimodalb2bshipmentdiploma.user.profile.api.dto;

public record UserProfileRegistrationDTO(
        String type,
        String email,
        String password
) {
}
