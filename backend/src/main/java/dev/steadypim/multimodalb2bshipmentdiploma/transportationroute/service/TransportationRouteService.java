package dev.steadypim.multimodalb2bshipmentdiploma.transportationroute.service;

import dev.steadypim.multimodalb2bshipmentdiploma.general.distancecalculator.DistanceCalculator;
import dev.steadypim.multimodalb2bshipmentdiploma.transportationroute.entity.TransportationRoute;
import dev.steadypim.multimodalb2bshipmentdiploma.transportationroute.repository.TransportationRouteRepository;
import dev.steadypim.multimodalb2bshipmentdiploma.user.profile.entity.UserProfile;
import dev.steadypim.multimodalb2bshipmentdiploma.user.profile.repository.UserProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

import static dev.steadypim.multimodalb2bshipmentdiploma.enumerated.EntityStatus.ACTIVE;
import static dev.steadypim.multimodalb2bshipmentdiploma.enumerated.EntityStatus.DELETED;

@Service
@RequiredArgsConstructor
public class TransportationRouteService {

    private final TransportationRouteRepository repository;
    private final UserProfileRepository userProfileRepository;

    public TransportationRoute create(TransportationRoute route, String email) {

        Double sourceLatitude = route.getSourceWarehouse().getLatitude();
        Double sourceLongitude = route.getSourceWarehouse().getLongitude();
        Double destinationLatitude = route.getDestinationWarehouse().getLatitude();
        Double destinationLongitude = route.getDestinationWarehouse().getLongitude();

        double distance = DistanceCalculator.calculateDistance(sourceLatitude, sourceLongitude, destinationLatitude, destinationLongitude);

        route.setDistance(distance);

        UserProfile userProfile = userProfileRepository.findUserProfileByEmail(email)
                                                       .orElseThrow(() -> new RuntimeException("User profile not found while creating a route"));
        route.setUserProfile(userProfile);
        route.setStatus(ACTIVE);
        return repository.save(route);
    }

    public void update(TransportationRoute route, UUID uuid) {
        TransportationRoute routeToUpdate = repository.findById(uuid)
                                                      .orElseThrow(() -> new RuntimeException("Route not found"));

        routeToUpdate.setTransport(route.getTransport());
        routeToUpdate.setPrice(route.getPrice());
        routeToUpdate.setDestinationWarehouse(route.getDestinationWarehouse());
        routeToUpdate.setSourceWarehouse(route.getSourceWarehouse());

        repository.save(routeToUpdate);
    }

    public void delete(UUID uuid) {
        repository.deleteById(uuid);
    }

    public void deleteByStatus(UUID id) {
        TransportationRoute transportationRoute = repository.findById(id).orElseThrow(() -> new RuntimeException("Transportation route not found"));

        transportationRoute.setStatus(DELETED);

        repository.save(transportationRoute);
    }

    public TransportationRoute get(UUID uuid) {
        return repository.findById(uuid)
                         .orElseThrow(() -> new RuntimeException("Route not found"));
    }

    public List<TransportationRoute> getAllWithUserProfileEmail(String email) {
        return repository.findAllByUserProfileEmailAndStatus(email, ACTIVE);
    }

    public List<TransportationRoute> getAllTransportationRoutes() {
        return repository.findAllByStatus(ACTIVE);
    }
}
