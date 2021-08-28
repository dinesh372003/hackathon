const express=require("express");
const router=express.Router();
const dashcont=require("../Controller/Dashboardcontroller");
const presentation=require("../Schema/Presentationschema")
router.get("/",dashcont.dashboard);
router.get("/new",(req,res)=>
{
    res.render("newpresentation",{User:req.user,title:"New Presentation"});
});
router.post("/new",dashcont.newpresentation);
router.get("/:id",(req,res)=>
{
    const id=req.params.id;
    presentation.findById(id)
    .then(result=>
        {    
        res.render("ppt",{presentation:result,User:req.user});
        })
    .catch(err=>console.log(err));
})
router.post("/:id/save",(req,res)=>
{
    const id=req.params.id;
    presentation.findOneAndUpdate(
        {
            _id:id
        },
        {
            $addToSet:
            {
                content:
                {
                    "Head":req.body.head,
                    "Body":req.body.body,
                }        
            },
            $inc:
            {
                slideno:1,
            }
        })
    .then(result=>res.redirect(("/"+id)))
    .catch(err=>console.log(err));
})
module.exports=router;