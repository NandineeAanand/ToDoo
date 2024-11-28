//endpoints responsible for frontend talking to backend
const express=require("express");
//creating a router -function in express
const router=express.Router();
const {getConnectedClient}= require("./database");
const {ObjectId}=require("mongodb");


const getCollection=()=>{
    const client =getConnectedClient();
    const collection=client.db("todoosdb").collection("todoos");
    return collection;
}//in mongoDB tables are called collections

//GET /todoos
router.get("/todoos", async (req,res)=>{
    const collection=getCollection();
    const todoos=await collection.find({}).toArray();

    res.status(200).json(todoos);
});

//POST /todoos
router.post("/todoos", async (req,res)=>{
    const collection=getCollection();
    let  {todoo}=req.body;
    
    if(!todoo) {
        return res.status(400).json({mssg: "Error No ToDoo found."});
    }
    todoo=(typeof todoo ==="string" )?todoo:JSON.stringify(todoo);
    const newTodoo=await collection.insertOne({todoo,status:false});
    res.status(201).json({ todoo, status:false, _id: newTodoo.insertedId});//201-creation of something
});

//DELETE /todoos
router.delete("/todoos/:id", async(req,res)=>{
    const collection=getCollection();
    const _id=new ObjectId(req.params.id);

    const deletedTodoo=await collection.deleteOne({ _id});
    res.status(200).json({mssg:"DELETE REQUEST TO /api/todoos/:id"});
});

//PUT /todoos
router.put("/todoos/:id", async (req,res)=>{
    const collection=getCollection();
    const _id=new ObjectId(req.params.id);

    const { status }=req.body;

    if(typeof status!=="boolean"){
        return res.status(400).json({mssg: "Invalid Status"});
    }
    const updateTodoo=await collection.updateOne({_id},{$set: {status: !status}});
    res.status(200).json({updateTodoo});
});

module.exports =router;