package dev.steadypim.multimodalb2bshipmentdiploma.transport.api.dto;

import dev.steadypim.multimodalb2bshipmentdiploma.transport.enums.TransportType;

import java.util.UUID;

public record TransportDTO(
        UUID id,
        TransportType transportType,
        Integer liftingCapacity,
        Integer holdingVolume,
        Integer averageSpeed,
        String packagingRequirements,
        UUID userProfileId
) {
}
