export enum Role
{
    Client = 'Client',
    Manager = "Manager",
    Admin = 'Admin'
}

export class User {
    key?: string | null;
    uid?: string | null;
    email?: string;
    displayName?: string;
    photoURL?: string;
    emailVerified?: boolean;
    role: Role;
    banned: boolean
}
