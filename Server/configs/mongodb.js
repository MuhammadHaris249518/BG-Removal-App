import mongoose from 'mongoose';
const connectDB=async()=>{
    mongoose.connection.on('connected',()=>{
        console.log("Database connected");
    })
    mongoose.connect(`${process.env.MONGODB_URI}/hxbg`)
}
export default connectDB