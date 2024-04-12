package dev.steadypim.multimodalb2bshipmentdiploma.shipment.api.dto;

import dev.steadypim.multimodalb2bshipmentdiploma.general.enums.RequestStatus;

public record ShipmentStatusesDTO(
        RequestStatus requestStatus,
        RequestStatus storageStatus,
        RequestStatus transportationStatus
) {
}
