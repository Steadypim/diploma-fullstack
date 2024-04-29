package dev.steadypim.multimodalb2bshipmentdiploma.transport.service;

import dev.steadypim.multimodalb2bshipmentdiploma.transport.entity.Transport;
import dev.steadypim.multimodalb2bshipmentdiploma.transport.repository.TransportRepository;
import dev.steadypim.multimodalb2bshipmentdiploma.user.profile.entity.UserProfile;
import dev.steadypim.multimodalb2bshipmentdiploma.user.profile.repository.UserProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

import static dev.steadypim.multimodalb2bshipmentdiploma.enumerated.EntityStatus.ACTIVE;
import static dev.steadypim.multimodalb2bshipmentdiploma.enumerated.EntityStatus.DELETED;

@Service
@RequiredArgsConstructor
public class TransportService {

    private final TransportRepository repository;
    private final UserProfileRepository userProfileRepository;

    public Transport create(Transport transport, String email) {
        UserProfile userProfile = userProfileRepository.findUserProfileByEmail(email)
                                                       .orElseThrow(() -> new RuntimeException("User profile not found while creating a transport"));
        transport.setUserProfile(userProfile);
        transport.setStatus(ACTIVE);
        return repository.save(transport);
    }

    public void update(Transport transport, UUID uuid) {
        Transport transportToUpdate = repository.findById(uuid)
                                                .orElseThrow(() -> new RuntimeException("Transport not found"));

        transportToUpdate.setTransportType(transport.getTransportType());
        transportToUpdate.setAverageSpeed(transport.getAverageSpeed());
        transportToUpdate.setHoldingVolume(transport.getHoldingVolume());
        transportToUpdate.setLiftingCapacity(transport.getLiftingCapacity());
        transportToUpdate.setPackagingRequirements(transport.getPackagingRequirements());

        repository.save(transportToUpdate);
    }

    public void delete(UUID uuid) {
        repository.deleteById(uuid);
    }

    public void deleteByStatus(UUID id){
        Transport transport = repository.findById(id).orElseThrow(() -> new RuntimeException("Transport not found"));

        transport.setStatus(DELETED);

        repository.save(transport);
    }

    public Transport get(UUID uuid) {
        return repository.findById(uuid)
                         .orElseThrow(() -> new RuntimeException("Transport not found"));
    }

    public List<Transport> getAllWithUserEmail(String email) {
        return repository.findAllByUserProfileEmailAndStatus(email, ACTIVE);
    }
}
