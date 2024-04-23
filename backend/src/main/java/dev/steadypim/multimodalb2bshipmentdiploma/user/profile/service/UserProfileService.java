package dev.steadypim.multimodalb2bshipmentdiploma.user.profile.service;

import dev.steadypim.multimodalb2bshipmentdiploma.address.entity.Address;
import dev.steadypim.multimodalb2bshipmentdiploma.user.enums.UserStatus;
import dev.steadypim.multimodalb2bshipmentdiploma.user.profile.api.dto.UserProfileUpdateDto;
import dev.steadypim.multimodalb2bshipmentdiploma.user.profile.entity.UserProfile;
import dev.steadypim.multimodalb2bshipmentdiploma.user.profile.repository.UserProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

import static dev.steadypim.multimodalb2bshipmentdiploma.user.enums.UserStatus.ACTIVE;
import static dev.steadypim.multimodalb2bshipmentdiploma.user.enums.UserStatus.INACTIVE;

@Service
@RequiredArgsConstructor
public class UserProfileService {

    private final UserProfileRepository repository;
    private final PasswordEncoder passwordEncoder;

    public void register(UserProfile profile) {
        profile.setPassword(passwordEncoder.encode(profile.getPassword()));
        profile.setUserStatus(INACTIVE);
        repository.save(profile);
    }

    public Optional<UserProfile> findUserProfileByEmail(String email) {
        return repository.findUserProfileByEmail(email);
    }

    public List<UserProfile> getAll() {
        return repository.findAll();
    }

    public UserProfile update(String email, UserProfileUpdateDto dto) {
        UserProfile profile = repository.findUserProfileByEmail(email).orElseThrow(() -> new UsernameNotFoundException("Username: " + email + " not found"));

        profile.setEmail(dto.email());
        if (dto.password() != null) {
            profile.setPassword(passwordEncoder.encode(dto.password()));
        }
        profile.setFirstName(dto.firstName());
        profile.setPatronymic(dto.patronymic());
        profile.setLastName(dto.lastName());
        profile.setPhone(dto.phone());
        profile.setINN(dto.INN());
        profile.setOGRN(dto.OGRN());
        profile.setCompanyName(dto.companyName());

        Address address = Address.builder()
                                 .country(dto.country())
                                 .region(dto.region())
                                 .city(dto.city())
                                 .street(dto.street())
                                 .houseNumber(dto.houseNumber())
                                 .postalCode(dto.postalCode())
                                 .build();

        profile.setAddress(address);

        return repository.save(profile);
    }

    public void activate(String email) {
        UserProfile userProfile = repository.findUserProfileByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        userProfile.setUserStatus(ACTIVE);

        repository.save(userProfile);
    }

    public void deactivate(String email) {
        UserProfile userProfile = repository.findUserProfileByEmail(email)
                                            .orElseThrow(() -> new RuntimeException("User not found"));

        userProfile.setUserStatus(INACTIVE);

        repository.save(userProfile);
    }

}
