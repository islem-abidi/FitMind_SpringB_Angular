// src/app/models/user.model.ts
export interface Role {
    id_role?: number;
    roleType: 'Etudiant' | 'Admin' | 'Responsable_menu' | 'Coach' | 'Nutritionniste';
  }
  
  export interface User {
    idUser: number;
    nom?: string;
    prenom?: string;
    email?: string;
    dateNaissance?: Date;
    sexe?: 'MALE' | 'FEMALE';
    photoProfil?: string;
    numeroDeTelephone?: number;
    role?: Role;
    banned?: boolean;
    archived?: boolean;
    pointsFidelite?: number;
  }