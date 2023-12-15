package dev.steadypim.multimodalb2bshipmentdiploma.transport.repository;

import dev.steadypim.multimodalb2bshipmentdiploma.transport.entity.Transport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface TransportRepository extends JpaRepository<Transport, UUID> {
}
