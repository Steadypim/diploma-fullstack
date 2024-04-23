package dev.steadypim.multimodalb2bshipmentdiploma.user.enums;

import lombok.NoArgsConstructor;

@NoArgsConstructor
public enum UserStatus {
    ACTIVE("ACTIVE"),
    INACTIVE("INACTIVE");

    String status;

    UserStatus(String status){this.status = status;}

    @Override
    public String toString() {
        return status;
    }
}
