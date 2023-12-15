package dev.steadypim.multimodalb2bshipmentdiploma.shipments.shipment.entity;

import dev.steadypim.multimodalb2bshipmentdiploma.general.BaseEntity;
import dev.steadypim.multimodalb2bshipmentdiploma.transportationservice.entity.TransportationService;
import dev.steadypim.multimodalb2bshipmentdiploma.shipments.enums.ShipmentStatus;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.OffsetDateTime;

import static jakarta.persistence.EnumType.STRING;
import static jakarta.persistence.FetchType.EAGER;
import static lombok.AccessLevel.PRIVATE;

@Table(name = "shipment")
@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = PRIVATE)
public class Shipment extends BaseEntity {
    @OneToOne(fetch = EAGER)
    @JoinColumn(name = "transportation_service_id", referencedColumnName = "id", nullable = false, updatable = false, insertable = false)
    TransportationService transportationService;

    @Column(name = "departure_date")
    OffsetDateTime departureDate;

    @Column(name = "arrival_date")
    OffsetDateTime arrivalDate;

    @Enumerated(STRING)
    @Column(name = "status")
    ShipmentStatus status;
}
