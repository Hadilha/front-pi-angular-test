export interface UserActivity {
  id: number;
  userId: number;
  username: string;
  mood: string;
  date: string;
  intensity: number; // Added based on error
  notes: string;     // Added based on error
  timestamp: string; // Added based on error
  groupIds: number[];// Added based on error
}