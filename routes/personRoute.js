const express = require("express");
const router = express.Router();
const Person = require("../models/Person");


router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newPerson = new Person(data);
    const savedPerson = await newPerson.save();
    console.log("Data saved");
    res.status(200).json(savedPerson);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const data = await Person.find();
    console.log("data fetched");
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


router.get("/:workType", async (req, res) => {
  try {
    const workType = req.params.workType;
    if (workType == "chef" || workType == "manager" || workType == "waiter") {
      const data = await Person.find({ work: workType });
      res.status(200).json(data);
    } else {
      res.status(404).json({ error: "Invalid Path" });
      console.log("error 404");
    }
  } catch (error) {
    res.status(500).json({ error: "Invalid" });
  }
});

router.put('/:id' , async (req , res)=>{
  try{
    const personId = req.params.id;
    const updatePersonData = req.body;
    const response = await Person.findByIdAndUpdate(personId , updatePersonData,{
      new : true,
      runValidators : true
    })
    if(!response){
      return res.status(404).json({err : "Person not found"})
    }
    console.log("data fetch ")    
    res.status(500).json(response)

  }catch(err){
    res.status(500).json({err: "Invalid Data"})
  }
})


router.delete('/:id', async (req,res)=>{
  try {
    const personId = req.params.id;
    const response = await Person.findByIdAndDelete(personId);
    if(!response){
      return res.status(404).json({err : "Person not found"})
    }
    res.status(200).json({message : 'message deleted successfully'})
  } catch (error) {
    console.log(error)
    res.status(500).json({error : "Invalid Path"})
  }
})

module.exports = router;