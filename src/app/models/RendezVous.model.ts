import { User } from 'src/app/models/user.model';

export interface RendezVous {
  idRendezVous: number;
  nutritioniste: User;
  etudiant: User;
  dateHeure: Date;
  duree: number;
  remarque: string;
  rappel: boolean;
  statut: string;
  archived: boolean;
}
