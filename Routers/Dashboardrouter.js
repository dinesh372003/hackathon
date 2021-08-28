const express=require("express");
const router=express.Router();
const dashcont=require("../Controller/Dashboardcontroller");
router.get("/",dashcont.dashboard);
router.get("/newclass",(req,res)=>
{
    res.render("newclass",{User:req.user,title:"New Class"});
});
router.get("/joinclass",(req,res)=>
{
    res.render("joinclass",{User:req.user,title:"Join Class"});
});
router.post("/newclass",dashcont.newclass);
module.exports=router;