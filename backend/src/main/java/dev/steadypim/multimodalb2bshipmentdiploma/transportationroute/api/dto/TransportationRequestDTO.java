package dev.steadypim.multimodalb2bshipmentdiploma.transportationroute.api.dto;

import dev.steadypim.multimodalb2bshipmentdiploma.general.enums.RequestStatus;
import dev.steadypim.multimodalb2bshipmentdiploma.general.enums.ShipmentStatus;
import dev.steadypim.multimodalb2bshipmentdiploma.transport.api.dto.TransportDTO;
import dev.steadypim.multimodalb2bshipmentdiploma.warehouse.api.dto.WarehouseDTO;

import java.math.BigDecimal;
import java.util.UUID;

public record TransportationRequestDTO(
        UUID id,
        WarehouseDTO sourceWarehouse,
        WarehouseDTO destinationWarehouse,
        TransportDTO transport,
        BigDecimal price,
        UUID userProfileId,
        RequestStatus requestStatus,
        UUID shipmentId,
        ShipmentStatus shipmentStatus,
        UUID transportationRouteId
) {
}
