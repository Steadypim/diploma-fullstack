package dev.steadypim.multimodalb2bshipmentdiploma.transport.entity;

import dev.steadypim.multimodalb2bshipmentdiploma.general.BaseEntity;
import dev.steadypim.multimodalb2bshipmentdiploma.transport.enums.TransportType;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import static jakarta.persistence.EnumType.STRING;
import static lombok.AccessLevel.PRIVATE;

@Entity
@Table(name = "transport")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = PRIVATE)
public class Transport extends BaseEntity {
    @Enumerated(STRING)
    @Column(name = "transport_type")
    TransportType transportType;

    @Column(name = "lifting_capacity")
    Integer liftingCapacity;

    @Column(name = "holding_volume")
    Integer holdingVolume;

    @Column(name = "average_speed")
    Integer averageSpeed;

    @Column(name = "packaging_requirements")
    String packagingRequirements;
}
