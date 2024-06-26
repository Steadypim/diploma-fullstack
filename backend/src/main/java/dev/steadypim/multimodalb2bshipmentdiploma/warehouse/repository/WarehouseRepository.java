package dev.steadypim.multimodalb2bshipmentdiploma.warehouse.repository;

import dev.steadypim.multimodalb2bshipmentdiploma.general.enums.EntityStatus;
import dev.steadypim.multimodalb2bshipmentdiploma.warehouse.entity.Warehouse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface WarehouseRepository extends JpaRepository<Warehouse, UUID> {
    List<Warehouse> findAllByUserProfileEmailAndStatus(String email, EntityStatus status);
    List<Warehouse> findAllByStatus(EntityStatus status);
}
