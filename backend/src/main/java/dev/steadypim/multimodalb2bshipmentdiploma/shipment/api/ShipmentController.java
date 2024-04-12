package dev.steadypim.multimodalb2bshipmentdiploma.shipment.api;

import dev.steadypim.multimodalb2bshipmentdiploma.action.requests.UpdateStorageStatusesAction;
import dev.steadypim.multimodalb2bshipmentdiploma.action.shipment.CreateShipmentAction;
import dev.steadypim.multimodalb2bshipmentdiploma.action.shipment.CreateShipmentArgument;
import dev.steadypim.multimodalb2bshipmentdiploma.shipment.api.dto.ShipmentDTO;
import dev.steadypim.multimodalb2bshipmentdiploma.shipment.api.dto.ShipmentStatusesDTO;
import dev.steadypim.multimodalb2bshipmentdiploma.shipment.api.mapper.ShipmentMapper;
import dev.steadypim.multimodalb2bshipmentdiploma.shipment.entity.Shipment;
import dev.steadypim.multimodalb2bshipmentdiploma.shipment.service.ShipmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/shipment")
public class ShipmentController {

    private final ShipmentService service;
    private final CreateShipmentAction action;
    private final ShipmentMapper mapper;
    private final UpdateStorageStatusesAction updateStorageStatusesAction;

    @PostMapping("{email}")
    public ShipmentDTO create(@RequestBody CreateShipmentArgument argument,
                              @PathVariable("email") String email) {
        Shipment shipment = action.createShipment(argument, email);

        return mapper.toDto(shipment);
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable("id") UUID id){
        service.delete(id);
    }

    @GetMapping("{id}")
    public ShipmentDTO get(@PathVariable("id") UUID id){
        return mapper.toDto(service.get(id));
    }

    @GetMapping("all/{email}")
    public List<ShipmentDTO> getAllUserShipmentsByUserEmail(@PathVariable("email") String email){
        return mapper.toDtoList(service.getAllUserShipments(email));
    }

    @PutMapping("{id}")
    public void updateStatuses(
            @PathVariable("id") UUID id,
            @RequestBody ShipmentStatusesDTO requestStatus
                                                ){

        service.updateStatus(id, requestStatus.requestStatus());

        updateStorageStatusesAction.statusUpdate(id);
    }
}
