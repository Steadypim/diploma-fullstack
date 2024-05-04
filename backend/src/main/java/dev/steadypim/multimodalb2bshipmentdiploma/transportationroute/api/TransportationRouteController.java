package dev.steadypim.multimodalb2bshipmentdiploma.transportationroute.api;

import dev.steadypim.multimodalb2bshipmentdiploma.transportationroute.api.dto.TransportationRouteDTO;
import dev.steadypim.multimodalb2bshipmentdiploma.transportationroute.api.mapper.TransportationRouteMapper;
import dev.steadypim.multimodalb2bshipmentdiploma.transportationroute.entity.TransportationRoute;
import dev.steadypim.multimodalb2bshipmentdiploma.transportationroute.service.TransportationRouteService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/transportationRoute")
@RequiredArgsConstructor
public class TransportationRouteController {

    private final TransportationRouteService service;
    private final TransportationRouteMapper mapper;

    @PostMapping("{email}")
    public TransportationRouteDTO create(@RequestBody TransportationRouteDTO dto, @PathVariable("email") String email) {
        TransportationRoute route = service.create(mapper.toEntity(dto), email);
        return mapper.toDto(route);
    }

    @PutMapping("{id}")
    public void update(@RequestBody TransportationRouteDTO dto, @PathVariable("id") UUID id) {
        service.update(mapper.toEntity(dto), id);
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable("id") UUID id) {
        service.delete(id);
    }

    @DeleteMapping("status/{id}")
    public void deleteByStatus(@PathVariable("id") UUID id) {service.deleteByStatus(id);}

    @GetMapping("done/{id}")
    public void done(@PathVariable("id") UUID id){service.shipmentDone(id);}

    @GetMapping("in-progress/{id}")
    public void inProgress(@PathVariable("id") UUID id){service.shipmentInProgress(id);}

    @GetMapping("all/{email}")
    public List<TransportationRouteDTO> getAllByUserProfileEmail(@PathVariable("email") String email) {
        return mapper.toEntityList(service.getAllWithUserProfileEmail(email));
    }

    @GetMapping("{id}")
    public TransportationRouteDTO get(@PathVariable("id") UUID id) {
        return mapper.toDto(service.get(id));
    }
}
