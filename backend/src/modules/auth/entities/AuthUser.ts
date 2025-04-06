import {UserBase} from "../../../core/entities/UserBase";

/*
    id: number;
    email: string;
    name: string;
*/

export interface AuthUser extends UserBase {
    password: string;
    isActivated: boolean;
    activationLink: string;
    createdAt: Date;
}