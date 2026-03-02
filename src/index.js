import dotenv from "dotenv"
import express from "express"
import connectDb from "./db/index.js"

dotenv.config()

const PORT = process.env.PORT || 5000
const app = express()

connectDb()
.then(() => {
    app.listen(PORT, () => {
       console.log(`Server running on port ${PORT}`)

    })
})

.catch((err) => {
    console.log("MONGO db Connection failed!!!");
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
