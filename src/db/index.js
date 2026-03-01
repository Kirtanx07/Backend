import { Mongoose } from "mongoose";
import { DB_NAME } from "../constants";

const connectDb = async() => {
    try {
        const connectInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`\n MongoDB connected !! DB HOST: $ {connectionInstance.connection.host}`);

    } catch (error) {
        console.error("MONGODB connection ERROR:",error);
        process.exit(1)}
}

export default connectDb