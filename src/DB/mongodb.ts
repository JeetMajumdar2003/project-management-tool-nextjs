import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

interface MongooseCache {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
}

declare global {
    var mongoose: MongooseCache;
}

let cached: MongooseCache = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

async function connectToDatabase() {
    if (cached.conn) {
        console.log("MONGODB is already connected.");
        return cached.conn;
    }

    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => {
            console.log("MONGODB Connected Successfully!!!");
            return mongoose;
        }).catch((error) => {
            console.error("MONGODB Connection Error: ", error);
            throw error;
        });
    }

    try {
        cached.conn = await cached.promise;
    } catch (error) {
        console.error("MONGODB Connection Error, Please make sure DB is up and running: ", error);
        process.exit(1); // Exit the process if MongoDB connection fails
    }

    return cached.conn;
}

export default connectToDatabase;

// or
// import mongoose from "mongoose";

// let isConnected = false; // Track the connection status

// export async function connect() {
//     if (isConnected) {
//         console.log("MONGODB is already connected.");
//         return;
//     }

//     try {
//         const connection = await mongoose.connect(process.env.MONGO_URI!);

//         isConnected = !!connection.connections[0].readyState; // Connection status

//         if (isConnected) {
//             console.log("MONGODB Connected Successfully!!!.");
//         }
//     } catch (error) {
//         console.log("MONGODB Connection Error, Please make sure DB is up and running: " + error);
//         process.exit(1); // Exit the process if MongoDB connection fails
//     }

//     mongoose.connection.on('error', (error) => {
//         console.error("MONGODB Connection Error: ", error);
//     });
// }