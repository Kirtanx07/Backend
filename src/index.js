import dotenv from "dotenv"
import express from "express"
import connectDb from "./db/index.js"

dotenv.config()

const app = express()

connectDb()

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
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
