package dev.steadypim.multimodalb2bshipmentdiploma.transportationroute.repository;

import dev.steadypim.multimodalb2bshipmentdiploma.transportationroute.entity.TransportationRoute;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface TransportationRouteRepository extends JpaRepository<TransportationRoute, UUID> {
}
