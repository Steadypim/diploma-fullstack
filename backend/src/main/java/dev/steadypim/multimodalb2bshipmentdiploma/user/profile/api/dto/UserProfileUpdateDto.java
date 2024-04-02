package dev.steadypim.multimodalb2bshipmentdiploma.user.profile.api.dto;


public record UserProfileUpdateDto(
        String email,
        String firstName,
        String lastName,
        String patronymic,
        String phone,
        String password
) {
}
