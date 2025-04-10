package tn.esprit.pidevspringboot.Controller;


import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;
import tn.esprit.pidevspringboot.Entities.Abonnement.Abonnement;
import tn.esprit.pidevspringboot.Service.IAbonnementService;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/Abonnement")
@Tag(name = "Gestion des abonnements")
public class AbonnementController {

    @Autowired
    IAbonnementService iAbonnementService;

    @Operation(description = "Affichage de tous les abonnements")
    @GetMapping("/retrieveAllAbonnements")
    public List<Abonnement> afficherAbonnements() {
        return iAbonnementService.retrieveAllAbonnements();
    }

    @Operation(description = "Affichage d'un abonnement spécifique")
    @GetMapping("/retrieveAbonnement/{id}")
    public Abonnement afficherAbonnement(@PathVariable("id") Long id) {
        return iAbonnementService.retrieveAbonnement(id);
    }

    @Operation(description = "Ajouter un abonnement")
    @PostMapping("/addAbonnement")
    public Abonnement ajouterAbonnement(@RequestBody Abonnement abonnement) {
        return iAbonnementService.addAbonnement(abonnement);
    }



    /*@Operation(description = "Supprimer un abonnement")
    @DeleteMapping("/deleteAbonnement/{id}")
    public void deleteAbonnement(@PathVariable("id") Long id) {
        iAbonnementService.deleteAbonnement(id);
    }*/
    @Operation(description = "Archiver un abonnement au lieu de le supprimer")
    @PutMapping("/archiveAbonnement/{id}")
    public void archiveAbonnement(@PathVariable("id") Long id) {
        iAbonnementService.archiveAbonnement(id);
    }

    @Operation(description = "Restaurer un abonnement archivé")
    @PutMapping("/restoreAbonnement/{id}")
    public void restoreAbonnement(@PathVariable("id") Long id) {
        iAbonnementService.restoreAbonnement(id);
    }

    @Operation(description = "Afficher tous les abonnements avec pagination et tri")
    @GetMapping("/retrieveAllAbonnementsPaged")
    public Page<Abonnement> retrieveAllAbonnementsPaged(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "dateCreation") String sortBy,
            @RequestParam(defaultValue = "asc") String direction) {

        return iAbonnementService.retrieveAllAbonnementsPaged(page, size, sortBy, direction);
    }
    @GetMapping("/search")
    public Page<Abonnement> searchAbonnements(
            @RequestParam String keyword,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "dateCreation") String sortBy,
            @RequestParam(defaultValue = "asc") String direction) {

        return iAbonnementService.searchAbonnements(keyword, page, size, sortBy, direction);
    }
    @Operation(description = "Afficher les abonnements archivés")
    @GetMapping("/retrieveArchivedAbonnements")
    public List<Abonnement> getArchivedAbonnements() {
        return iAbonnementService.retrieveArchivedAbonnements();
    }

    @GetMapping("/searchArchived")
    public Page<Abonnement> searchArchived(
            @RequestParam String keyword,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "dateCreation") String sortBy,
            @RequestParam(defaultValue = "asc") String direction) {

        return iAbonnementService.searchArchivedAbonnements(keyword, page, size, sortBy, direction);
    }
    @Operation(description = "Afficher les abonnements archivés avec pagination")
    @GetMapping("/retrieveArchivedAbonnementsPaged")
    public Page<Abonnement> getArchivedPaged(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "dateCreation") String sortBy,
            @RequestParam(defaultValue = "asc") String direction) {
        return iAbonnementService.retrieveArchivedAbonnementsPaged(page, size, sortBy, direction);
    }

}
