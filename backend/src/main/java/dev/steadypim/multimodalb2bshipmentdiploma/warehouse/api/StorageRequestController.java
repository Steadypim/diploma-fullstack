package dev.steadypim.multimodalb2bshipmentdiploma.warehouse.api;

import dev.steadypim.multimodalb2bshipmentdiploma.warehouse.api.dto.StorageRequestDTO;
import dev.steadypim.multimodalb2bshipmentdiploma.warehouse.api.dto.StorageUpdateStatusDTO;
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

    @GetMapping("{email}")
    public List<StorageRequestDTO> getAllForShipmentByUserProfileEmail(
            @PathVariable("email") String email
                                                                      ){
        return mapper.toDtoList(service.getAllForShipmentByUserProfileEmail(email));
    }

    @PutMapping("{id}")
    public StorageUpdateStatusDTO updateStatus(
            @PathVariable("id") UUID id,
            @RequestBody StorageUpdateStatusDTO statusDTO
                                        ){
        return mapper.toDtoAfterUpdate(service.updateStatus(mapper.toUpdateDto(statusDTO), id));
    }
}
