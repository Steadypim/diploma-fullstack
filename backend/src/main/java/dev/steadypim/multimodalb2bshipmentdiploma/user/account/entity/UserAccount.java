package dev.steadypim.multimodalb2bshipmentdiploma.user.account.entity;

import dev.steadypim.multimodalb2bshipmentdiploma.general.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.*;
import lombok.experimental.FieldDefaults;

import static lombok.AccessLevel.PRIVATE;

@Entity
@Table(name = "user_account")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = PRIVATE)
public class UserAccount extends BaseEntity {
    @Column(name = "email", unique = true)
    String email;

    @Column(name = "password")
    String password;
}
