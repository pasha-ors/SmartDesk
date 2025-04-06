import { RegisterDto } from "../dto/RegisterDto";
import { LoginDto } from "../dto/LoginDto";
import {Token} from "../entities/Token";
import {TokenDto} from "../dto/TokenDto";

export interface IAuthService {
    register(dto: RegisterDto): Promise<TokenDto>;
    login(dto: LoginDto): Promise<TokenDto>;
    refresh(refreshToken: string): Promise<Token>;
    logout(refreshToken: string): Promise<void>;
}