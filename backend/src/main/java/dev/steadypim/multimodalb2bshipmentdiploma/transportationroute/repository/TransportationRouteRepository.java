package dev.steadypim.multimodalb2bshipmentdiploma.transportationroute.repository;

import dev.steadypim.multimodalb2bshipmentdiploma.general.enums.EntityStatus;
import dev.steadypim.multimodalb2bshipmentdiploma.transportationroute.entity.TransportationRoute;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface TransportationRouteRepository extends JpaRepository<TransportationRoute, UUID> {
    List<TransportationRoute> findAllByUserProfileEmailAndStatus(String email, EntityStatus status);
    List<TransportationRoute> findAllByStatus(EntityStatus status);
}
