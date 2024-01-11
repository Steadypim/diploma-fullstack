package dev.steadypim.multimodalb2bshipmentdiploma.user.profile.service;

import dev.steadypim.multimodalb2bshipmentdiploma.user.profile.entity.UserProfile;
import dev.steadypim.multimodalb2bshipmentdiploma.user.profile.repository.UserProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserProfileService {

    private final UserProfileRepository repository;
    private final PasswordEncoder passwordEncoder;

    public void register(UserProfile profile) {
        profile.setPassword(passwordEncoder.encode(profile.getPassword()));
        repository.save(profile);
    }

    public Optional<UserProfile> findUserProfileByEmail(String email) {
        return repository.findUserProfileByEmail(email);
    }

    public List<UserProfile> getAll() {
        return repository.findAll();
    }
}
