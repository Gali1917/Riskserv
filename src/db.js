import mongoose from 'mongoose';
import { DB_MONGO } from './config/config.js';

export const connectDB = async() =>{
    try{
        mongoose.set("strictQuery", false);
        await mongoose.connect(DB_MONGO);
        console.log('Base de datos MongoDB conectada');
    }
    catch(error){
        console.log(error);
        process.exit(1);
    }
}
