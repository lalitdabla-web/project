import mongoose from "mongoose";
const connectdb = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MONGODB CONNECTED");
    }catch(error){
        console.log(error);
        process.exit(1);
    }
};

export default connectdb;

