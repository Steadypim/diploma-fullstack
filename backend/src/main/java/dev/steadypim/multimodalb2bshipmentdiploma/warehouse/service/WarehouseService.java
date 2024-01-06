package dev.steadypim.multimodalb2bshipmentdiploma.warehouse.service;

import dev.steadypim.multimodalb2bshipmentdiploma.address.entity.Address;
import dev.steadypim.multimodalb2bshipmentdiploma.general.geocode.GeocodingService;
import dev.steadypim.multimodalb2bshipmentdiploma.warehouse.entity.Warehouse;
import dev.steadypim.multimodalb2bshipmentdiploma.warehouse.repository.WarehouseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class WarehouseService{

    private final WarehouseRepository repository;
    private final GeocodingService geocodingService;

    public Warehouse createWarehouse(Address address) throws Exception {
        Map<String, Double> geocodeResponse = geocodingService.geocodeAddress(address);

        Warehouse warehouse = new Warehouse();
        warehouse.setAddress(address);
        warehouse.setLatitude(geocodeResponse.get("lat"));
        warehouse.setLongitude(geocodeResponse.get("lng"));

        return repository.save(warehouse);
    }
}
