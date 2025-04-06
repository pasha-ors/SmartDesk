import {IAuthRepository} from "../interfaces/IAuthRepository";
import {AuthUser} from "../entities/AuthUser";
import pool from "../../../core/db/pgClient";
import {RegisterDto} from "../dto/RegisterDto";

export class AuthRepository implements IAuthRepository {
    async createUser(user: RegisterDto): Promise<AuthUser> {
        const result = await pool.query(
            `INSERT INTO users (email, password, name, activation_link) 
             RETURNING *`,
            [user.email, user.password, user.name, user.activationLink]
        );

        return result.rows[0];
    }

    async findByEmail(email: string): Promise<AuthUser | null> {
        const result = await pool.query(
            `SELECT * FROM users WHERE email = $1`,
            [email]
        );

        return result.rows[0] || null;
    }

    async updateActivation(email: string, isActivated: boolean): Promise<void> {
        await pool.query(`
            UPDATE users SET is_activated = $1 WHERE email = $2
        `, [isActivated, email]);

    }
}