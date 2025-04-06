import {AuthUser} from "../entities/AuthUser";
import {RegisterDto} from "../dto/RegisterDto";

export interface IAuthRepository {
    findByEmail(email: string): Promise<AuthUser | null>;
    createUser(user: RegisterDto): Promise<AuthUser>;
    updateActivation(email: string, isActivated: boolean): Promise<void>;
}