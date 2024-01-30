package dev.steadypim.multimodalb2bshipmentdiploma.transportationroute.api;

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

    @GetMapping("{email}")
    public List<TransportationRequestDTO> getAllForShipmentByUserProfileEmail(
            @PathVariable("email") String email
                                                                             ){
        return mapper.toTransportationRouteForShipmentControllerDTOList(service.getAllForShipmentByUserProfileEmail(email));
    }

    @PutMapping("{id}")
    public TransportationRequestDTO updateStatus(
            @PathVariable("id") UUID id,
            @RequestBody TransportationRequestDTO statusDTO
                                                      ){

        return mapper.toTransportationRouteForShipmentControllerDTO(service.updateStatus(statusDTO, id));
    }
}
