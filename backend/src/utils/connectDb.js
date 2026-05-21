import dns from 'node:dns';
dns.setDefaultResultOrder('ipv4first');
import mongoose from "mongoose";
export const connect = async ()=>{
    try {
        console.log("connecting...");
        const connection = await mongoose.connect(process.env.DATABASE_URL)
        console.log("Connected to the database...");
    } catch (error) {
        console.log("error in database connection : \n ", error)   
    }
}