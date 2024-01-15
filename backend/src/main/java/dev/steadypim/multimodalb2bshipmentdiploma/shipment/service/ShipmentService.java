package dev.steadypim.multimodalb2bshipmentdiploma.shipment.service;

import dev.steadypim.multimodalb2bshipmentdiploma.shipment.entity.Shipment;
import dev.steadypim.multimodalb2bshipmentdiploma.shipment.repository.ShipmentRepository;
import dev.steadypim.multimodalb2bshipmentdiploma.user.profile.entity.UserProfile;
import dev.steadypim.multimodalb2bshipmentdiploma.user.profile.service.UserProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

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
}
