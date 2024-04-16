package dev.steadypim.multimodalb2bshipmentdiploma.action.requests;

import dev.steadypim.multimodalb2bshipmentdiploma.shipment.entity.Shipment;
import dev.steadypim.multimodalb2bshipmentdiploma.shipment.service.ShipmentService;
import dev.steadypim.multimodalb2bshipmentdiploma.transportationroute.entity.TransportationRequest;
import dev.steadypim.multimodalb2bshipmentdiploma.transportationroute.service.TransportationRequestService;
import dev.steadypim.multimodalb2bshipmentdiploma.warehouse.entity.StorageRequest;
import dev.steadypim.multimodalb2bshipmentdiploma.warehouse.service.StorageRequestService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.UUID;

import static dev.steadypim.multimodalb2bshipmentdiploma.general.enums.RequestStatus.*;

@Component
@RequiredArgsConstructor
public class UpdateStorageStatusesAction {

    private final TransportationRequestService transportationRequestService;
    private final StorageRequestService storageRequestService;
    private final ShipmentService shipmentService;

    public void statusUpdate(UUID shipmentId) {
        List<StorageRequest> storageRequests = storageRequestService.findAllByShipmentId(shipmentId);
        List<TransportationRequest> transportationRequests = transportationRequestService.findAllByShipmentId(shipmentId);

        Shipment shipment = shipmentService.get(shipmentId);

        if (shipment.getRequestStatus() == PAID) {
            storageRequests.forEach(request -> storageRequestService.updateStatusById(request.getId(), PAID));
            transportationRequests.forEach(request -> transportationRequestService.updateStatusById(request.getId(), PAID));
            storageRequests = storageRequestService.findAllByShipmentId(shipmentId);
            transportationRequests = transportationRequestService.findAllByShipmentId(shipmentId);
        }

        boolean allStoragesApproved = checkStorageStatusesApproved(storageRequests);
        boolean allTransportationsApproved = checkTransportationStatusesApproved(transportationRequests);

        if (allStoragesApproved && allTransportationsApproved) {
            shipmentService.updateStatus(shipmentId, APPROVED);
        }

        boolean isAnyStorageRejected = checkStorageStatusesRejected(storageRequests);
        boolean isAnyTransportationRejected = checkTransportationStatusesRejected(transportationRequests);

        if (isAnyStorageRejected || isAnyTransportationRejected) {
            shipmentService.updateStatus(shipmentId, REJECTED);
        }
    }

    private boolean checkStorageStatusesApproved(List<StorageRequest> storageRequests) {
        return storageRequests.stream()
                              .allMatch(req -> req.getRequestStatus() == APPROVED);

    }

    private boolean checkTransportationStatusesApproved(List<TransportationRequest> transportationRequests) {
        return transportationRequests.stream()
                                     .allMatch(req -> req.getRequestStatus() == APPROVED);

    }

    private boolean checkStorageStatusesRejected(List<StorageRequest> storageRequests) {
        return storageRequests.stream()
                              .anyMatch(req -> req.getRequestStatus() == REJECTED);

    }

    private boolean checkTransportationStatusesRejected(List<TransportationRequest> transportationRequests) {
        return transportationRequests.stream()
                                     .anyMatch(req -> req.getRequestStatus() == REJECTED);

    }
}
