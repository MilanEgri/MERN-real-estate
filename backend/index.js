const express = require("express");
const mongoose = require("mongoose");
const UserModel = require("./models/user.model")
const ListingModel = require("./models/listing.model")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require("dotenv").config();
const PORT = 8000
const { MONGO_URL } = process.env;

if (!MONGO_URL) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1);
}

const app = express()
app.use(express.json());
app.get("/listings/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const listing = await ListingModel.findOne({ "_id": id});
    if (!listing) {
      return res.status(501).json("listing not exist")
    }
    return res.status(200).json(listing);
  } catch (err) {
    return res.status(500).json(err.message)
  }
})
app.get("/listings", async (req, res) => {
  try {
    const listings = await ListingModel.find({});
    if (!listings) {
      return res.status(501).json("listings not exist")
    }
    return res.status(200).json(listings);
  } catch (err) {
    return res.status(500).json(err.message)
  }
})
app.get("/user/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await UserModel.findOne({ "_id": userId});
    if (!user) {
      return res.status(404).json("User not ound")
    }
    return res.status(200).json(user.username);
  } catch (err) {
    return res.status(500).json(err.message)
  }
})
app.delete("/user/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await UserModel.findOne({ "_id": userId});
    if (!user) {
      return res.status(404).json("User not found")
    }
    else{
      const listings = await ListingModel.find({ "useRef": user._id});
      if(!listings){
        await UserModel.findByIdAndDelete(userId);
        return res.status(200).json(user.username);
      }
      else{
        await ListingModel.deleteMany({ "useRef": user._id})
        await UserModel.findByIdAndDelete(userId);
        return res.status(200).json(user.username);
      }
    }
    return res.status(200).json(user.username);
  } catch (err) {
    return res.status(500).json(err.message)
  }
})
app.post("/create",async(req,res) =>{
  const listing = req.body;
  try {
    const saved = await ListingModel.create(listing);
    return res.status(201).json(saved._id);
  } catch (err) {
    console.log(err)
    return res.status(500).json(err.message)
  }
})
app.post("/signup", async (req, res) => {
  const newUser = req.body;
  newUser.password = bcrypt.hashSync(newUser.password, 12)
  try {
    const saved = await UserModel.create(newUser);
    return res.status(201).json("succes");
  } catch (err) {
    return res.status(500).json(err.message)
  }
});
app.post("/signin", async (req, res) => {
  const user = req.body;
  try {
    const saved = await UserModel.findOne({ "username": user.username });
    if (!saved) {
      return res.status(401).json("invalid crendentials")
    }
    if (bcrypt.compareSync(user.password, saved.password)) {
      const token = jwt.sign({ id: saved._id }, process.env.JWT_SECRET)
      return res.cookie('token', token, { httponly: true, expires: new Date(Date.now() + 24 * 60 * 60 + 1000) })
        .status(200).json({ 'id': saved._id, })
    }
    else {
      return res.status(401).json("invalid crendentials")
    }
  } catch (err) {
    return res.status(500).json(err.message)
  }
});

const main = async () => {
  await mongoose.connect(MONGO_URL);

  app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
  });
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});