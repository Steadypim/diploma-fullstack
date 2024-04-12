package dev.steadypim.multimodalb2bshipmentdiploma.warehouse.api;

import dev.steadypim.multimodalb2bshipmentdiploma.action.requests.UpdateStorageStatusesAction;
import dev.steadypim.multimodalb2bshipmentdiploma.shipment.api.dto.ShipmentStatusesDTO;
import dev.steadypim.multimodalb2bshipmentdiploma.warehouse.api.dto.StorageRequestDTO;
import dev.steadypim.multimodalb2bshipmentdiploma.warehouse.api.mapper.StorageRequestMapper;
import dev.steadypim.multimodalb2bshipmentdiploma.warehouse.service.StorageRequestService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RequestMapping("storage")
@RestController
@RequiredArgsConstructor
public class StorageRequestController {
    private final StorageRequestService service;
    private final StorageRequestMapper mapper;
    private final UpdateStorageStatusesAction action;

    @GetMapping("{email}")
    public List<StorageRequestDTO> getAllForShipmentByUserProfileEmail( //сначала тянем все storageRequest на клиента
                                                                        @PathVariable("email") String email
                                                                      ) {
        return mapper.toDtoList(service.getAllForShipmentByUserProfileEmail(email));
    }

    //потом группируем их по shipmentID и выводим в карточки

    @PutMapping("{id}/{email}")
    public void updateStatus(
            @PathVariable("id") UUID shipmentId,
            @PathVariable("email") String email,
            @RequestBody ShipmentStatusesDTO statusesDTO) {

        service.updateStatus(statusesDTO, shipmentId, email);

        action.statusUpdate(shipmentId);
    }
}
