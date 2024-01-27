package dev.steadypim.multimodalb2bshipmentdiploma.warehouse.api.dto;

import dev.steadypim.multimodalb2bshipmentdiploma.address.entity.Address;
import dev.steadypim.multimodalb2bshipmentdiploma.general.enums.RequestStatus;

import java.util.UUID;

public record StorageRequestDTO(
        Address address,
        UUID warehouseId,
        RequestStatus requestStatus
) {
}
