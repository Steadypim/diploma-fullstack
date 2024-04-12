package dev.steadypim.multimodalb2bshipmentdiploma.warehouse.api.dto;

import dev.steadypim.multimodalb2bshipmentdiploma.address.entity.Address;
import dev.steadypim.multimodalb2bshipmentdiploma.general.enums.RequestStatus;

import java.util.UUID;

public record StorageRequestDTO(
        UUID id,
        Address address,
        UUID warehouseId,
        RequestStatus requestStatus,
        UUID shipmentId
) {
}
