package dev.steadypim.multimodalb2bshipmentdiploma.user.profile.entity;

import dev.steadypim.multimodalb2bshipmentdiploma.general.BaseEntity;
import dev.steadypim.multimodalb2bshipmentdiploma.user.account.entity.UserAccount;
import dev.steadypim.multimodalb2bshipmentdiploma.user.enums.UserType;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import static jakarta.persistence.EnumType.STRING;
import static jakarta.persistence.FetchType.EAGER;
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
    @OneToOne(fetch = EAGER)
    @JoinColumn(name = "id", referencedColumnName = "id", insertable = false, updatable = false, nullable = false)
    @MapsId
    UserAccount userAccount;

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
