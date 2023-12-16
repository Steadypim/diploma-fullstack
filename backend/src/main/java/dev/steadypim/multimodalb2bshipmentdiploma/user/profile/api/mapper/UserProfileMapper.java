package dev.steadypim.multimodalb2bshipmentdiploma.user.profile.api.mapper;

import dev.steadypim.multimodalb2bshipmentdiploma.user.profile.api.dtos.UserProfileDTO;
import dev.steadypim.multimodalb2bshipmentdiploma.user.profile.api.dtos.UserProfileRegistrationDTO;
import dev.steadypim.multimodalb2bshipmentdiploma.user.profile.entity.UserProfile;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

import static org.mapstruct.MappingConstants.ComponentModel.SPRING;

@Mapper(componentModel = SPRING)
public interface UserProfileMapper {

    @Mapping(source = "type", target = "userType")
    UserProfile toEntity(UserProfileRegistrationDTO dto);

    List<UserProfileDTO> toDtoList(List<UserProfile> userProfiles);
}
