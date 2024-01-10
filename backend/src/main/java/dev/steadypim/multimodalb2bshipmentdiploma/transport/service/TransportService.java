package dev.steadypim.multimodalb2bshipmentdiploma.transport.service;

import dev.steadypim.multimodalb2bshipmentdiploma.transport.entity.Transport;
import dev.steadypim.multimodalb2bshipmentdiploma.transport.repository.TransportRepository;
import dev.steadypim.multimodalb2bshipmentdiploma.user.profile.entity.UserProfile;
import dev.steadypim.multimodalb2bshipmentdiploma.user.profile.repository.UserProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class TransportService {

    private final TransportRepository repository;
    private final UserProfileRepository userProfileRepository;

    public Transport create(Transport transport, UUID userProfileId){
        UserProfile userProfile = userProfileRepository.findById(userProfileId)
                .orElseThrow( () -> new RuntimeException("User profile not found while creating a transport"));
        transport.setUserProfile(userProfile);
        return repository.save(transport);
    }

    public void update(Transport transport, UUID uuid){
        Transport transportToUpdate = repository.findById(uuid)
                .orElseThrow(() -> new RuntimeException("Transport not found"));

        transportToUpdate.setTransportType(transport.getTransportType());
        transportToUpdate.setAverageSpeed(transport.getAverageSpeed());
        transportToUpdate.setHoldingVolume(transport.getHoldingVolume());
        transportToUpdate.setLiftingCapacity(transport.getLiftingCapacity());
        transportToUpdate.setPackagingRequirements(transport.getPackagingRequirements());

        repository.save(transportToUpdate);
    }

    public void delete(UUID uuid){
        repository.deleteById(uuid);
    }

    public Transport get(UUID uuid){
        return repository.findById(uuid)
                .orElseThrow(() -> new RuntimeException("Transport not found"));
    }

    public List<Transport> getAllWithUserId(UUID userProfileId){
        return repository.findAllByUserProfileId(userProfileId);
    }
}
