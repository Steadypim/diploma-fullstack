package dev.steadypim.multimodalb2bshipmentdiploma.warehouse.repository;

import dev.steadypim.multimodalb2bshipmentdiploma.warehouse.entity.StorageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface StorageRequestRepository extends JpaRepository<StorageRequest, UUID> {
    Optional<StorageRequest> findByWarehouseIdAndShipmentId(UUID warehouseId, UUID shipmentId);

    List<StorageRequest> findAllByWarehouseUserProfileEmail(String email);
}
