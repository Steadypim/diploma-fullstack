package dev.steadypim.multimodalb2bshipmentdiploma.user.profile.api.dtos;

import dev.steadypim.multimodalb2bshipmentdiploma.user.enums.UserType;

public record UserProfileDTO(
        String email,
        UserType userType,
        String firstName,
        String lastName,
        String patronymic,
        String phone
) {
}
