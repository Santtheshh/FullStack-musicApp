import mongoose from "mongoose";

const connectDB=async()=>{
    mongoose.connection.on('connected',()=>{
        console.log(`Mongoose connected`);
    })

    await mongoose.connect(`${process.env.MONGODB_URI}/music`)
}

export default connectDB;