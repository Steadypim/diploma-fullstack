package dev.steadypim.multimodalb2bshipmentdiploma.warehouse.api;

import dev.steadypim.multimodalb2bshipmentdiploma.warehouse.api.dtos.WarehouseAddressDTO;
import dev.steadypim.multimodalb2bshipmentdiploma.warehouse.api.mapper.WarehouseMapper;
import dev.steadypim.multimodalb2bshipmentdiploma.warehouse.entity.Warehouse;
import dev.steadypim.multimodalb2bshipmentdiploma.warehouse.service.WarehouseService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/warehouse")
@RestController
@RequiredArgsConstructor
public class WarehouseController {
    private final WarehouseService service;
    private final WarehouseMapper mapper;

    @PostMapping("/create")
    public Warehouse create(@RequestBody WarehouseAddressDTO warehouseAddressDTO) throws Exception {
        return service.createWarehouse(mapper.toEntity(warehouseAddressDTO));
    }
}
