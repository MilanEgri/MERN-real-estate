const express = require("express");
const mongoose = require("mongoose");
const UserModel = require("./models/user.model");
const ListingModel = require("./models/listing.model");
const bcrypt = require("bcrypt");
const multer = require("multer");
const fs = require("fs");
const upload = multer({ dest: "uploads/" });
const jwt = require("jsonwebtoken");
require("dotenv").config();
const PORT = 8000;
const { MONGO_URL } = process.env;

if (!MONGO_URL) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1);
}

const app = express();
app.use(express.json());
app.get("/listings/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const listing = await ListingModel.findOne({ _id: id });
    if (!listing) {
      return res.status(501).json("listing not exist");
    }
      const firstImageFilePath = listing.imagerUrls[0];
      const fullPath = `${__dirname}/uploads/${firstImageFilePath}`;
      const fileData = fs.readFileSync(fullPath, "base64");
      listing.imagerUrls = {
        filename: firstImageFilePath,
        data: fileData.toString("base64"),
    }
    return res.status(200).json(listing);
  } catch (err) {
    return res.status(500).json(err.message);
  }
});
app.get("/userlistings/:userid", async (req, res) => {
  const id = req.params.userid;
  try {
    const listings = await ListingModel.find({ useRef: id });
    if (!listings) {
      return res.status(501).json("listing not exist");
    } else {
      listings.forEach((e) => {
        const firstImageFilePath = e.imagerUrls[0];
        const fullPath = `${__dirname}/uploads/${firstImageFilePath}`;
        const fileData = fs.readFileSync(fullPath, "base64");
        e.imagerUrls = {
          filename: firstImageFilePath,
          data: fileData.toString("base64"),
        };
      });
    }
    return res.status(200).json(listings);
  } catch (err) {
    return res.status(500).json(err.message);
  }
});
app.get("/listings", async (req, res) => {
  try {
    let listings = await ListingModel.find({});
    if (!listings) {
      return res.status(501).json("listings not exist");
    } else {
      listings.forEach((e) => {
        const firstImageFilePath = e.imagerUrls[0];
        const fullPath = `${__dirname}/uploads/${firstImageFilePath}`;
        const fileData = fs.readFileSync(fullPath, "base64");
        e.imagerUrls = {
          filename: firstImageFilePath,
          data: fileData.toString("base64"),
        };
      });
    }
    return res.status(200).json(listings);
  } catch (err) {
    return res.status(500).json(err.message);
  }
});
app.get("/search/:key", async (req, res) => {
  const key = req.params.key;
  try {
    let listings = await ListingModel.find({
      $or: [
        { name: { $regex: key, $options: "i" } },
        { description: { $regex: key, $options: "i" } },
      ],
    });
    if (!listings) {
      return res.status(501).json("listings not exist");
    } else {
      listings.forEach((e) => {
        const firstImageFilePath = e.imagerUrls[0];
        const fullPath = `${__dirname}/uploads/${firstImageFilePath}`;
        const fileData = fs.readFileSync(fullPath, "base64");
        e.imagerUrls = {
          filename: firstImageFilePath,
          data: fileData.toString("base64"),
        };
      });
    }
    return res.status(200).json(listings);
  } catch (err) {
    return res.status(500).json(err.message);
  }
});
app.get("/user/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await UserModel.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json("User not ound");
    }
    return res.status(200).json(user.username);
  } catch (err) {
    return res.status(500).json(err.message);
  }
});
app.patch("/user/:id", async (req, res) => {
  const userId = req.params.id;
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  try {
    const user = await UserModel.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json("User not found");
    } else {
      if (username.length > 2) {
        const usernameIfExist = await UserModel.findOne({ username: username });
        if (usernameIfExist) {
          if (usernameIfExist._id != user._id)
            return res.status(404).json("error");
        }
      }
      if (email.length > 3) {
        const emailIfExist = await UserModel.findOne({ email: email });
        if (emailIfExist) {
          if (emailIfExist._id != user._id)
            return res.status(404).json("error");
        }
      }
      if (username.length > 2) {
        await UserModel.findOneAndUpdate(
          { _id: user._id },
          { username: username }
        );
      }
      if (email.length > 3) {
        await UserModel.findOneAndUpdate({ _id: user._id }, { email: email });
      }
      if (password.length > 3) {
        const newPassword = await bcrypt.hashSync(password, 12);
        await UserModel.findOneAndUpdate(
          { _id: user._id },
          { password: newPassword }
        );
      }
    }
    return res.status(200).json("succes");
  } catch (err) {
    return res.status(500).json(err.message);
  }
});
app.delete("/user/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await UserModel.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json("User not found");
    } else {
      const listings = await ListingModel.find({ useRef: user._id });
      if (!listings) {
        await UserModel.findByIdAndDelete(userId);
        return res.status(200).json(user.username);
      } else {
        await ListingModel.deleteMany({ useRef: user._id });
        await UserModel.findByIdAndDelete(userId);
        return res.status(200).json(user.username);
      }
    }
    return res.status(200).json(user.username);
  } catch (err) {
    return res.status(500).json(err.message);
  }
});
app.post("/create", upload.array("image", 12), async (req, res) => {
  let listing = req.body;
  listing.imagerUrls = new Array();

  req.files.forEach((e) => {
    listing.imagerUrls.push(e.filename);
  });
  try {
    const saved = await ListingModel.create(listing);
    return res.status(201).json(saved._id);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err.message);
  }
});
app.post("/signup", async (req, res) => {
  const newUser = req.body;
  newUser.password = bcrypt.hashSync(newUser.password, 12);
  try {
    const saved = await UserModel.create(newUser);
    return res.status(201).json("succes");
  } catch (err) {
    return res.status(500).json(err.message);
  }
});
app.post("/signin", async (req, res) => {
  const user = req.body;
  try {
    const saved = await UserModel.findOne({ username: user.username });
    if (!saved) {
      return res.status(401).json("invalid crendentials");
    }
    if (bcrypt.compareSync(user.password, saved.password)) {
      const token = jwt.sign({ id: saved._id }, process.env.JWT_SECRET);
      return res
        .cookie("token", token, {
          httponly: true,
          expires: new Date(Date.now() + 24 * 60 * 60 + 1000),
        })
        .status(200)
        .json({ id: saved._id });
    } else {
      return res.status(401).json("invalid crendentials");
    }
  } catch (err) {
    return res.status(500).json(err.message);
  }
});

const main = async () => {
  await mongoose.connect(MONGO_URL);

  app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
  });
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
