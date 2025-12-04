import { error } from "console";
import mongoose from "mongoose";
import Error from "next/error";


type ConnectionObject = {
    isConnected?: number
}

const connection: ConnectionObject = {

}

async function dbConnect(): Promise<void>{
    //this is to check if we have a connection alr established
    if(connection.isConnected){
        console.log("Already connected to database");
        return;
    }

    try {
        // checking if the mongodb has ha URI
        if(!process.env.MONGODB_URI){
            throw new Error("Missing MONGODB_URI env varible");
        }

        //connect to the db
       const db = await mongoose.connect(process.env.MONGODB_URI || '')
        
       //updating the connection state
       connection.isConnected = db.connections[0].
       readyState;
       

       console.log("DB connected Successfulyy");
    } catch (error) {

        console.error("Database connection failed", error);

        throw new Error("Database Connection failled");
        
    }

}
export default dbConnect;