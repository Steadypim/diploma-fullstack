package dev.steadypim.multimodalb2bshipmentdiploma.user.profile.api.dtos;

public record UserProfileRegistrationDTO(
        String type,
        String email,
        String password
) {
}
