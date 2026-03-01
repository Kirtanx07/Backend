import mongoose, { Mongoose } from "mongoose";
import { DB_NAME } from "./constants";
import express from 'express'
import connectDb from "./db";

connectDb()

const app = express()


//async approch to be done
/*
function connectDb(){
    try {
         mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on('error',() => {
            console.log("ERROR:",error);
            throw error
        })

         app.listen(process.env.PORT ,() => {
            console.log(`app is listening on port ${process.env.PORT}`);
            throw error
        })
        
    } catch (error) {
        console.error("ERROR:",error)
        
    }
}

connectDb()

*/
