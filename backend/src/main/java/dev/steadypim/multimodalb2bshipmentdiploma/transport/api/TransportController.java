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

    @PostMapping("{userProfileId}")
    public TransportDTO create(
            @RequestBody TransportDTO dto,
            @PathVariable("userProfileId") UUID userProfileId
    ){
        Transport transport = service.create(mapper.toEntity(dto), userProfileId);
        return mapper.toDto(transport);
    }

    @PutMapping("{id}")
    public void update(
            @RequestBody TransportDTO dto,
            @PathVariable("id") UUID id
    ){
        service.update(mapper.toEntity(dto), id);
    }

    @DeleteMapping("{id}")
    public void delete(
            @PathVariable("id") UUID id
    ){
        service.delete(id);
    }
    @GetMapping("/all/{userProfileId}")
    public List<TransportDTO> getAllByUserProfileId(
            @PathVariable("userProfileId") UUID userProfileId){
        return mapper.toEntityList(service.getAllWithUserId(userProfileId));
    }

    @GetMapping("{id}")
    public TransportDTO get(
            @PathVariable("id") UUID id){
        return mapper.toDto(service.get(id));
    }
}
