package dev.steadypim.multimodalb2bshipmentdiploma.user.profile;

import dev.steadypim.multimodalb2bshipmentdiploma.user.profile.service.UserProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserProfileUserDetailsService implements UserDetailsService {

    private final UserProfileService service;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return service.findUserProfileByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException(
                        "Username: " + username + " not found"));
    }
}
