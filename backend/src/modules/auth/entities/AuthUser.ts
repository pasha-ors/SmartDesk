import {UserBase} from "../../../core/entities/UserBase";

export interface AuthUser extends UserBase {
    password: string;
    isActivated: boolean;
    activationLink: string;
    createdAt: Date;
}