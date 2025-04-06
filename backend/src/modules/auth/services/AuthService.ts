import {IAuthRepository} from "../interfaces/IAuthRepository";
import {IAuthService} from "../interfaces/IAuthService";
import {LoginDto} from "../dto/LoginDto";
import {Token} from "../entities/Token";
import {RegisterDto} from "../dto/RegisterDto";
import {ITokenService} from "../interfaces/ITokenService";
import {AppError} from "../../../core/error/AppError";
import {hashPassword, comparePassword} from "../../../core/utils/hash";
import { v4 as uuidv4 } from "uuid";
import {AuthUser} from "../entities/AuthUser";
import {TokenDto} from "../dto/TokenDto";
import {ValidationError} from "../../../core/error/ValidationError";
import {InternalError} from "../../../core/error/InternalError";
import {NotFoundError} from "../../../core/error/NotFoundError";

export class AuthService implements IAuthService {
    constructor(
        private readonly authRepo: IAuthRepository,
        private readonly tokenService: ITokenService,
    ) {}

    async login(dto: LoginDto): Promise<TokenDto> {
        try{
            const user = await this.authRepo.findByEmail(dto.email);
            if (!user) {
                throw new ValidationError("User don't exist");
            }

            const isValidPassword = await comparePassword(dto.password, user.password);

            if (!isValidPassword) {
                throw new ValidationError("Invalid Password");
            }

            const tokens = this.tokenService.generateToken({
                id: user.id,
                email: user.email,
                name: user.name
            })

            await this.tokenService.saveToken({
                userId: user.id,
                refreshToken: tokens.refreshToken
            });

            return tokens;

        }catch(error){
            if(error instanceof AppError){
                throw error;
            }

            console.error("Login error:", error);
            throw new InternalError("Something went wrong during login");
        }
    }

    logout(refreshToken: string): Promise<void> {
        return Promise.resolve(undefined);
    }

    refresh(refreshToken: string): Promise<Token> {
        return Promise.resolve(undefined);
    }

    async register(dto: RegisterDto): Promise<TokenDto> {
        try {
            const existingUser = await this.authRepo.findByEmail(dto.email);

            if (existingUser) {
                throw new ValidationError("User with this email already exists");
            }

            const hashedPassword = await hashPassword(dto.password);
            const activationLink = uuidv4();

            const newUser: AuthUser = await this.authRepo.createUser({
                email: dto.email,
                name: dto.name,
                password: hashedPassword,
                activationLink: activationLink
            });

            const tokens = this.tokenService.generateToken({
                id: newUser.id,
                email: newUser.email,
                name: dto.name,
            })

            await this.tokenService.saveToken({
                userId: newUser.id,
                refreshToken: tokens.refreshToken
            });

            return tokens;
        }catch(error) {
            if (error instanceof AppError) {
                throw error;
            }

            console.error("Register error:", error);
            throw new InternalError("Something went wrong during registration");
        }
    }


}