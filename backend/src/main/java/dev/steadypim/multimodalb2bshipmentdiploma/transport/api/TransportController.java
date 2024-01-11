package dev.steadypim.multimodalb2bshipmentdiploma.transport.api;

import dev.steadypim.multimodalb2bshipmentdiploma.transport.api.dtos.TransportDTO;
import dev.steadypim.multimodalb2bshipmentdiploma.transport.api.mapper.TransportMapper;
import dev.steadypim.multimodalb2bshipmentdiploma.transport.entity.Transport;
import dev.steadypim.multimodalb2bshipmentdiploma.transport.service.TransportService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/transport")
@RequiredArgsConstructor
public class TransportController {

    private final TransportService service;
    private final TransportMapper mapper;

    @PostMapping("{email}")
    public TransportDTO create(
            @RequestBody TransportDTO dto,
            @PathVariable("email") String email
                              ) {
        Transport transport = service.create(mapper.toEntity(dto), email);
        return mapper.toDto(transport);
    }

    @PutMapping("{id}")
    public void update(
            @RequestBody TransportDTO dto,
            @PathVariable("id") UUID id
                      ) {
        service.update(mapper.toEntity(dto), id);
    }

    @DeleteMapping("{id}")
    public void delete(
            @PathVariable("id") UUID id
                      ) {
        service.delete(id);
    }

    @GetMapping("all/{email}")
    public List<TransportDTO> getAllByUserProfileEmail(
            @PathVariable("email") String email) {
        return mapper.toEntityList(service.getAllWithUserId(email));
    }

    @GetMapping("{id}")
    public TransportDTO get(
            @PathVariable("id") UUID id) {
        return mapper.toDto(service.get(id));
    }
}
