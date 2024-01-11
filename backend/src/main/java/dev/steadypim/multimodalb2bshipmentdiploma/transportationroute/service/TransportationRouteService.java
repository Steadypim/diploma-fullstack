package dev.steadypim.multimodalb2bshipmentdiploma.transportationroute.service;

import dev.steadypim.multimodalb2bshipmentdiploma.transportationroute.entity.TransportationRoute;
import dev.steadypim.multimodalb2bshipmentdiploma.transportationroute.repository.TransportationRouteRepository;
import dev.steadypim.multimodalb2bshipmentdiploma.user.profile.entity.UserProfile;
import dev.steadypim.multimodalb2bshipmentdiploma.user.profile.repository.UserProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class TransportationRouteService {

    private final TransportationRouteRepository repository;
    private final UserProfileRepository userProfileRepository;

    public TransportationRoute create(TransportationRoute route, String email){
        UserProfile userProfile = userProfileRepository.findUserProfileByEmail(email)
                                                       .orElseThrow(() -> new RuntimeException("User profile not found while creating a route"));
        route.setUserProfile(userProfile);
        return repository.save(route);
    }

    public void update(TransportationRoute route, UUID uuid){
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

    public TransportationRoute get(UUID uuid) {
        return repository.findById(uuid)
                         .orElseThrow(() -> new RuntimeException("Route not found"));
    }

    public List<TransportationRoute> getAllWithUserProfileEmail(String email) {
        return repository.findAllByUserProfileEmail(email);
    }
}
