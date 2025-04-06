import { RegisterDto } from "../dto/RegisterDto";
import { LoginDto } from "../dto/LoginDto";
import {Token} from "../entities/Token";

export interface IAuthService {
    register(dto: RegisterDto): Promise<Token>;
    login(dto: LoginDto): Promise<Token>;
    refresh(refreshToken: string): Promise<Token>;
    logout(refreshToken: string): Promise<void>;
}