package dev.steadypim.multimodalb2bshipmentdiploma.shipment.service;

import dev.steadypim.multimodalb2bshipmentdiploma.shipment.entity.Shipment;
import dev.steadypim.multimodalb2bshipmentdiploma.shipment.repository.ShipmentRepository;
import dev.steadypim.multimodalb2bshipmentdiploma.transportationroute.service.TransportationRequestService;
import dev.steadypim.multimodalb2bshipmentdiploma.user.profile.entity.UserProfile;
import dev.steadypim.multimodalb2bshipmentdiploma.user.profile.service.UserProfileService;
import dev.steadypim.multimodalb2bshipmentdiploma.warehouse.entity.Warehouse;
import dev.steadypim.multimodalb2bshipmentdiploma.warehouse.service.StorageRequestService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

import static dev.steadypim.multimodalb2bshipmentdiploma.general.enums.RequestStatus.PENDING;

@Service
@RequiredArgsConstructor
public class ShipmentService {

    private final ShipmentRepository repository;
    private final UserProfileService service;
    private final StorageRequestService storageRequestService;
    private final TransportationRequestService transportationRequestService;

    public Shipment create(Shipment shipment, String email) {
        UserProfile userProfile = service.findUserProfileByEmail(email)
                                         .orElseThrow(() -> new RuntimeException("User not found while creating shipment"));

        shipment.setUserProfile(userProfile);
        shipment.setRequestStatus(PENDING);

        Shipment shipmentForSave = repository.save(shipment);

        shipmentForSave.getOptimalPath().forEach(route -> {
            Warehouse sourceWarehouse = route.getSourceWarehouse();
            Warehouse destinationWarehouse = route.getDestinationWarehouse();

            storageRequestService.save(shipmentForSave, sourceWarehouse, PENDING);
            storageRequestService.save(shipmentForSave, destinationWarehouse, PENDING);
            transportationRequestService.save(shipmentForSave, route, PENDING);
        });


        return shipmentForSave;
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
