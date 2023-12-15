package dev.steadypim.multimodalb2bshipmentdiploma.transportationroute.entity;

import dev.steadypim.multimodalb2bshipmentdiploma.general.BaseEntity;
import dev.steadypim.multimodalb2bshipmentdiploma.transport.enums.TransportType;
import dev.steadypim.multimodalb2bshipmentdiploma.warehouse.entity.Warehouse;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;

import static jakarta.persistence.EnumType.STRING;
import static lombok.AccessLevel.PRIVATE;

@Table(name = "transportation_route")
@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = PRIVATE)
public class TransportationRoute extends BaseEntity {
    @ManyToOne
    @JoinColumn(name = "source_warehouse_id")
    Warehouse sourceWarehouse;

    @ManyToOne
    @JoinColumn(name = "destination_warehouse_id")
    Warehouse destinationWarehouse;

    @Enumerated(STRING)
    @Column(nullable = false)
    TransportType transportType;

    @Column(nullable = false)
    BigDecimal pricePerKilometer;
}
