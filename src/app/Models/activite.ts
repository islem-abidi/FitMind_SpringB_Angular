import { SeanceSport } from "./SeanceSport";
import { User } from "./user";

export interface Activite {
  id: number;
  nomActivite: string;
  description?: string;
  image?: string;
  statutActivite: StatutActivite;
  user?: User[]; // Liste d'utilisateurs
  seance_sports?: SeanceSport[]; // Liste de séances
  nbReservationsSemaine?: number; // Optionnel


}

export enum StatutActivite {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',

}
