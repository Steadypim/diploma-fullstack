package dev.steadypim.multimodalb2bshipmentdiploma.transportationroute.api.mapper;

import dev.steadypim.multimodalb2bshipmentdiploma.transport.service.TransportService;
import dev.steadypim.multimodalb2bshipmentdiploma.transportationroute.api.dto.TransportationRouteDTO;
import dev.steadypim.multimodalb2bshipmentdiploma.transportationroute.entity.TransportationRoute;
import dev.steadypim.multimodalb2bshipmentdiploma.warehouse.service.WarehouseService;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

import static org.mapstruct.MappingConstants.ComponentModel.SPRING;

@Mapper(componentModel = SPRING)
public abstract class TransportationRouteMapper {

    @Autowired
    WarehouseService warehouseService;
    @Autowired
    TransportService transportService;

    @Mapping(target = "sourceWarehouse", expression = "java(warehouseService.get(dto.sourceWarehouseId()))")
    @Mapping(target = "destinationWarehouse", expression = "java(warehouseService.get(dto.destinationWarehouseId()))")
    @Mapping(target = "transport", expression = "java(transportService.get(dto.transportId()))")
    public abstract TransportationRoute toEntity(TransportationRouteDTO dto);

    @Mapping(source = "userProfile.id", target = "userProfileId")
    @Mapping(target = "sourceWarehouseId", source = "sourceWarehouse.id")
    @Mapping(target = "destinationWarehouseId", source = "destinationWarehouse.id")
    @Mapping(target = "transportId", source = "transport.id")
    public abstract TransportationRouteDTO toDto(TransportationRoute route);

    public abstract List<TransportationRouteDTO> toEntityList(List<TransportationRoute> routes);

}
