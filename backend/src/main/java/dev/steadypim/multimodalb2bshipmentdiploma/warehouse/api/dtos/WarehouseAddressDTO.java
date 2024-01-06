package dev.steadypim.multimodalb2bshipmentdiploma.warehouse.api.dtos;

public record WarehouseAddressDTO(
    String country,
    String region,
    String city,
    String street,
    String postalCode,
    Integer houseNumber
) {
}
