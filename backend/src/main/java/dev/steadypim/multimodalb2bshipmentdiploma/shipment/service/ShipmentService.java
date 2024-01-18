package dev.steadypim.multimodalb2bshipmentdiploma.shipment.service;

import dev.steadypim.multimodalb2bshipmentdiploma.shipment.entity.Shipment;
import dev.steadypim.multimodalb2bshipmentdiploma.shipment.repository.ShipmentRepository;
import dev.steadypim.multimodalb2bshipmentdiploma.user.profile.entity.UserProfile;
import dev.steadypim.multimodalb2bshipmentdiploma.user.profile.service.UserProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ShipmentService {

    private final ShipmentRepository repository;
    private final UserProfileService service;

    public Shipment create(Shipment shipment, String email) {
        UserProfile userProfile = service.findUserProfileByEmail(email)
                                         .orElseThrow(() -> new RuntimeException("User not found while creating shipment"));

        shipment.setUserProfile(userProfile);

        return repository.save(shipment);
    }

    public void delete(UUID uuid){
        repository.deleteById(uuid);
    }

    public Shipment get(UUID uuid){
        return repository.findById(uuid)
                .orElseThrow(() -> new RuntimeException("Shipment not found"));
    }

    public List<Shipment> getAllUserShipments(String email){
        return repository.findAllByUserProfileEmail(email);
    }
}
