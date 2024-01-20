package dev.steadypim.multimodalb2bshipmentdiploma.transportationroute.entity;

import dev.steadypim.multimodalb2bshipmentdiploma.general.BaseEntity;
import dev.steadypim.multimodalb2bshipmentdiploma.transport.entity.Transport;
import dev.steadypim.multimodalb2bshipmentdiploma.user.profile.entity.UserProfile;
import dev.steadypim.multimodalb2bshipmentdiploma.warehouse.entity.Warehouse;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;

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
    @JoinColumn(name = "source_warehouse_id", nullable = false)
    Warehouse sourceWarehouse;

    @ManyToOne
    @JoinColumn(name = "destination_warehouse_id", nullable = false)
    Warehouse destinationWarehouse;

    @ManyToOne
    @JoinColumn(name = "transport_id")
    Transport transport;

    @Column(nullable = false)
    BigDecimal price;

    @Column(nullable = false)
    Double distance;

    @ManyToOne
    @JoinColumn(name = "user_profile_id")
    UserProfile userProfile;
}
