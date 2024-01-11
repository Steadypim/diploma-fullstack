package dev.steadypim.multimodalb2bshipmentdiploma.transportationroute.api.dto;

import java.math.BigDecimal;
import java.util.UUID;

public record TransportationRouteDTO(
        UUID id,
        UUID sourceWarehouseId,
        UUID destinationWarehouseId,
        UUID transportId,
        BigDecimal price,
        UUID userProfileId
) {
}
