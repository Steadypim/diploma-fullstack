package dev.steadypim.multimodalb2bshipmentdiploma.user.profile.repository;

import dev.steadypim.multimodalb2bshipmentdiploma.user.profile.entity.UserProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface UserProfileRepository extends JpaRepository<UserProfile, UUID> {
}
