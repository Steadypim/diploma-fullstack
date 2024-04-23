package dev.steadypim.multimodalb2bshipmentdiploma.user.enums;

import lombok.NoArgsConstructor;

@NoArgsConstructor
public enum UserType {
    LOGISTICIAN("LOGISTICIAN"),
    TRANSPORT_COMPANY_REP("TRANSPORT_COMPANY_REP"),
    WAREHOUSE_REP("WAREHOUSE_REP"),
    ADMIN("ADMIN");

    String type;

    UserType(String type) {
        this.type = type;
    }

    @Override
    public String toString() {
        return type;
    }
}
