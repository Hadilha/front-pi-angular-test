import { Mood } from './mood.model';
import { User } from './user.model';


export class Journal {
    id?: number;
    title: string = '';
    content: string = '';
    mood: Mood = Mood.Happy;  // Use enum type here with a default value
    entryDate: Date = new Date();
    //favorite: boolean = false;

}
