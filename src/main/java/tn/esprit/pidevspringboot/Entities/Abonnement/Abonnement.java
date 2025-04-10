package tn.esprit.pidevspringboot.Entities.Abonnement;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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
    @JsonIgnoreProperties("abonnements") // pour éviter la boucle infinie
    private User user;






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
    private StatutAbonnement statut = StatutAbonnement.ACTIF;


    private boolean archived = false;
    public boolean isArchived() {
        return archived;
    }

    public void setArchived(boolean archived) {
        this.archived = archived;
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
