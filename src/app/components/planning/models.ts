export interface Disponibilite {
  jour: string;
  plageHoraire: string;
}

export interface Seance {
  jour: string;
  heure: string;
  type: string;
  duree: number;
  intensite: 'faible' | 'moyenne' | 'élevée';
}
