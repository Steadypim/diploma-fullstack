package dev.steadypim.multimodalb2bshipmentdiploma.warehouse.api.dto;

import dev.steadypim.multimodalb2bshipmentdiploma.address.entity.Address;

import java.util.UUID;

public record StorageUpdateStatusDTO(
        Address address,
        UUID warehouseId,
        String requestStatus
) {
}
