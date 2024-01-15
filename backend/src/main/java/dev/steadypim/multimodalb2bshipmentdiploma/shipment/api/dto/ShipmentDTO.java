package dev.steadypim.multimodalb2bshipmentdiploma.shipment.api.dto;

import dev.steadypim.multimodalb2bshipmentdiploma.transportationroute.entity.TransportationRoute;
import dev.steadypim.multimodalb2bshipmentdiploma.warehouse.entity.Warehouse;

import java.math.BigDecimal;
import java.util.List;

public record ShipmentDTO(
        Warehouse destinationWarehouse,
        Warehouse arrivalWarehouse,
        List<TransportationRoute> optimalPath,
        BigDecimal fullPrice
) {
}
