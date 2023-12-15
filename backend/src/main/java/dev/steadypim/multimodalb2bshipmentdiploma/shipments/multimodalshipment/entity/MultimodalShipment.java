package dev.steadypim.multimodalb2bshipmentdiploma.shipments.multimodalshipment.entity;

import dev.steadypim.multimodalb2bshipmentdiploma.general.BaseEntity;
import dev.steadypim.multimodalb2bshipmentdiploma.shipments.enums.ShipmentStatus;
import dev.steadypim.multimodalb2bshipmentdiploma.shipments.shipment.entity.Shipment;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

import static jakarta.persistence.CascadeType.ALL;
import static jakarta.persistence.EnumType.STRING;
import static jakarta.persistence.FetchType.EAGER;
import static lombok.AccessLevel.PRIVATE;

@Table(name = "multimodal_shipment")
@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = PRIVATE)
public class MultimodalShipment extends BaseEntity {
    @OneToMany(fetch = EAGER, cascade = ALL, orphanRemoval = true)
    @JoinColumn(name = "multimodal_shipment_id")
    List<Shipment> shipments;

    @Enumerated(STRING)
    @Column(name = "status")
    ShipmentStatus status;
}
