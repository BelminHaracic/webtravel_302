export interface User {
    _id: string;
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    role: string;
    active: boolean;
    bookedDestinations: string[]; 
}
