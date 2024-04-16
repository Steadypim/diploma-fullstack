package dev.steadypim.multimodalb2bshipmentdiploma.shipment.api.mapper;

import dev.steadypim.multimodalb2bshipmentdiploma.shipment.api.dto.ShipmentDTO;
import dev.steadypim.multimodalb2bshipmentdiploma.shipment.entity.Shipment;
import dev.steadypim.multimodalb2bshipmentdiploma.transportationroute.api.mapper.TransportationRouteMapper;
import dev.steadypim.multimodalb2bshipmentdiploma.user.profile.api.mapper.UserProfileMapper;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

import static org.mapstruct.MappingConstants.ComponentModel.SPRING;

@Mapper(componentModel = SPRING, uses = {TransportationRouteMapper.class, UserProfileMapper.class})
public interface ShipmentMapper {
    @Mapping(source = "sourceWarehouse.id", target = "sourceWarehouse.warehouseId")
    @Mapping(source = "destinationWarehouse.id", target = "destinationWarehouse.warehouseId")
    ShipmentDTO toDto(Shipment shipment);


    List<ShipmentDTO> toDtoList(List<Shipment> shipments);
}

