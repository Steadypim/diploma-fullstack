package dev.steadypim.multimodalb2bshipmentdiploma.shipment.api.dto;

import dev.steadypim.multimodalb2bshipmentdiploma.transportationroute.api.dto.TransportationRouteForShipmentControllerDTO;
import dev.steadypim.multimodalb2bshipmentdiploma.warehouse.api.dto.WarehouseDTO;

import java.math.BigDecimal;
import java.util.List;

public record ShipmentDTO(
        WarehouseDTO sourceWarehouse,
        WarehouseDTO destinationWarehouse,
        List<TransportationRouteForShipmentControllerDTO> optimalPath,
        BigDecimal fullPrice
) {
}
