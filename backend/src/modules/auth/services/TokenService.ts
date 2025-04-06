import {ITokenService} from "../interfaces/ITokenService";
import jwt from 'jsonwebtoken';
import {TokenDto} from "../dto/TokenDto";
import {ITokenRepository} from "../interfaces/ITokenRepository";
import {UserTokenDto} from "../dto/UserTokenDto";
import {Token} from "../entities/Token";


export class TokenService implements ITokenService {

    constructor(
        private readonly tokenRepo: ITokenRepository
    ) {}

    generateToken(payload: UserTokenDto): TokenDto {
        const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN!, {expiresIn: '30m'});
        const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET!, {expiresIn: "30d"});

        return {
            accessToken,
            refreshToken
        };
    }

    async saveToken(token: Token): Promise<Token> {
        const tokenData = await this.tokenRepo.findByUserId(token.userId);

        if(tokenData) {
            tokenData.refreshToken = token.refreshToken;
            return await this.tokenRepo.save(tokenData);
        }

        return await this.tokenRepo.create(token);
    }

}