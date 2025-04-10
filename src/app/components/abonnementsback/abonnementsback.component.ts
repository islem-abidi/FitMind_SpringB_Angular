
import { Component, OnInit } from '@angular/core';
import { AbonnementService } from '../../services/abonnement.service';

@Component({
  selector: 'app-abonnementsback',
  templateUrl: './abonnementsback.component.html',
  styleUrls: ['./abonnementsback.component.css']
})
export class AbonnementsbackComponent implements OnInit  {
abonnements: any[] = [];
  currentPage: number = 0;
  totalPages: number = 0;
  size: number = 5;
  sortBy: string = 'dateCreation';
  direction: string = 'asc';
  searchKeyword: string = '';
  showArchived = false;


  constructor(private abonnementService: AbonnementService) {}

  ngOnInit(): void {
    this.loadAbonnements();
  }

  loadAbonnements(): void {
    this.abonnementService.getPaged(this.currentPage, this.size, this.sortBy, this.direction).subscribe(response => {
      this.abonnements = response.content;
      this.totalPages = response.totalPages;
    });
  }

  changePage(page: number): void {
    this.currentPage = page;
    this.loadAbonnements();
  }

  /*changeSorting(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.sortBy = target.value;
    this.loadAbonnements();
  }*/
    changeSorting(event: Event): void {
      const target = event.target as HTMLSelectElement;
      this.sortBy = target.value;
    
      // Choisir la bonne fonction selon l'état
      this.showArchived ? this.loadArchivedAbonnements() : this.loadAbonnements();
    }
    

  /*toggleSortDirection(): void {
    this.direction = this.direction === 'asc' ? 'desc' : 'asc';
    this.loadAbonnements();
  }*/
    toggleSortDirection(): void {
      this.direction = this.direction === 'asc' ? 'desc' : 'asc';
    
      // Même logique : on recharge les données correctes
      this.showArchived ? this.loadArchivedAbonnements() : this.loadAbonnements();
    }
    

  archiver(id: number): void {
    this.abonnementService.archive(id).subscribe(() => this.loadAbonnements());
  }

  restaurer(id: number): void {
    this.abonnementService.restore(id).subscribe(() => this.loadAbonnements());
  }

  

/*search(): void {
  this.abonnementService.search(this.searchKeyword, this.currentPage, this.size, this.sortBy, this.direction)
    .subscribe(response => {
      this.abonnements = response.content;
      this.totalPages = response.totalPages;
    });
}*/
/*search(): void {
  if (this.searchKeyword.trim() === '') {
    // Si champ de recherche vide, recharger tous les abonnements
    this.loadAbonnements();
  } else {
    // Sinon faire recherche normale
    this.abonnementService.search(this.searchKeyword, this.currentPage, this.size, this.sortBy, this.direction)
      .subscribe(response => {
        this.abonnements = response.content;
        this.totalPages = response.totalPages;
      });
  }
}*/
search(): void {
  if (this.searchKeyword.trim() === '') {
    this.showArchived ? this.loadArchivedAbonnements() : this.loadAbonnements();
  } else {
    if (this.showArchived) {
      this.abonnementService.searchArchived(this.searchKeyword, this.currentPage, this.size, this.sortBy, this.direction)
        .subscribe(response => {
          this.abonnements = response.content;
          this.totalPages = response.totalPages;
        });
    } else {
      this.abonnementService.search(this.searchKeyword, this.currentPage, this.size, this.sortBy, this.direction)
        .subscribe(response => {
          this.abonnements = response.content;
          this.totalPages = response.totalPages;
        });
    }
  }
}

/*toggleArchivedView(): void {
  this.showArchived = !this.showArchived;
  if (this.showArchived) {
    this.abonnementService.getArchived().subscribe(data => this.abonnements = data);
  } else {
    this.loadAbonnements(); // recharge les abonnements normaux
  }
}*/
toggleArchivedView(): void {
  this.showArchived = !this.showArchived;
  this.searchKeyword = '';
  this.showArchived ? this.loadArchivedAbonnements() : this.loadAbonnements();
}

/*loadArchivedAbonnements(): void {
  this.abonnementService.getArchived().subscribe(data => {
    this.abonnements = data;
    this.totalPages = 1; // ou un nombre fictif pour désactiver la pagination si besoin
  });
}*/
loadArchivedAbonnements(): void {
  this.abonnementService.getArchivedPaged(this.currentPage, this.size, this.sortBy, this.direction).subscribe(response => {
    this.abonnements = response.content;
    this.totalPages = response.totalPages;
  });
}
refreshCurrentList(): void {
  this.searchKeyword.trim() === ''
    ? (this.showArchived ? this.loadArchivedAbonnements() : this.loadAbonnements())
    : this.search(); // garde la recherche si un mot clé est tapé
}


}
