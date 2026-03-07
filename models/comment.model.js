import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const commentSchema = new Schema({
    content:{
        type:String,
        required: true
    },
    Video:{
        type: Schema.Types.ObjectId,
        ref:"Video"
    },
    owner:{
        type: Schema.Types.ObjectId,
        ref: "User"
      
    },
},{timestamps:true})


commentSchemaSchema.plugin(mongooseAggregatePaginate)
export const Video = mongoose.model("Video",videoSchema)