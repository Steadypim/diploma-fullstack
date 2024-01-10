package dev.steadypim.multimodalb2bshipmentdiploma.warehouse.api.mapper;

import dev.steadypim.multimodalb2bshipmentdiploma.address.entity.Address;
import dev.steadypim.multimodalb2bshipmentdiploma.warehouse.api.dtos.WarehouseAddressDTO;
import dev.steadypim.multimodalb2bshipmentdiploma.warehouse.api.dtos.WarehouseDTO;
import dev.steadypim.multimodalb2bshipmentdiploma.warehouse.entity.Warehouse;
import org.mapstruct.Mapper;

import static org.mapstruct.MappingConstants.ComponentModel.SPRING;

@Mapper(componentModel = SPRING)
public interface WarehouseMapper {

    Address toEntityAddress(WarehouseAddressDTO dto);

    Warehouse toEntity(WarehouseDTO dto);

    WarehouseDTO toDto(Warehouse warehouse);
}
