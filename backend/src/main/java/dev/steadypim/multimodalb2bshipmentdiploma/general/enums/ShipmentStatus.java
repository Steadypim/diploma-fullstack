package dev.steadypim.multimodalb2bshipmentdiploma.general.enums;

import lombok.NoArgsConstructor;

@NoArgsConstructor
public enum ShipmentStatus {
    AWAITING("AWAITING"),
    IN_PROGRESS("IN_PROGRESS"),
    DONE("DONE");

    String status;

    ShipmentStatus(String status){this.status = status;}

    @Override
    public String toString() {
        return status;
    }
}
