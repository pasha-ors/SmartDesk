import {UserBase} from "../../../core/entities/UserBase";


export interface User extends UserBase {
    role: 'user' | 'admin';
    avatarUrl?: string | null;
    updatedAt: Date;
}