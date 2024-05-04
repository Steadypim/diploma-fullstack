package dev.steadypim.multimodalb2bshipmentdiploma.warehouse.service;

import dev.steadypim.multimodalb2bshipmentdiploma.general.geocode.GeocodingService;
import dev.steadypim.multimodalb2bshipmentdiploma.user.profile.entity.UserProfile;
import dev.steadypim.multimodalb2bshipmentdiploma.user.profile.repository.UserProfileRepository;
import dev.steadypim.multimodalb2bshipmentdiploma.warehouse.entity.Warehouse;
import dev.steadypim.multimodalb2bshipmentdiploma.warehouse.repository.WarehouseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.UUID;

import static dev.steadypim.multimodalb2bshipmentdiploma.general.enums.EntityStatus.ACTIVE;
import static dev.steadypim.multimodalb2bshipmentdiploma.general.enums.EntityStatus.DELETED;

@Service
@RequiredArgsConstructor
public class WarehouseService {

    private final WarehouseRepository repository;
    private final UserProfileRepository userProfileRepository;
    private final GeocodingService geocodingService;

    public Warehouse createWarehouse(Warehouse warehouse, String email) throws Exception {
        UserProfile userProfile = userProfileRepository.findUserProfileByEmail(email)
                                                       .orElseThrow(() -> new RuntimeException("User profile not found while creating a warehouse"));
        Map<String, Double> geocodeResponse = geocodingService.geocodeAddress(warehouse.getAddress());

        warehouse.setLatitude(geocodeResponse.get("lat"));
        warehouse.setLongitude(geocodeResponse.get("lng"));
        warehouse.setUserProfile(userProfile);
        warehouse.setStatus(ACTIVE);

        return repository.save(warehouse);
    }

    public Warehouse get(UUID uuid) {
        return repository.findById(uuid)
                         .orElseThrow(() -> new RuntimeException("Warehouse not found"));
    }

    public void update(Warehouse warehouse, UUID uuid) {
        Warehouse warehouseToUpdate = repository.findById(uuid)
                                                .orElseThrow(() -> new RuntimeException("Warehouse not found"));

        warehouseToUpdate.setAddress(warehouse.getAddress());
        warehouseToUpdate.setPrice(warehouse.getPrice());

        repository.save(warehouseToUpdate);
    }

    public void delete(UUID uuid) {
        repository.deleteById(uuid);
    }

    public void deleteByStatus(UUID id) {
        Warehouse warehouse = repository.findById(id).orElseThrow(() -> new RuntimeException("Transportation route not found"));

        warehouse.setStatus(DELETED);

        repository.save(warehouse);
    }

    public List<Warehouse> getAllWithUserEmail(String email) {
        return repository.findAllByUserProfileEmailAndStatus(email, ACTIVE);
    }

    public List<Warehouse> getAllWarehouses() {
        return repository.findAllByStatus(ACTIVE);
    }

}
