export interface User {
    id?: number;
    name?: string;
    surname?: string;
    role?: string;
    email?: string;
    password?: string;
    passwordVerify?: string;
    serialNumber?: string;
}

export interface UserLogin {
    email: string;
    password: string;
}
