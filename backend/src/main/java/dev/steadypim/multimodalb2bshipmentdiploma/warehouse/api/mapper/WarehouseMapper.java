package dev.steadypim.multimodalb2bshipmentdiploma.warehouse.api.mapper;

import dev.steadypim.multimodalb2bshipmentdiploma.address.entity.Address;
import dev.steadypim.multimodalb2bshipmentdiploma.warehouse.api.dto.WarehouseAddressDTO;
import dev.steadypim.multimodalb2bshipmentdiploma.warehouse.api.dto.WarehouseDTO;
import dev.steadypim.multimodalb2bshipmentdiploma.warehouse.entity.Warehouse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

import static org.mapstruct.MappingConstants.ComponentModel.SPRING;

@Mapper(componentModel = SPRING)
public interface WarehouseMapper {

    @Mapping(source = "country", target = "address.country")
    @Mapping(source = "region", target = "address.region")
    @Mapping(source = "city", target = "address.city")
    @Mapping(source = "street", target = "address.street")
    @Mapping(source = "postalCode", target = "address.postalCode")
    @Mapping(source = "houseNumber", target = "address.houseNumber")
    Warehouse toEntityAddress(WarehouseAddressDTO dto);

    Warehouse toEntity(WarehouseDTO dto);

    @Mapping(source = "warehouse.id", target = "warehouseId")
    WarehouseDTO toDto(Warehouse warehouse);

    List<WarehouseDTO> toDtoList(List<Warehouse> warehouses);
}
