import dotenv from "dotenv";
dotenv.config({ path: "./.env" }); // Force it to look at the root directory

import connectDb from "./db/index.js"
import { app } from "./app.js"


const PORT = process.env.PORT || 8000

connectDb()
.then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    })
})
.catch(() => {
    console.log("MONGO db Connection failed!!!")
})