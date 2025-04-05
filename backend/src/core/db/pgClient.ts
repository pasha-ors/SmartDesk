import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
})

pool
    .query('SELECT NOW()')
    .then((res) => {
        console.log(`PostgreSQL connected: ${res.rows[0].now}`);
    })
    .catch((err) => {
        console.error('❌ PostgreSQL connection failed:');
        console.error(err.message);
    });

export default pool;