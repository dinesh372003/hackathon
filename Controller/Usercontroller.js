const mongoose=require("mongoose");
const passport=require("passport");
const bcrypt=require("bcryptjs")
const User=require("../Schema/Userschema");


const register=(req,res)=>
{
    let flag=0;
    let {fname,lname,email,password,repassword}=req.body;
    if(password.length<8)
    {
        flag++;        
        req.flash("error","Please enter a Strong Password");
    }
    else if(password!=repassword)
    {
        flag++;
        req.flash("error","Password does not match");
    }
    User.find()
    .then(result=>
    {
        result.forEach(function(users)
        {
            if(users.email==email)
            {
                flag++;
                req.flash("error","Email Id already exists");
                email="";
            }
        })
        if(flag==0)
        {
            const users=new User;
            users.fname=fname;
            if(lname.length>0){users.lname=lname;}
            users.email=email;
            bcrypt.genSalt(10,(err,salt)=>{
                bcrypt.hash(password,salt,(err,hash)=>
                {
                    if(err){console.log(err);}  
                    users.password=hash; 
                    users.save()
                    .then(result=>
                        {
                            req.flash("success","You have successfully Registered");
                            res.redirect("/users/login");
                        })
                    .catch(err=>console.log(err));
                })
            });
        }
        else
        {
            res.render("register",{fname:fname,lname:lname,email:email});
        }
    })
    .catch(err=>console.log(err));
};


const login= (req, res, next) => 
{
    passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
    failureFlash: true
    })(req, res, next);
}


module.exports={
register,
login,
};