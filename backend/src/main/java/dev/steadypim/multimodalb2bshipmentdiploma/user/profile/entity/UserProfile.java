package dev.steadypim.multimodalb2bshipmentdiploma.user.profile.entity;

import dev.steadypim.multimodalb2bshipmentdiploma.general.BaseEntity;
import dev.steadypim.multimodalb2bshipmentdiploma.user.enums.UserType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Table;
import lombok.*;
import lombok.experimental.FieldDefaults;

import static jakarta.persistence.EnumType.STRING;
import static lombok.AccessLevel.PRIVATE;

@Table(name = "user_profile")
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = PRIVATE)
public class UserProfile extends BaseEntity {
    @Column(name = "email", unique = true)
    String email;

    @Column(name = "password")
    String password;

    @Enumerated(STRING)
    UserType userType;

    @Column(name = "first_name", length = 30)
    String firstName;

    @Column(name = "last_name", length = 30)
    String lastName;

    @Column(name = "patronymic", length = 30)
    String patronymic;

    @Column(name = "phone", length = 15)
    String phone;
}
