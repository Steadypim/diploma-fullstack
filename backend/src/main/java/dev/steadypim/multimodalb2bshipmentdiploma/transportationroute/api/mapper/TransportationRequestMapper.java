package dev.steadypim.multimodalb2bshipmentdiploma.transportationroute.api.mapper;

import dev.steadypim.multimodalb2bshipmentdiploma.transportationroute.api.dto.TransportationRequestDTO;
import dev.steadypim.multimodalb2bshipmentdiploma.transportationroute.entity.TransportationRequest;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

import static org.mapstruct.MappingConstants.ComponentModel.SPRING;

@Mapper(componentModel = SPRING)
public interface TransportationRequestMapper {
    @Mapping(source = "request.transportationRoute.sourceWarehouse.id", target = "sourceWarehouse.warehouseId")
    @Mapping(source = "request.transportationRoute.sourceWarehouse.address", target = "sourceWarehouse.address")
    @Mapping(source = "request.transportationRoute.destinationWarehouse.id", target = "destinationWarehouse.warehouseId")
    @Mapping(source = "request.transportationRoute.destinationWarehouse.address", target = "destinationWarehouse.address")
    @Mapping(source = "request.transportationRoute.transport.userProfile.id", target = "transport.userProfileId")
    @Mapping(source = "request.transportationRoute.transport.transportType", target = "transport.transportType")
    @Mapping(source = "request.transportationRoute.transport.liftingCapacity", target = "transport.liftingCapacity")
    @Mapping(source = "request.transportationRoute.transport.holdingVolume", target = "transport.holdingVolume")
    @Mapping(source = "request.transportationRoute.transport.averageSpeed", target = "transport.averageSpeed")
    @Mapping(source = "request.transportationRoute.transport.packagingRequirements", target = "transport.packagingRequirements")
    @Mapping(source = "request.transportationRoute.price", target = "price")
    @Mapping(source = "request.transportationRoute.userProfile.id", target = "userProfileId")
    TransportationRequestDTO toTransportationRouteForShipmentControllerDTO(TransportationRequest request);

    List<TransportationRequestDTO> toTransportationRouteForShipmentControllerDTOList(List<TransportationRequest> requests);
}
