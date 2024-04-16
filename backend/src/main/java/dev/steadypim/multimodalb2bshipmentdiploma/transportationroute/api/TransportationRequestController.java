package dev.steadypim.multimodalb2bshipmentdiploma.transportationroute.api;

import dev.steadypim.multimodalb2bshipmentdiploma.action.requests.UpdateStorageStatusesAction;
import dev.steadypim.multimodalb2bshipmentdiploma.shipment.api.dto.ShipmentStatusesDTO;
import dev.steadypim.multimodalb2bshipmentdiploma.transportationroute.api.dto.TransportationRequestDTO;
import dev.steadypim.multimodalb2bshipmentdiploma.transportationroute.api.mapper.TransportationRequestMapper;
import dev.steadypim.multimodalb2bshipmentdiploma.transportationroute.service.TransportationRequestService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("transportationRequest")
@RequiredArgsConstructor
public class TransportationRequestController {
    private final TransportationRequestService service;
    private final TransportationRequestMapper mapper;
    private final UpdateStorageStatusesAction action;

    @GetMapping("{email}")
    public List<TransportationRequestDTO> getAllForShipmentByUserProfileEmail(
            @PathVariable("email") String email
                                                                             ) {
        return mapper.toTransportationRouteForShipmentControllerDTOList(service.getAllForShipmentByUserProfileEmail(email));
    }

    @PutMapping("{id}/{email}")
    public void updateStatus(
            @PathVariable("id") UUID shipmentId,
            @PathVariable("email") String email,
            @RequestBody ShipmentStatusesDTO statusesDTO
                            ) {

        service.updateStatus(statusesDTO, shipmentId, email);

        action.statusUpdate(shipmentId);
    }
}
