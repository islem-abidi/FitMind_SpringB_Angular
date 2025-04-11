
export enum TypeReclamation {
    Problème_Repas = 'Problème_Repas',
    Problème_Salle_Sport = 'Problème_Salle_Sport',
  }
  
  export enum StatutReclamation {
    En_Cours = 'En_Cours',
    Résolue = 'Résolue',
    Non_Résolue = 'Non_Résolue',
  }
  

export interface ReclamationRequest {
    typeReclamation: TypeReclamation;
    description: string;
    idUser?: number;
    dateReclamation?: Date;
    statut?: StatutReclamation;
    dateResolution?: Date;
  }

  export interface Reclamation {
    id: number;
    typeReclamation: TypeReclamation;
    description: string;
    dateReclamation: Date;
    statut: StatutReclamation;
    dateResolution?: Date;
    archived: boolean;
    user: {
      id: number;
      email: string;
      nom?: string;
      prenom?: string;
    };
  
  }