package dev.steadypim.multimodalb2bshipmentdiploma.transport.api.mapper;

import dev.steadypim.multimodalb2bshipmentdiploma.transport.api.dtos.TransportDTO;
import dev.steadypim.multimodalb2bshipmentdiploma.transport.entity.Transport;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

import static org.mapstruct.MappingConstants.ComponentModel.SPRING;

@Mapper(componentModel = SPRING)
public interface TransportMapper {
    Transport toEntity(TransportDTO dto);

    @Mapping(source = "userProfile.id", target = "user_profile_id")
    TransportDTO toDto(Transport transport);

    List<TransportDTO> toEntityList(List<Transport> transports);
}
