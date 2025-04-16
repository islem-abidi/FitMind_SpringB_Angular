import { Component, OnInit } from '@angular/core';
import { DossierMedicalService } from 'src/app/services/gestionNutrition/dossier-medical.service';

@Component({
  selector: 'app-admin-dossiers',
  templateUrl: './admin-dossiers.component.html',
  styleUrls: ['./admin-dossiers.component.css']
})
export class AdminDossiersComponent implements OnInit {
  dossiersActifs: any[] = [];
  dossiersArchives: any[] = [];
  loading = false;
  activeTab: string = 'actifs';
  searchTerm: string = '';

  constructor(private dossierService: DossierMedicalService) {}

  ngOnInit(): void {
    this.loadDossiers();
  }

  loadDossiers(): void {
    this.loading = true;
    
    this.dossierService.getAllDossiers().subscribe({
      next: (actifs) => {
        this.dossiersActifs = actifs;
        this.loadArchives();
      },
      error: (err) => {
        console.error('Erreur chargement dossiers actifs:', err);
        this.loading = false;
      }
    });
  }

  loadArchives(): void {
    this.dossierService.getArchivedDossiers().subscribe({
      next: (archives) => {
        this.dossiersArchives = archives;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur chargement archives:', err);
        this.loading = false;
      }
    });
  }

  archiveDossier(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir archiver ce dossier ?')) {
      this.dossierService.archiveDossier(id).subscribe({
        next: () => {
          this.loadDossiers();
          this.activeTab = 'actifs';
        },
        error: (err) => {
          console.error('Erreur lors de l\'archivage:', err);
          alert('Erreur lors de l\'archivage: ' + (err.error?.message || err.message));
        }
      });
    }
  }

  restoreDossier(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir restaurer ce dossier ?')) {
      this.dossierService.restoreDossier(id).subscribe({
        next: () => {
          this.loadDossiers();
          this.activeTab = 'archives';
        },
        error: (err) => alert('Erreur: ' + (err.error?.message || err.message))
      });
    }
  }

  switchTab(tab: string): void {
    this.activeTab = tab;
    this.searchTerm = '';
  }

  get filteredActifs() {
    return this.dossiersActifs.filter(dossier => 
      dossier.maladies.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      dossier.objectifSante.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      dossier.traitements.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      (dossier.groupeSanguin && dossier.groupeSanguin.toLowerCase().includes(this.searchTerm.toLowerCase())) ||
      (dossier.allergies && dossier.allergies.toLowerCase().includes(this.searchTerm.toLowerCase()))
    );
  }

  get filteredArchives() {
    return this.dossiersArchives.filter(dossier => 
      dossier.maladies.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      dossier.objectifSante.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      dossier.traitements.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      (dossier.groupeSanguin && dossier.groupeSanguin.toLowerCase().includes(this.searchTerm.toLowerCase())) ||
      (dossier.allergies && dossier.allergies.toLowerCase().includes(this.searchTerm.toLowerCase()))
    );
  }
}