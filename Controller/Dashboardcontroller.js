const Users=require("../Schema/Userschema");
const mongoose=require("mongoose");

const dashboard=(req,res)=>
{
    res.render("dashboard",{User:req.user,title:"Dashboard"});
};

const newclass=(req,res)=>
{
    
};

module.exports={
    dashboard,
    newclass,
};