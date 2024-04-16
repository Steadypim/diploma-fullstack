package dev.steadypim.multimodalb2bshipmentdiploma.user.profile.api.dto;

import dev.steadypim.multimodalb2bshipmentdiploma.user.enums.UserType;

public record UserProfileDTO(
        String email,
        UserType userType,
        String firstName,
        String lastName,
        String patronymic,
        String phone,
        String companyName,
        String INN,
        String OGRN,
        String country,
        String region,
        String city,
        String street,
        String postalCode,
        String houseNumber
) {
}
