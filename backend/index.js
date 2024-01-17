const express = require("express");
const mongoose = require("mongoose");
const UserModel = require("./models/user.model")
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
      const token = jwt.sign({ id: saved._id},process.env.JWT_SECRET)
      return res.cookie('token',token,{httponly: true,expires: new  Date(Date.now() + 24* 60 * 60 + 1000)}).status(200).json(saved.username)
    }
    else {
      console.log(user.password)
      console.log(saved.password)
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