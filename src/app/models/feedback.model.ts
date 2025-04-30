export class Feedback {
  id: number; // Assurez-vous que la propriété id est définie
  comment: string;
  rating: number;
  diagnostic?: string;  // Propriété optionnelle pour le diagnostic

  constructor(id: number, comment: string, rating: number, diagnostic?: string) {
    this.id = id;
    this.comment = comment;
    this.rating = rating;
    this.diagnostic = diagnostic;
  }
}
