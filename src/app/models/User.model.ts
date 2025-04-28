// src/app/models/user.model.ts

export interface User {
    user_id: number;
    fullName: string;
    email: string;
    role: string; // Utilise une énumération si tu en as une (comme 'COACH', 'PATIENT', etc.)
  }
  