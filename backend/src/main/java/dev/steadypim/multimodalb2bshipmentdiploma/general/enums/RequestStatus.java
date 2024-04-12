package dev.steadypim.multimodalb2bshipmentdiploma.general.enums;

import lombok.NoArgsConstructor;

@NoArgsConstructor
public enum RequestStatus {
    PENDING("PENDING"),
    APPROVED("APPROVED"),
    REJECTED("REJECTED"),
    PAID("PAID");

    String status;

    RequestStatus(String type) {
        this.status = type;
    }

    @Override
    public String toString() {
        return status;
    }
}
