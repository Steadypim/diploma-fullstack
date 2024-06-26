package dev.steadypim.multimodalb2bshipmentdiploma.transport.repository;

import dev.steadypim.multimodalb2bshipmentdiploma.general.enums.EntityStatus;
import dev.steadypim.multimodalb2bshipmentdiploma.transport.entity.Transport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface TransportRepository extends JpaRepository<Transport, UUID> {
    List<Transport> findAllByUserProfileEmailAndStatus(String email, EntityStatus status);
}
