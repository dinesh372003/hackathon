const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const presentationSchema=new Schema(
{
    name:
    {
        type:String,
        required:true,
    },
    user:
    {
        type:String,
        required:true,
    },
    content:
    {
        type:Object,
    }
},{timestamps:true});
const presentation=mongoose.model("presentation",presentationSchema);
module.exports=presentation;