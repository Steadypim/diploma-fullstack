package dev.steadypim.multimodalb2bshipmentdiploma.transport.enums;

import lombok.NoArgsConstructor;

@NoArgsConstructor
public enum TransportType {
    CAR("CAR"),
    TRAIN("TRAIN"),
    PLANE("PLAIN"),
    SHIP("SHIP");

    String type;

    TransportType(String type) {this.type = type;}

    @Override
    public String toString() {
        return type;
    }

}
