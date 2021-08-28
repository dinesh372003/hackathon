const express=require("express");
const app=express();
const ejs=require("ejs");
const mongoose=require("mongoose");
const User=require("./Schema/Userschema");
const passport=require("passport");
require("./passport")(passport);   
const {ensureAuthenticated}=require("./auth.js");
const flash=require("flash");
const router=require("./Routers/userrouter");
const routers=require("./Routers/Dashboardrouter");

require("dotenv").config();
const{PORT,MONGODB_USERNAME,MONGODB_PASSWORD}=process.env;

const session=require("express-session");
app.use(express.urlencoded({extended:true}));
app.use(express.static("Styles"));

const database="mongodb+srv://"+MONGODB_USERNAME+":"+MONGODB_PASSWORD+"@hackathon.xbxas.mongodb.net/Hackathon?retryWrites=true&w=majority";
mongoose.connect(database,{useNewUrlParser:true,useUnifiedTopology:true})
    .then(result=>
    {
        app.listen(PORT);
        console.log("Listening on Port "+PORT);
    })
    .catch((err)=>console.log(err))
    

app.use(session({
    secret:"secret",
    resave:true,
    saveUninitialized:true
    }));
    
    app.use(passport.initialize());
    app.use(passport.session());
    
    app.use(flash());
    
    app.set("view engine","ejs");
    

app.use("/users",router);
app.use("/",ensureAuthenticated,routers);
