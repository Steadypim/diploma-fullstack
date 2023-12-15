package dev.steadypim.multimodalb2bshipmentdiploma.transportationservice.entity;

import dev.steadypim.multimodalb2bshipmentdiploma.general.BaseEntity;
import dev.steadypim.multimodalb2bshipmentdiploma.request.entity.Request;
import dev.steadypim.multimodalb2bshipmentdiploma.transport.entity.Transport;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;

import static jakarta.persistence.FetchType.EAGER;
import static lombok.AccessLevel.PRIVATE;

@Table(name = "service")
@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = PRIVATE)
public class TransportationService extends BaseEntity {
    @OneToOne(fetch = EAGER)
    @JoinColumn(name = "request_id", referencedColumnName = "id", updatable = false, insertable = false, nullable = false)
    Request request;

    @OneToOne(fetch = EAGER)
    @JoinColumn(name = "transport_id", referencedColumnName = "id", updatable = false, insertable = false, nullable = false)
    Transport transport;

    @Column(name = "service_name", nullable = false, length = 50)
    String serviceName;

    @Column(name = "service_description")
    String serviceDescription;

    @Column(name = "price", columnDefinition = "numeric(10,2)", nullable = false)
    BigDecimal price;
}
