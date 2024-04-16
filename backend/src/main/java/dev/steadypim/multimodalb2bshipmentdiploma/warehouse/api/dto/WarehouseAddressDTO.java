package dev.steadypim.multimodalb2bshipmentdiploma.warehouse.api.dto;

public record WarehouseAddressDTO(
        String country,
        String region,
        String city,
        String street,
        String postalCode,
        String houseNumber,
        Double price
) {
}
