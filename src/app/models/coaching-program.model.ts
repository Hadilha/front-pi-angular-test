// coaching-program.model.ts

import { ProgramContent } from '../models/content-program.model';

// Interface représentant un programme de coaching
export interface CoachingProgram {
  programId: number; // Identifiant du programme
  coachId: number; // Identifiant du coach
  title: string; // Titre du programme
  description: string; // Description du programme
  startDate: Date; // Date de début du programme
  endDate: Date; // Date de fin du programme
  participants: any; // Nombre de participants
  contents?: ProgramContent[]; // Liste des contenus associés au programme (optionnel)
  
  
}

// Interface représentant un formulaire de création/modification d'un programme de coaching
export interface CoachingProgramForm {
  title: string; // Titre du programme
  description: string; // Description du programme
  startDate: Date; // Date de début (format YYYY-MM-DD)
  endDate: Date;   // Date de fin (format YYYY-MM-DD)
}
