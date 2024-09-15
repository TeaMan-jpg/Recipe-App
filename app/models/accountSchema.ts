import mongoose,{Schema} from "mongoose";

const accountSchema = new Schema(
    {
        email:String,
        password:String,
        image:String
    },
    {
        timestamps:true
    }
)

const Topic = mongoose.models.Account || mongoose.model("Account",accountSchema)

export default Topic