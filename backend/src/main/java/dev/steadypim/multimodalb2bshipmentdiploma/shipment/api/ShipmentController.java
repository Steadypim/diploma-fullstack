package dev.steadypim.multimodalb2bshipmentdiploma.shipment.api;

import dev.steadypim.multimodalb2bshipmentdiploma.action.CreateShipmentAction;
import dev.steadypim.multimodalb2bshipmentdiploma.action.CreateShipmentArgument;
import dev.steadypim.multimodalb2bshipmentdiploma.shipment.api.dto.ShipmentDTO;
import dev.steadypim.multimodalb2bshipmentdiploma.shipment.api.mapper.ShipmentMapper;
import dev.steadypim.multimodalb2bshipmentdiploma.shipment.entity.Shipment;
import dev.steadypim.multimodalb2bshipmentdiploma.shipment.service.ShipmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/shipment")
public class ShipmentController {

    private final ShipmentService service;
    private final CreateShipmentAction action;
    private final ShipmentMapper mapper;

    @PostMapping("{email}")
    public ShipmentDTO create(@RequestBody CreateShipmentArgument argument,
                              @PathVariable("email") String email){
        Shipment shipment = action.createShipment(argument, email);

        return mapper.toDto(shipment);
    }
}
