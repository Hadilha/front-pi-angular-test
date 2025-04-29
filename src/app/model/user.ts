export class User {
    id: number;// You might want to create a Calendar interface if needed

    constructor(data: any = {}) {
        this.id = data.userId || 0;
    }

    // For compatibility with the Java getName() method
    
}