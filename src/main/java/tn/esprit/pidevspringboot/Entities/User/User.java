package tn.esprit.pidevspringboot.Entities.User;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import tn.esprit.pidevspringboot.Entities.ActiviteSportive.Activite;
import java.util.*;

@Entity
@Table(name = "user")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id_user")
@ToString(exclude = {"reclamations", "activite"})
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_user")
    private long idUser;

    @Column(name = "nom", length = 100, nullable = false)
    private String nom;

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

    public Set<Reclamation> getReclamations() {
        return reclamations;
    }

    public void setReclamations(Set<Reclamation> reclamations) {
        this.reclamations = reclamations;
    }

    public Set<Activite> getActivite() {
        return activite;
    }

    public void setActivite(Set<Activite> activite) {
        this.activite = activite;
    }

    @Column(name = "prenom", length = 100, nullable = false)
    private String prenom;

    @Column(name = "email", length = 255, unique = true, nullable = false)
    private String email;

    @Column(name = "mot_de_passe", length = 255, nullable = false)
    private String motDePasse;

    @Temporal(TemporalType.DATE)
    @Column(name = "date_naissance")
    private Date dateNaissance;

    @Enumerated(EnumType.STRING)
    @Column(name = "sexe", nullable = false)
    private Sexe sexe;



    public void setSexe(Sexe sexe) {
        this.sexe = sexe;
    }


    public long getIdUser() {
        return idUser;
    }

    public void setIdUser(long idUser) {
        this.idUser = idUser;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    @Column(name = "photo_profil", length = 255)
    private String photoProfil;

    @Column(name = "numero_de_telephone")
    private Integer numeroDeTelephone;

    @ManyToOne
    @JoinColumn(name = "id_role", nullable = false)
    private Role role;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Reclamation> reclamations = new HashSet<>();

    @ManyToMany
    private Set<Activite> activite = new HashSet<>();
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<Token> tokens = new ArrayList<>();

    // Implémentation des méthodes de UserDetails
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // Retourne les rôles de l'utilisateur, ici on suppose que "role" est de type Role
        return Set.of(() -> "ROLE_" + this.role.getRoleType().name());
    }

    public Sexe getSexe() {
        return sexe;
    }

    @Override
    public String getPassword() {
        return this.motDePasse;
    }

    @Override
    public String getUsername() {
        return this.email; // Utilisation de l'email comme identifiant
    }

    @Override
    public boolean isAccountNonExpired() {
        return true; // Par défaut, l'utilisateur n'a pas de date d'expiration
    }

    @Override
    public boolean isAccountNonLocked() {
        return true; // L'utilisateur n'est pas bloqué
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true; // Les identifiants ne sont pas expirés
    }

    @Column(name = "archived")
    private boolean archived = false;

    public boolean isArchived() {
        return archived;
    }

    public void setArchived(boolean archived) {
        this.archived = archived;
    }

    @Override
    public boolean isEnabled() {
        return true; // L'utilisateur est activé
    }

    public void setPassword(String motDePasse) {
        this.motDePasse = motDePasse;
    }

}
