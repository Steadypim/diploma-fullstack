package dev.steadypim.multimodalb2bshipmentdiploma.user.profile.api.mapper;

import dev.steadypim.multimodalb2bshipmentdiploma.user.profile.api.dto.UserProfileDTO;
import dev.steadypim.multimodalb2bshipmentdiploma.user.profile.api.dto.UserProfileRegistrationDTO;
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

    @Mapping(source = "userProfile.address.country", target = "country")
    @Mapping(source = "userProfile.address.region", target = "region")
    @Mapping(source = "userProfile.address.city", target = "city")
    @Mapping(source = "userProfile.address.street", target = "street")
    @Mapping(source = "userProfile.address.postalCode", target = "postalCode")
    @Mapping(source = "userProfile.address.houseNumber", target = "houseNumber")
    UserProfileDTO toDto(UserProfile userProfile);
}
