export class User {
    userId: number;// You might want to create a Calendar interface if needed

    constructor(data: any = {}) {
        this.userId = data.userId || 0;
    }

    // For compatibility with the Java getName() method
    
}