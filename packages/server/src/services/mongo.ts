import mongoose from "mongoose";
import dotenv from "dotenv";

mongoose.set("debug", true);
dotenv.config();

function getMongoURI(dbname: string) {
    let connection_string = `mongodb://localhost:27017/${dbname}`;
    const { MONGO_USER, MONGO_PWD, MONGO_CLUSTER } = process.env

    if (MONGO_USER && MONGO_PWD && MONGO_CLUSTER) {
        console.log(
            "Connecting to MongoDB at",
            `mongodb+srv://${MONGO_USER}:<password>@${MONGO_CLUSTER}/${dbname}`
        );
        connection_string = `mongodb+srv://${MONGO_USER}:${MONGO_PWD}@${MONGO_CLUSTER}/?retryWrites=true&w=majority&appName=LoL`;
    } else {
        console.log("Connecting to MongoDB at ", connection_string);
    }
    return connection_string;
}

export function connect(dbname: string) {
    mongoose
        .connect(getMongoURI(dbname))
        .then(() => console.log(`Successfully connected to MongoDB database: ${dbname}`))
        .catch((error) => console.log(error));
}