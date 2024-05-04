package dev.steadypim.multimodalb2bshipmentdiploma.general.enums;

import lombok.NoArgsConstructor;

@NoArgsConstructor
public enum EntityStatus {
    ACTIVE("ACTIVE"),
    DELETED("DELETED");

    String status;

    EntityStatus(String status){this.status = status;}

    @Override
    public String toString() {
        return status;
    }
}
