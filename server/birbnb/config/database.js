import mongoose from "mongoose";

export class MongoDBClient {
    static async connect() {
        try {
            const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/birbnb';
            const conn = await mongoose.connect(connectionString, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
            console.log(`MongoDB is connected: ${conn.connection.host}`);
        } catch (error) {
            console.error(`Error: ${error.message}`);
            process.exit(1);
        }
    }
}