package tn.esprit.pidevspringboot.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import tn.esprit.pidevspringboot.Entities.Abonnement.Abonnement;
import java.util.List;
import java.util.Optional;

public interface IAbonnementService {
    List<Abonnement> retrieveAllAbonnements();
    Abonnement retrieveAbonnement(Long id);
    Abonnement addAbonnement(Abonnement abonnement);
    void archiveAbonnement(Long id);
    void restoreAbonnement(Long id);
    Page<Abonnement> retrieveAllAbonnementsPaged(int page, int size, String sortBy, String direction);
    public Page<Abonnement> searchAbonnements(String keyword, int page, int size, String sortBy, String direction);
    List<Abonnement> retrieveArchivedAbonnements();
    public Page<Abonnement> searchArchivedAbonnements(String keyword, int page, int size, String sortBy, String direction);
    public Page<Abonnement> retrieveArchivedAbonnementsPaged(int page, int size, String sortBy, String direction);



}
