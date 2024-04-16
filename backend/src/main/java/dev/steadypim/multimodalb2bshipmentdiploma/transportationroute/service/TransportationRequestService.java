package dev.steadypim.multimodalb2bshipmentdiploma.transportationroute.service;

import dev.steadypim.multimodalb2bshipmentdiploma.general.enums.RequestStatus;
import dev.steadypim.multimodalb2bshipmentdiploma.shipment.api.dto.ShipmentStatusesDTO;
import dev.steadypim.multimodalb2bshipmentdiploma.shipment.entity.Shipment;
import dev.steadypim.multimodalb2bshipmentdiploma.transportationroute.entity.TransportationRequest;
import dev.steadypim.multimodalb2bshipmentdiploma.transportationroute.entity.TransportationRoute;
import dev.steadypim.multimodalb2bshipmentdiploma.transportationroute.repository.TransportationRequestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class TransportationRequestService {

    private final TransportationRequestRepository repository;

    public void save(Shipment shipment, TransportationRoute route, RequestStatus requestStatus) {
        Optional<TransportationRequest> existingRequest = repository.findByTransportationRouteIdAndShipmentId(route.getId(), shipment.getId());
        existingRequest.orElseGet(() -> repository.save(new TransportationRequest(route, shipment, requestStatus)));
    }

    public List<TransportationRequest> getAllForShipmentByUserProfileEmail(String email) {
        return repository.findAllByTransportationRouteUserProfileEmail(email);
    }

    public void updateStatus(ShipmentStatusesDTO statusesDTO, UUID shipmentId, String email) {
        List<TransportationRequest> requestToUpdate = repository.findAllByShipmentIdAndTransportationRouteUserProfileEmail(shipmentId, email);

        RequestStatus transportationStatus = statusesDTO.transportationStatus();

        if (transportationStatus != null) {
            requestToUpdate.forEach(req -> req.setRequestStatus(transportationStatus));
        }

        repository.saveAll(requestToUpdate);
    }

    public void updateStatusById(UUID transportationId, RequestStatus status) {
        TransportationRequest transportationRequest = repository.findById(transportationId).orElseThrow(() -> new RuntimeException("Transportation not found"));

        transportationRequest.setRequestStatus(status);

        repository.save(transportationRequest);
    }

    public List<TransportationRequest> findAllByShipmentId(UUID shipmentId) {
        return repository.findAllByShipmentId(shipmentId);
    }
}
