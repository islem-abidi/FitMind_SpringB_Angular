package tn.esprit.pidevspringboot.Entities.ActiviteSportive;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import tn.esprit.pidevspringboot.Entities.Abonnement.Abonnement;
import tn.esprit.pidevspringboot.Entities.User.User;

import java.util.Set;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Activite {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_activite;

    @Column(nullable = false)
    private String nomActivite;

    private String description;

    @ManyToMany(mappedBy = "activite")
    Set<User>user;
    @OneToMany(mappedBy = "activite")
    Set<Seance_sport> seance_sports;

    @ManyToMany(mappedBy = "activites")
    private Set<Abonnement> abonnements;

    public Long getId_activite() {
        return id_activite;
    }

    public void setId_activite(Long id_activite) {
        this.id_activite = id_activite;
    }

    public String getNomActivite() {
        return nomActivite;
    }

    public void setNomActivite(String nomActivite) {
        this.nomActivite = nomActivite;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Set<User> getUser() {
        return user;
    }

    public void setUser(Set<User> user) {
        this.user = user;
    }

    public Set<Seance_sport> getSeance_sports() {
        return seance_sports;
    }

    public void setSeance_sports(Set<Seance_sport> seance_sports) {
        this.seance_sports = seance_sports;
    }

    public Set<Abonnement> getAbonnements() {
        return abonnements;
    }

    public void setAbonnements(Set<Abonnement> abonnements) {
        this.abonnements = abonnements;
    }
}
