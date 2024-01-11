package dev.steadypim.multimodalb2bshipmentdiploma.auth;

import dev.steadypim.multimodalb2bshipmentdiploma.user.profile.api.dto.UserProfileDTO;

public record AuthenticationResponse(
        UserProfileDTO userProfileDTO,
        String token
) {
}
