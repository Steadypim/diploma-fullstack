package dev.steadypim.multimodalb2bshipmentdiploma.warehouse.api;

import dev.steadypim.multimodalb2bshipmentdiploma.warehouse.api.dto.StorageRequestDTO;
import dev.steadypim.multimodalb2bshipmentdiploma.warehouse.api.mapper.StorageRequestMapper;
import dev.steadypim.multimodalb2bshipmentdiploma.warehouse.service.StorageRequestService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

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
}
