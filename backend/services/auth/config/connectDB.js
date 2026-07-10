import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URL);
        console.log("database connected successfully 🎉");
    
    } catch (error) {
        console.log("Error in connecting to database😭");
        
    }
    
}

export default connectDB;