const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const usersSchema=new Schema(
{
    fname:
    {
        type:String,
        required:true,
    },
    lname:
    {
        type:String,
    },
    email:
    {
        type:String,
        required:true,
    },
    password:
    {
        type:String,
        required:true
    },
    classes:
    {
        type:[String],
    },
    classname:
    {
        type:[String],
    },
},{timestamps:true});
const user=mongoose.model("User",usersSchema);
module.exports=user;