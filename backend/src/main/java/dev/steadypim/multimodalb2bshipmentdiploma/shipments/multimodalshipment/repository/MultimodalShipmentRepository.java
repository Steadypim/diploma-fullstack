package dev.steadypim.multimodalb2bshipmentdiploma.shipments.multimodalshipment.repository;

import dev.steadypim.multimodalb2bshipmentdiploma.shipments.multimodalshipment.entity.MultimodalShipment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface MultimodalShipmentRepository extends JpaRepository<MultimodalShipment, UUID> {
}
