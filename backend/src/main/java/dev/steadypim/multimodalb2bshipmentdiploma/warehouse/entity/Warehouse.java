package dev.steadypim.multimodalb2bshipmentdiploma.warehouse.entity;

import dev.steadypim.multimodalb2bshipmentdiploma.address.entity.Address;
import dev.steadypim.multimodalb2bshipmentdiploma.general.BaseEntity;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import static lombok.AccessLevel.PRIVATE;

@Table(name = "warehouse")
@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = PRIVATE)
public class Warehouse extends BaseEntity {
    @ManyToOne
    @JoinColumn(name = "arrival_place_id", referencedColumnName = "id", nullable = false)
    Address address;

    @Column(nullable = false)
    Double latitude;

    @Column(nullable = false)
    Double longitude;
}
