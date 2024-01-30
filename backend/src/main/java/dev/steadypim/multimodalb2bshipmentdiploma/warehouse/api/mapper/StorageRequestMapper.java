package dev.steadypim.multimodalb2bshipmentdiploma.warehouse.api.mapper;

import dev.steadypim.multimodalb2bshipmentdiploma.warehouse.api.dto.StorageRequestDTO;
import dev.steadypim.multimodalb2bshipmentdiploma.warehouse.api.dto.StorageUpdateStatusDTO;
import dev.steadypim.multimodalb2bshipmentdiploma.warehouse.entity.StorageRequest;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

import static org.mapstruct.MappingConstants.ComponentModel.SPRING;

@Mapper(componentModel = SPRING)
public interface StorageRequestMapper {

    @Mapping(source = "request.warehouse.id", target = "warehouseId")
    @Mapping(source = "request.warehouse.address", target = "address")
    StorageRequestDTO toDto(StorageRequest request);

    List<StorageRequestDTO> toDtoList(List<StorageRequest> request);

    StorageRequest toUpdateEntity(StorageUpdateStatusDTO updateStatusDTO);

    @Mapping(source = "request.warehouse.id", target = "warehouseId")
    @Mapping(source = "request.warehouse.address", target = "address")
    StorageUpdateStatusDTO toDtoAfterUpdate(StorageRequest request);

}

