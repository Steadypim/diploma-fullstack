package dev.steadypim.multimodalb2bshipmentdiploma.shipment.repository;

import dev.steadypim.multimodalb2bshipmentdiploma.shipment.entity.Shipment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface ShipmentRepository extends JpaRepository<Shipment, UUID> {
}
