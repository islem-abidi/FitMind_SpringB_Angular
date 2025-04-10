package tn.esprit.pidevspringboot.Repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import tn.esprit.pidevspringboot.Entities.Abonnement.Abonnement;


import java.util.List;

public interface AbonnementRepository extends JpaRepository<Abonnement, Long> {
    List<Abonnement> findByArchivedFalse();
   Page<Abonnement> findByArchivedFalse(Pageable pageable);
    List<Abonnement> findByArchivedTrue();
    Page<Abonnement> findByArchivedTrue(Pageable pageable);

    @Query("SELECT a FROM Abonnement a WHERE a.archived = false AND " +
            "(LOWER(a.user.nom) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(a.statut) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "CAST(a.montant AS string) LIKE %:keyword%)")
    Page<Abonnement> searchAbonnements(@Param("keyword") String keyword, Pageable pageable);

    @Query("SELECT a FROM Abonnement a WHERE a.archived = true AND " +
            "(LOWER(a.user.nom) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(a.typeAbonnement) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(a.statut) LIKE LOWER(CONCAT('%', :keyword, '%')))")
    Page<Abonnement> searchArchivedAbonnements(@Param("keyword") String keyword, Pageable pageable);


}
