import dotenv from 'dotenv';
dotenv.config();

import { createApp } from './core/app';

const PORT = process.env.PORT || 4000;
const app = createApp();

const start = async () => {
    try{
        app.listen(PORT, () => {
            console.log(`SmartDesk backend running at http://localhost:${PORT}`);
        });
    }catch(error){
        console.error(error);
    }
}

start().then(r => {
    console.log(`SmartDesk backend running without errors`);
});