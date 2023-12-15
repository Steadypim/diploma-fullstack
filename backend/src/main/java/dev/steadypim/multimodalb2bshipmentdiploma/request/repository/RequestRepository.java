package dev.steadypim.multimodalb2bshipmentdiploma.request.repository;

import dev.steadypim.multimodalb2bshipmentdiploma.request.entity.Request;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface RequestRepository extends JpaRepository<Request, UUID> {
}
