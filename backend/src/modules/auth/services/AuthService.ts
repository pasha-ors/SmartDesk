import {IAuthRepository} from "../interfaces/IAuthRepository";
import {IAuthService} from "../interfaces/IAuthService";
import {LoginDto} from "../dto/LoginDto";
import {Token} from "../entities/Token";
import {RegisterDto} from "../dto/RegisterDto";

export class AuthService implements IAuthService {
    constructor(
        private readonly authRepository: IAuthRepository,
    ) {}

    login(dto: LoginDto): Promise<Token> {
        return Promise.resolve(undefined);
    }

    logout(refreshToken: string): Promise<void> {
        return Promise.resolve(undefined);
    }

    refresh(refreshToken: string): Promise<Token> {
        return Promise.resolve(undefined);
    }

    register(dto: RegisterDto): Promise<Token> {
        return Promise.resolve(undefined);
    }


}