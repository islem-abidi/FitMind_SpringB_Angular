package tn.esprit.pidevspringboot.Service;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import org.springframework.stereotype.Service;
import tn.esprit.pidevspringboot.Entities.Abonnement.Abonnement;
import tn.esprit.pidevspringboot.Repository.AbonnementRepository;

import java.util.List;
import java.util.Optional;


@Service
@AllArgsConstructor
public class AbonnementServiceImpl implements IAbonnementService {
    @Autowired
    AbonnementRepository abonnementRepository;

    @Override
    public List<Abonnement> retrieveAllAbonnements() {
        return abonnementRepository.findByArchivedFalse();
    }

    /*@Override
    public Abonnement retrieveAbonnement(Long id) {
        return abonnementRepository.findById(id).orElse(null);
    }*/

    @Override
    public Abonnement retrieveAbonnement(Long id) {
        Optional<Abonnement> abonnementOptional = abonnementRepository.findById(id);
        if (abonnementOptional.isPresent() && !abonnementOptional.get().isArchived()) {
            return abonnementOptional.get();
        } else {
            throw new RuntimeException("Abonnement non trouvé ou archivé !");
        }
    }


    @Override
    public Abonnement addAbonnement(Abonnement abonnement) {
        return abonnementRepository.save(abonnement);
    }


    /*@Override
    public void deleteAbonnement(Long id) {
        abonnementRepository.deleteById(id);
    }*/
    @Override
    public void archiveAbonnement(Long id) {
        Optional<Abonnement> abonnementOptional = abonnementRepository.findById(id);
        if (abonnementOptional.isPresent()) {
            Abonnement abonnement = abonnementOptional.get();
            abonnement.setArchived(true);
            abonnementRepository.save(abonnement);
        } else {
            throw new RuntimeException("Abonnement non trouvé !");
        }
    }
    @Override
    public void restoreAbonnement(Long id) {
        Optional<Abonnement> abonnementOptional = abonnementRepository.findById(id);
        if (abonnementOptional.isPresent()) {
            Abonnement abonnement = abonnementOptional.get();
            abonnement.setArchived(false);
            abonnementRepository.save(abonnement);
        } else {
            throw new RuntimeException("Abonnement non trouvé !");
        }
    }
    @Override
    public Page<Abonnement> retrieveAllAbonnementsPaged(int page, int size, String sortBy, String direction) {
        Sort.Direction sortDirection = direction.equalsIgnoreCase("desc") ? Sort.Direction.DESC : Sort.Direction.ASC;
        Pageable pageable = PageRequest.of(page, size, Sort.by(sortDirection, sortBy));
        return abonnementRepository.findByArchivedFalse(pageable);
    }
    public Page<Abonnement> searchAbonnements(String keyword, int page, int size, String sortBy, String direction) {
        Sort.Direction sortDirection = direction.equalsIgnoreCase("desc") ? Sort.Direction.DESC : Sort.Direction.ASC;
        Pageable pageable = PageRequest.of(page, size, Sort.by(sortDirection, sortBy));
        return abonnementRepository.searchAbonnements(keyword, pageable);
    }

    @Override
    public List<Abonnement> retrieveArchivedAbonnements() {
        return abonnementRepository.findByArchivedTrue();
    }

    public Page<Abonnement> searchArchivedAbonnements(String keyword, int page, int size, String sortBy, String direction) {
        Sort.Direction sortDirection = direction.equalsIgnoreCase("desc") ? Sort.Direction.DESC : Sort.Direction.ASC;
        Pageable pageable = PageRequest.of(page, size, Sort.by(sortDirection, sortBy));
        return abonnementRepository.searchArchivedAbonnements(keyword, pageable);
    }
    public Page<Abonnement> retrieveArchivedAbonnementsPaged(int page, int size, String sortBy, String direction) {
        Sort.Direction sortDirection = direction.equalsIgnoreCase("desc") ? Sort.Direction.DESC : Sort.Direction.ASC;
        Pageable pageable = PageRequest.of(page, size, Sort.by(sortDirection, sortBy));
        return abonnementRepository.findByArchivedTrue(pageable);
    }

}

