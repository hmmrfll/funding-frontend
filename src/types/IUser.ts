export interface IUser {
    id: string;
    fullName: string;
    avatarUrl: string;
    dateBirth: string;
    phone: string;
    company?: string;
    bonusCount: number;
    role: UserRole;
    userCode: string;
}

export type UserRole = 'user' | 'admin';

export type UserData = Omit<IUser, 'id' | 'bonusCount' | 'role' | 'userCode' | 'company'>;