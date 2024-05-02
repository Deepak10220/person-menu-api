const express = require("express");
const router = express.Router();
const MenuItem = require("../models/MenuItem");

router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newMenuData = new MenuItem(data);
    const savedMenuItem = await newMenuData.save();
    console.log("data store successfuly");
    res.status(500).json(savedMenuItem);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const data = await MenuItem.find();
    console.log("Fetch Data");
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Given error" });
  }
});

router.get("/:tasteType", async (req, res) => {
  try {
    const tasteType = req.params.tasteType;
    if (tasteType == "sweet" || tasteType == "sour" || tasteType == "spicy") {
      const data = await MenuItem.find({ taste: tasteType });
      res.status(200).json(data);
    } else {
      res.status(404).json({ error: "Invalid Path" });
      console.log(error);
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
    console.log(error);
  }
});

router.put('/:id' , async (req , res)=>{
  try{
    const menuId = req.params.id;
    const updateMenuData = req.body;
    const response = await MenuItem.findByIdAndUpdate(menuId , updateMenuData,{
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
    const menuId = req.params.id;
    const response = await MenuItem.findByIdAndDelete(menuId);
    if(!response){
      return res.status(404).json({err : "ITEM NOT FOUND"})
    }
    res.status(200).json({message : 'item deleted successfully'})
  } catch (error) {
    console.log(error)
    res.status(500).json({error : "Invalid Path"})
  }
})

module.exports = router;
