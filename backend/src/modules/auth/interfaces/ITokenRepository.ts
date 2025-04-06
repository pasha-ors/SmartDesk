
import {Token} from "../entities/Token";
import {TokenDto} from "../dto/TokenDto";

export interface ITokenRepository {
    save(token: Token): Promise<Token>;
    create(token: Token): Promise<Token>;
    remove(token: string): Promise<void>;
    findByUserId(userId: number): Promise<Token | null>;
    removeAllByUserId(userId: number): Promise<void>;
}