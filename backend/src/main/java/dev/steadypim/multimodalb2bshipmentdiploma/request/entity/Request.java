package dev.steadypim.multimodalb2bshipmentdiploma.request.entity;

import dev.steadypim.multimodalb2bshipmentdiploma.address.entity.Address;
import dev.steadypim.multimodalb2bshipmentdiploma.general.BaseEntity;
import dev.steadypim.multimodalb2bshipmentdiploma.user.profile.entity.UserProfile;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import static jakarta.persistence.FetchType.EAGER;
import static lombok.AccessLevel.PRIVATE;

@Table(name = "request")
@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = PRIVATE)
public class Request extends BaseEntity {
    @OneToOne(fetch = EAGER)
    @JoinColumn(name = "user_profile_id", referencedColumnName = "id", updatable = false, nullable = false)
    UserProfile userProfile;

    @Column(name = "request_name", length = 50)
    String requestName;

    @Column(name = "extra_info")
    String extraInfo;

    @ManyToOne
    @JoinColumn(name = "departure_place_id", referencedColumnName = "id", nullable = false)
    Address departurePlaceId;

    @ManyToOne
    @JoinColumn(name = "arrival_place_id", referencedColumnName = "id", nullable = false)
    Address arrivalPlaceId;
}
