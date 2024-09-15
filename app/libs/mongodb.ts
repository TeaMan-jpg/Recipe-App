import mongoose from "mongoose";
const MONGOURL:string = "mongodb://localhost:27017/Recipes"
const connectToDB = async () => {
    try {
       await mongoose.connect(MONGOURL)
        console.log("Connected")
    }
    catch(error){
        console.log(error)
    }
}

export default connectToDB