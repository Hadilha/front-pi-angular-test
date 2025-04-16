// src/app/program-content/models/program-content.model.ts

export interface ProgramContent {
    contentId: number;
    title: string;
    contentType: string;
    contentDesc: string;
    mediaLink: string;
    programId: number; // Associer à un coaching program
    version: number;
  }
  