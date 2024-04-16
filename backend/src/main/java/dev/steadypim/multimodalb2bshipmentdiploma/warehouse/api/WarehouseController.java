package dev.steadypim.multimodalb2bshipmentdiploma.warehouse.api;

import dev.steadypim.multimodalb2bshipmentdiploma.warehouse.api.dto.WarehouseAddressDTO;
import dev.steadypim.multimodalb2bshipmentdiploma.warehouse.api.dto.WarehouseDTO;
import dev.steadypim.multimodalb2bshipmentdiploma.warehouse.api.mapper.WarehouseMapper;
import dev.steadypim.multimodalb2bshipmentdiploma.warehouse.entity.Warehouse;
import dev.steadypim.multimodalb2bshipmentdiploma.warehouse.service.WarehouseService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RequestMapping("/warehouse")
@RestController
@RequiredArgsConstructor
public class WarehouseController {
    private final WarehouseService service;
    private final WarehouseMapper mapper;

    @PostMapping("{email}")
    public WarehouseDTO create(
            @RequestBody WarehouseAddressDTO warehouseAddressDTO,
            @PathVariable("email") String email
                              ) throws Exception {
        Warehouse warehouse = service.createWarehouse(mapper.toEntityAddress(warehouseAddressDTO), email);
        return mapper.toDto(warehouse);
    }

    @GetMapping("{id}")
    public WarehouseDTO get(
            @PathVariable("id") UUID id) {
        return mapper.toDto(service.get(id));
    }

    @PutMapping("{id}")
    public void update(
            @PathVariable("id") UUID id,
            @RequestBody WarehouseDTO dto
                      ) {
        service.update(mapper.toEntity(dto), id);
    }

    @DeleteMapping("{id}")
    public void delete(
            @PathVariable("id") UUID id
                      ) {
        service.delete(id);
    }

    @GetMapping("all/{email}")
    public List<WarehouseDTO> getAllByUserProfileEmail(
            @PathVariable("email") String email) {
        return mapper.toDtoList(service.getAllWithUserEmail(email));
    }

    @GetMapping
    public List<WarehouseDTO> getAllWarehouses() {
        return mapper.toDtoList(service.getAllWarehouses());
    }

}
