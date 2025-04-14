package tn.esprit.pidevspringboot.Entities.User;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;
import tn.esprit.pidevspringboot.Entities.Abonnement.Abonnement;
import tn.esprit.pidevspringboot.Entities.ActiviteSportive.Activite;

import java.util.*;

@Entity
@Table(name = "user")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_user")
    long id;


    @Column(name = "nom", length = 100, nullable = false)
    String nom;

    @Column(name = "prenom", length = 100, nullable = false)
    String prenom;

    @Column(name = "email", length = 255, unique = true, nullable = false)
    String email;

    @Column(name = "mot_de_passe", length = 255, nullable = false)
    String motDePasse;

    @Temporal(TemporalType.DATE)
    @Column(name = "date_naissance")
    Date dateNaissance;

    @Enumerated(EnumType.STRING)
    @Column(name = "sexe", nullable = false)
    Sexe sexe;

    public enum Sexe {
        Homme, Femme, Autre
    }

    @Column(name = "photo_profil", length = 255)
    private String photoProfil;

    @Column(name = "numero_de_telephone")
    private Integer numeroDeTelephone;

    @ManyToOne
    @JoinColumn(name = "id_role", nullable = false)
    private Role role;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Reclamation> reclamations = new ArrayList<>();

    @ManyToMany
    @JsonIgnoreProperties("user")
    @JsonIgnore
    Set<Activite> activite;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Abonnement> abonnements = new ArrayList<>();

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getPrenom() {
        return prenom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getMotDePasse() {
        return motDePasse;
    }

    public void setMotDePasse(String motDePasse) {
        this.motDePasse = motDePasse;
    }

    public Date getDateNaissance() {
        return dateNaissance;
    }

    public void setDateNaissance(Date dateNaissance) {
        this.dateNaissance = dateNaissance;
    }

    public Sexe getSexe() {
        return sexe;
    }

    public void setSexe(Sexe sexe) {
        this.sexe = sexe;
    }

    public String getPhotoProfil() {
        return photoProfil;
    }

    public void setPhotoProfil(String photoProfil) {
        this.photoProfil = photoProfil;
    }

    public Integer getNumeroDeTelephone() {
        return numeroDeTelephone;
    }

    public void setNumeroDeTelephone(Integer numeroDeTelephone) {
        this.numeroDeTelephone = numeroDeTelephone;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public List<Reclamation> getReclamations() {
        return reclamations;
    }

    public void setReclamations(List<Reclamation> reclamations) {
        this.reclamations = reclamations;
    }

    public Set<Activite> getActivite() {
        return activite;
    }

    public void setActivite(Set<Activite> activite) {
        this.activite = activite;
    }

    public List<Abonnement> getAbonnements() {
        return abonnements;
    }

    public void setAbonnements(List<Abonnement> abonnements) {
        this.abonnements = abonnements;
    }
}
