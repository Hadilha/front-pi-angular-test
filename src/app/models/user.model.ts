export interface User {
    id: number;
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    role: string;
    avatarUrl?: string;        // Optional
    accountStatus: string | null;
    lastSessionDate?: Date;    // Optional
    primaryCarePhysician?: string; // Optional
    nextAppointment?: Date;    // Optional
    birth?: Date;              // Optional
    contactNumber: string;
    specializations: string;
    experienceYears: string;
    profileVerified: boolean;
    workingHours: string;
    password: string;          // Optional, should be hashed in real applications


}
