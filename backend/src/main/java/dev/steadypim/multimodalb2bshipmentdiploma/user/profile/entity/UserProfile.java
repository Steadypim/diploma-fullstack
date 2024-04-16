package dev.steadypim.multimodalb2bshipmentdiploma.user.profile.entity;

import dev.steadypim.multimodalb2bshipmentdiploma.address.entity.Address;
import dev.steadypim.multimodalb2bshipmentdiploma.general.BaseEntity;
import dev.steadypim.multimodalb2bshipmentdiploma.user.enums.UserType;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

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
public class UserProfile extends BaseEntity implements UserDetails {

    @Column(name = "email", unique = true, nullable = false)
    String email;

    @Column(name = "password", nullable = false)
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

    String companyName;

    String INN;

    String OGRN;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "address_id", referencedColumnName = "id")
    Address address;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(this.userType.toString()));
    }

    @Override
    public String getUsername() {
        return this.email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
