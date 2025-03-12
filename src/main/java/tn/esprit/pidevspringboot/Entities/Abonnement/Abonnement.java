package tn.esprit.pidevspringboot.Entities.Abonnement;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;
import tn.esprit.pidevspringboot.Entities.ActiviteSportive.Activite;
import tn.esprit.pidevspringboot.Entities.Menu.Menu;
import tn.esprit.pidevspringboot.Entities.Nutrition.RendezVous;
import tn.esprit.pidevspringboot.Entities.User.User;
import java.util.Date;
import java.util.Set;

@Entity
@Data


public class Abonnement {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idAbonnement;

    @NotNull(message = "L'utilisateur est obligatoire")
    @ManyToOne
    @JoinColumn(name = "id_user")
    private User user;

    // Jointure avec Activite (Sport)
    @ManyToMany
    @JoinTable(
            name = "abonnement_activite",
            joinColumns = @JoinColumn(name = "id_abonnement"),
            inverseJoinColumns = @JoinColumn(name = "id_activite")
    )
    private Set<Activite> activites;

    // Jointure avec Menu (Restauration)
    @ManyToMany
    @JoinTable(
            name = "abonnement_menu",
            joinColumns = @JoinColumn(name = "id_abonnement"),
            inverseJoinColumns = @JoinColumn(name = "id_menu")
    )
    private Set<Menu> menus;

    // Jointure avec RendezVous (Nutrition)
    @OneToMany(mappedBy = "abonnement")
    private Set<RendezVous> rendezVous;

    @NotNull(message = "Le type  est obligatoire")
    @Enumerated(EnumType.STRING)
    private TypeAbonnement typeAbonnement;

    @NotNull(message = "La durée est obligatoire")
    @Enumerated(EnumType.STRING)
    private DureeAbonnement dureeAbonnement;
    @NotNull(message = "La date de création est obligatoire")
    private Date dateCreation;
    @NotNull(message = "La date de fin est obligatoire")
    private Date dateFin;

    @NotNull(message = "Le statut est obligatoire")
    @Enumerated(EnumType.STRING)
    private StatutAbonnement statut;

    private boolean archived = false;
    public boolean isArchived() {
        return archived;
    }

    public void setArchived(boolean archived) {
        this.archived = archived;
    }


    public Set<Activite> getActivites() {
        return activites;
    }

    public void setActivites(Set<Activite> activites) {
        this.activites = activites;
    }

    public Set<Menu> getMenus() {
        return menus;
    }

    public void setMenus(Set<Menu> menus) {
        this.menus = menus;
    }

    public Set<RendezVous> getRendezVous() {
        return rendezVous;
    }

    public void setRendezVous(Set<RendezVous> rendezVous) {
        this.rendezVous = rendezVous;
    }

    @Positive(message = "Le montant doit être positif")
    private float montant;
    private String modePaiement;

    public Long getIdAbonnement() {
        return idAbonnement;
    }

    public void setIdAbonnement(Long idAbonnement) {
        this.idAbonnement = idAbonnement;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Date getDateCreation() {
        return dateCreation;
    }

    public void setDateCreation(Date dateCreation) {
        this.dateCreation = dateCreation;
    }

    public DureeAbonnement getDureeAbonnement() {
        return dureeAbonnement;
    }

    public void setDureeAbonnement(DureeAbonnement dureeAbonnement) {
        this.dureeAbonnement = dureeAbonnement;
    }

    public TypeAbonnement getTypeAbonnement() {
        return typeAbonnement;
    }

    public void setTypeAbonnement(TypeAbonnement typeAbonnement) {
        this.typeAbonnement = typeAbonnement;
    }

    public Date getDateFin() {
        return dateFin;
    }

    public void setDateFin(Date dateFin) {
        this.dateFin = dateFin;
    }

    public StatutAbonnement getStatut() {
        return statut;
    }

    public void setStatut(StatutAbonnement statut) {
        this.statut = statut;
    }

    public float getMontant() {
        return montant;
    }

    public void setMontant(float montant) {
        this.montant = montant;
    }

    public String getModePaiement() {
        return modePaiement;
    }

    public void setModePaiement(String modePaiement) {
        this.modePaiement = modePaiement;
    }
}
