package dev.steadypim.multimodalb2bshipmentdiploma.action.shipment;

import java.util.UUID;

public record CreateShipmentArgument(
        UUID sourceWarehouse,
        UUID destinationWarehouse,
        double weight,
        String name,
        String description
) {
}
