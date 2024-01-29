package dev.steadypim.multimodalb2bshipmentdiploma.warehouse.service;

import dev.steadypim.multimodalb2bshipmentdiploma.general.enums.RequestStatus;
import dev.steadypim.multimodalb2bshipmentdiploma.shipment.entity.Shipment;
import dev.steadypim.multimodalb2bshipmentdiploma.warehouse.entity.StorageRequest;
import dev.steadypim.multimodalb2bshipmentdiploma.warehouse.entity.Warehouse;
import dev.steadypim.multimodalb2bshipmentdiploma.warehouse.repository.StorageRequestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class StorageRequestService {

    private final StorageRequestRepository repository;

    public void save(Shipment shipment, Warehouse warehouse, RequestStatus requestStatus) {
        Optional<StorageRequest> existingRequest = repository.findByWarehouseIdAndShipmentId(warehouse.getId(), shipment.getId());
        existingRequest.orElseGet(() -> repository.save(new StorageRequest(warehouse, shipment, requestStatus)));
    }

    public List<StorageRequest> getAllForShipmentByUserProfileEmail(String email) {
        return repository.findAllByWarehouseUserProfileEmail(email);
    }

    public StorageRequest updateStatus(StorageRequest request, UUID id) {
        StorageRequest requestToStatusUpdate = repository.findById(id)
                                                         .orElseThrow(() -> new RuntimeException("Заявка на хранение не найдена"));
        requestToStatusUpdate.setRequestStatus(request.getRequestStatus());
        return repository.save(requestToStatusUpdate);
    }
}
