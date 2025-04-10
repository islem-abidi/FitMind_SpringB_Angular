package tn.esprit.pidevspringboot.Entities.Menu;

import jakarta.persistence.*;
import lombok.Data;
import tn.esprit.pidevspringboot.Entities.Abonnement.Abonnement;

import java.util.Date;
import java.util.List;
import java.util.Set;

@Entity
@Data
public class Menu {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idMenu;
    private Date dateMenu;
    private String typeRepas;

    @OneToMany(mappedBy = "menu")
    private List<Plat> plats;



    public Long getIdMenu() {
        return idMenu;
    }

    public void setIdMenu(Long idMenu) {
        this.idMenu = idMenu;
    }

    public Date getDateMenu() {
        return dateMenu;
    }

    public void setDateMenu(Date dateMenu) {
        this.dateMenu = dateMenu;
    }

    public String getTypeRepas() {
        return typeRepas;
    }

    public void setTypeRepas(String typeRepas) {
        this.typeRepas = typeRepas;
    }

    public List<Plat> getPlats() {
        return plats;
    }

    public void setPlats(List<Plat> plats) {
        this.plats = plats;
    }


}
