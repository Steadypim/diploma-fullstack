package dev.steadypim.multimodalb2bshipmentdiploma.user.profile.mapper;

import dev.steadypim.multimodalb2bshipmentdiploma.user.profile.dtos.UserProfileRegistrationDTO;
import dev.steadypim.multimodalb2bshipmentdiploma.user.profile.entity.UserProfile;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import static org.mapstruct.MappingConstants.ComponentModel.SPRING;

@Mapper(componentModel = SPRING)
public interface UserProfileMapper {

    @Mapping(source = "type", target = "userType")
    UserProfile toEntity(UserProfileRegistrationDTO dto);
}
