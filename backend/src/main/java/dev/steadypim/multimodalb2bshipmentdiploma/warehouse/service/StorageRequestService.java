package dev.steadypim.multimodalb2bshipmentdiploma.warehouse.service;

import dev.steadypim.multimodalb2bshipmentdiploma.general.enums.RequestStatus;
import dev.steadypim.multimodalb2bshipmentdiploma.shipment.api.dto.ShipmentStatusesDTO;
import dev.steadypim.multimodalb2bshipmentdiploma.shipment.entity.Shipment;
import dev.steadypim.multimodalb2bshipmentdiploma.warehouse.entity.StorageRequest;
import dev.steadypim.multimodalb2bshipmentdiploma.warehouse.entity.Warehouse;
import dev.steadypim.multimodalb2bshipmentdiploma.warehouse.repository.StorageRequestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class StorageRequestService {

    private final StorageRequestRepository repository;

    public void save(Shipment shipment, Warehouse warehouse, RequestStatus requestStatus) {
        Optional<StorageRequest> existingRequest = repository.findByWarehouseIdAndShipmentId(warehouse.getId(), shipment.getId());
        BigDecimal storagePrice = warehouse.getPrice().multiply(BigDecimal.valueOf(shipment.getWeight()));
        existingRequest.orElseGet(() -> repository.save(new StorageRequest(warehouse, shipment, requestStatus, storagePrice)));
    }

    public List<StorageRequest> getAllForShipmentByUserProfileEmail(String email) {
        return repository.findAllByWarehouseUserProfileEmail(email);
    }

    public void updateStatus(ShipmentStatusesDTO statusesDTO, UUID shipmentId, String email) {
        List<StorageRequest> requestToStatusUpdate = repository.findAllByShipmentIdAndWarehouseUserProfileEmail(shipmentId, email);

        RequestStatus storageStatus = statusesDTO.storageStatus();

        if (storageStatus != null) {
            requestToStatusUpdate.forEach(req -> req.setRequestStatus(storageStatus));
        }

        repository.saveAll(requestToStatusUpdate);
    }

    public void updateStatusById(UUID storageId, RequestStatus status){
        StorageRequest storageRequest = repository.findById(storageId).orElseThrow(() -> new RuntimeException("Storage not found"));

        storageRequest.setRequestStatus(status);

        repository.save(storageRequest);
    }

    public List<StorageRequest> findAllByShipmentId(UUID shipmentId) {
        return repository.findAllByShipmentId(shipmentId);
    }

}
