const Users=require("../Schema/Userschema");
const mongoose=require("mongoose");
const Presentation=require("../Schema/Presentationschema");
const dashboard=(req,res)=>
{
    res.render("dashboard",{User:req.user,title:"Dashboard"});
};

const newpresentation=(req,res)=>
{
   const presentations=new Presentation;
   presentations.name=req.body.pptname;
   presentations.user=req.user.email;
   presentations.slideno=0;
   presentations.save()
   .then((result)=>
    {
    Users.findOneAndUpdate(
        {
            _id:req.user._id,
        },
        {
            $addToSet:
            {
                presentationid:presentations.id,
                presentationname:presentations.name,
            },
        })
        .then(result=res.redirect("/"))
        .catch(err=>console.log(err));
    })
   .catch(err=>console.log(err)); 
};

module.exports={
    dashboard,
    newpresentation,
};