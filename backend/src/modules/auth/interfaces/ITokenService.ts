import {TokenDto} from "../dto/TokenDto";
import {Token} from "../entities/Token";
import {UserTokenDto} from "../dto/UserTokenDto";

export interface ITokenService {
    generateToken(payload: UserTokenDto): TokenDto;
    saveToken(token: Token): Promise<Token>;
}