package dev.steadypim.multimodalb2bshipmentdiploma.user.profile.dtos;

public record UserProfileRegistrationDTO(
        String type,
        String email,
        String password
) {
}
