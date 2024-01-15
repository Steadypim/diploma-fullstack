package dev.steadypim.multimodalb2bshipmentdiploma.shipment.api.mapper;

import dev.steadypim.multimodalb2bshipmentdiploma.shipment.api.dto.ShipmentDTO;
import dev.steadypim.multimodalb2bshipmentdiploma.shipment.entity.Shipment;
import org.mapstruct.Mapper;

import static org.mapstruct.MappingConstants.ComponentModel.SPRING;

@Mapper(componentModel = SPRING)
public interface ShipmentMapper {
    ShipmentDTO toDto(Shipment shipment);
}
