package dev.steadypim.multimodalb2bshipmentdiploma.shipment.entity;

import dev.steadypim.multimodalb2bshipmentdiploma.general.BaseEntity;
import dev.steadypim.multimodalb2bshipmentdiploma.transportationroute.entity.TransportationRoute;
import dev.steadypim.multimodalb2bshipmentdiploma.user.profile.entity.UserProfile;
import dev.steadypim.multimodalb2bshipmentdiploma.warehouse.entity.Warehouse;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.util.List;

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
    @ManyToOne
    @JoinColumn(name = "source_warehouse_id")
    Warehouse sourceWarehouse;

    @ManyToOne
    @JoinColumn(name = "destination_warehouse_id")
    Warehouse destinationWarehouse;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "shipment_id")
    List<TransportationRoute> optimalPath;

    @Column(name = "optimality_metric")
    String optimalityMetric;

    @Column(name = "full_price")
    BigDecimal fullPrice;

    @ManyToOne
    @JoinColumn(name = "user_profile_id")
    UserProfile userProfile;

    public Shipment(Warehouse sourceWarehouse, Warehouse destinationWarehouse, List<TransportationRoute> optimalPath, BigDecimal fullPrice) {
        this.sourceWarehouse = sourceWarehouse;
        this.destinationWarehouse = destinationWarehouse;
        this.optimalPath = optimalPath;
        this.fullPrice = fullPrice;
    }
}
