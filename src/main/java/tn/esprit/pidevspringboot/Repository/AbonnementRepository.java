package tn.esprit.pidevspringboot.Repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.pidevspringboot.Entities.Abonnement.Abonnement;


import java.util.List;

public interface AbonnementRepository extends JpaRepository<Abonnement, Long> {
    List<Abonnement> findByArchivedFalse();
   Page<Abonnement> findByArchivedFalse(Pageable pageable);

}
