package dev.steadypim.multimodalb2bshipmentdiploma.action;

import java.util.UUID;

public record CreateShipmentArgument(
        UUID destinationWarehouse,
        UUID arrivalWarehouse
) {
}
