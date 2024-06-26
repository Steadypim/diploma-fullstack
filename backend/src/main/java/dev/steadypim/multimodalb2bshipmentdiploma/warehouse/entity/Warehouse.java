package dev.steadypim.multimodalb2bshipmentdiploma.warehouse.entity;

import dev.steadypim.multimodalb2bshipmentdiploma.address.entity.Address;
import dev.steadypim.multimodalb2bshipmentdiploma.general.enums.EntityStatus;
import dev.steadypim.multimodalb2bshipmentdiploma.general.BaseEntity;
import dev.steadypim.multimodalb2bshipmentdiploma.user.profile.entity.UserProfile;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;

import static lombok.AccessLevel.PRIVATE;

@Table(name = "warehouse")
@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = PRIVATE)
public class Warehouse extends BaseEntity {
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "address_id", referencedColumnName = "id", nullable = false)
    Address address;

    Double latitude;

    Double longitude;

    @ManyToOne
    @JoinColumn(name = "userProfileId")
    UserProfile userProfile;

    @Column(nullable = true)
    BigDecimal price;

    @Enumerated(value = EnumType.STRING)
    EntityStatus status;
}
