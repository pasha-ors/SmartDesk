import {UserBase} from "../../../core/entities/UserBase";

/*
    id: number;
    email: string;
    name: string;
*/

export interface User extends UserBase {
    role: 'user' | 'admin';
    avatarUrl?: string | null;
    updatedAt: Date;
}