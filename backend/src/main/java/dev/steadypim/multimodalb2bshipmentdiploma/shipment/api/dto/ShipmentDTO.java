package dev.steadypim.multimodalb2bshipmentdiploma.shipment.api.dto;

import dev.steadypim.multimodalb2bshipmentdiploma.general.enums.RequestStatus;
import dev.steadypim.multimodalb2bshipmentdiploma.transportationroute.api.dto.TransportationRouteForShipmentControllerDTO;
import dev.steadypim.multimodalb2bshipmentdiploma.warehouse.api.dto.WarehouseDTO;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

public record ShipmentDTO(
        UUID id,
        WarehouseDTO sourceWarehouse,
        WarehouseDTO destinationWarehouse,
        List<TransportationRouteForShipmentControllerDTO> optimalPath,
        BigDecimal fullPrice,
        RequestStatus requestStatus
) {
}
