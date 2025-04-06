import {ITokenRepository} from "../interfaces/ITokenRepository";
import pool from "../../../core/db/pgClient";
import {Token} from "../entities/Token";

export class TokenRepository implements ITokenRepository {
    async findByUserId(userId: number): Promise<Token | null> {
        const result = await pool.query(`
            SELECT user_id as "userId", refresh_token as "refreshToken" FROM tokens WHERE user_id = $1
        `, [userId]);

        return result.rows[0] || null;
    }

    async remove(token: string): Promise<void> {
        await pool.query(
            `DELETE FROM tokens WHERE refresh_token = $1`,
            [token]
        );
    }

    async removeAllByUserId(userId: number): Promise<void> {
        await pool.query(
            `DELETE FROM tokens WHERE user_id = $1`,
            [userId]
        );
    }

    async create(token: Token): Promise<Token> {
        const result = await pool.query(
            `INSERT INTO tokens (user_id, refresh_token)
       VALUES ($1, $2) RETURNING user_id as "userId", refresh_token as "refreshToken"`,
            [token.userId, token.refreshToken]
        );

        return result.rows[0];
    }

    async save(token: Token): Promise<Token> {
        const result = await pool.query(
            `UPDATE tokens
             SET refresh_token = $1
             WHERE user_id = $2
             RETURNING user_id as "userId", refresh_token as "refreshToken"`,
            [token.refreshToken, token.userId]
        );

        return result.rows[0];
    }

}