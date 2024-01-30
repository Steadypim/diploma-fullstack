package dev.steadypim.multimodalb2bshipmentdiploma.transportationroute.service;

import dev.steadypim.multimodalb2bshipmentdiploma.general.enums.RequestStatus;
import dev.steadypim.multimodalb2bshipmentdiploma.shipment.entity.Shipment;
import dev.steadypim.multimodalb2bshipmentdiploma.transportationroute.api.dto.TransportationRequestDTO;
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

    public void save(Shipment shipment, TransportationRoute route, RequestStatus requestStatus){
        Optional<TransportationRequest> existingRequest = repository.findByTransportationRouteIdAndShipmentId(route.getId(), shipment.getId());
        existingRequest.orElseGet(() -> repository.save(new TransportationRequest(route, shipment, requestStatus)));
    }

    public List<TransportationRequest> getAllForShipmentByUserProfileEmail(String email){
        return repository.findAllByTransportationRouteUserProfileEmail(email);
    }

    public TransportationRequest updateStatus(TransportationRequestDTO request, UUID id){
        TransportationRequest requestToUpdate = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Заявка на перевозку не найдена"));
        requestToUpdate.setRequestStatus(request.requestStatus());
        return repository.save(requestToUpdate);
    }
}
