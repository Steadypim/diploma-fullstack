package dev.steadypim.multimodalb2bshipmentdiploma.address.entity;

import dev.steadypim.multimodalb2bshipmentdiploma.general.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.*;
import lombok.experimental.FieldDefaults;

import static lombok.AccessLevel.PRIVATE;

@Entity
@Table(name = "address")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = PRIVATE)
public class Address extends BaseEntity {
    @Column(name = "country", length = 50)
    String country;

    @Column(name = "region", length = 50)
    String region;

    @Column(name = "city", length = 50)
    String city;

    @Column(name = "street", length = 50)
    String street;

    @Column(name = "postal_code", length = 15)
    String postalCode;

    @Column(name = "house_number")
    Integer houseNumber;
}
