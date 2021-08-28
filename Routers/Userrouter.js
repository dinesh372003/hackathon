const express=require("express");
const router=express.Router();
const UserController=require("../Controller/Usercontroller");
router.get("/register",(req,res)=>{res.render("register")});
router.get("/login",(req,res)=>{res.render("login")});
router.post("/register",UserController.register);
router.post("/login",UserController.login);
router.get("/logout",(req,res)=>{
    req.logout();
    req.flash("success","Successfully Logged Out");
    res.redirect("/users/login");})
module.exports=router;