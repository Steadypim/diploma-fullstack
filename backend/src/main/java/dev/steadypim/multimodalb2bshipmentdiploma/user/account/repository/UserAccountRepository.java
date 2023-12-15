package dev.steadypim.multimodalb2bshipmentdiploma.user.account.repository;

import dev.steadypim.multimodalb2bshipmentdiploma.user.account.entity.UserAccount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface UserAccountRepository extends JpaRepository<UserAccount, UUID> {
}
