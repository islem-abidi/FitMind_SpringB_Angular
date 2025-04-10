package tn.esprit.pidevspringboot.Entities.Nutrition;

import jakarta.persistence.*;
import lombok.Data;
import tn.esprit.pidevspringboot.Entities.Abonnement.Abonnement;
import tn.esprit.pidevspringboot.Entities.User.User;

import java.util.Date;

@Entity
@Data
public class RendezVous {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idRendezVous;

    @ManyToOne
    @JoinColumn(name = "id_user", nullable = false)
    private User user;

    @Temporal(TemporalType.TIMESTAMP)
    private Date dateHeure;

    private int duree;
    private String remarque;
    private boolean rappelEnvoye;



    public boolean isRappelEnvoye() {
        return rappelEnvoye;
    }

    public void setRappelEnvoye(boolean rappelEnvoye) {
        this.rappelEnvoye = rappelEnvoye;
    }

    public String getRemarque() {
        return remarque;
    }

    public void setRemarque(String remarque) {
        this.remarque = remarque;
    }

    public int getDuree() {
        return duree;
    }

    public void setDuree(int duree) {
        this.duree = duree;
    }

    public Date getDateHeure() {
        return dateHeure;
    }

    public void setDateHeure(Date dateHeure) {
        this.dateHeure = dateHeure;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Long getIdRendezVous() {
        return idRendezVous;
    }

    public void setIdRendezVous(Long idRendezVous) {
        this.idRendezVous = idRendezVous;
    }



}