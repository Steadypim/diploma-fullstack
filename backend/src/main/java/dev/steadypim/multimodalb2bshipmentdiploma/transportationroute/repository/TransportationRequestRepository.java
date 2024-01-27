package dev.steadypim.multimodalb2bshipmentdiploma.transportationroute.repository;

import dev.steadypim.multimodalb2bshipmentdiploma.transportationroute.entity.TransportationRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface TransportationRequestRepository extends JpaRepository<TransportationRequest, UUID> {
    Optional<TransportationRequest> findByTransportationRouteIdAndShipmentId(UUID transportationRouteId, UUID shipmentId);

    List<TransportationRequest> findAllByTransportationRouteUserProfileEmail(String email);
}
