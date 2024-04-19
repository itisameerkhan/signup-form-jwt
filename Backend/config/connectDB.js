import mongoose from "mongoose";

const connectDB = async () => {
    const connectMongo = await mongoose.connect(process.env.MONGO_URI);
    console.log("DB connected successfully ", connectMongo.connect.name); 
};

export default connectDB;