const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const PORT =8000
const  {MONGO_URL}  = process.env;

if (!MONGO_URL) {
    console.error("Missing MONGO_URL environment variable");
    process.exit(1);
  }

const app =express()


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