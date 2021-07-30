const generateToken = require("../utils/generateToken");
const { genSalt, compare, hash } = require("bcryptjs");
const User = require("../models/userModel.js");
const asyncHandler = require("express-async-handler");

module.exports = {
  registerUser: asyncHandler(async (req, res) => {
    let { name, email, password, pic } = req.body;
    if (!email || !password || !name) {
      res.status(400);
      throw new Error("Please Fill all the feilds");
    }
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      res.status(400);
      throw new Error("An account with this email already exists.");
      //   next(error);
    }

    if (password.length < 5) {
      res.status(400);
      throw new Error("Password needs atleast 5 character");
    }
    const salt = await genSalt();
    const passwordHash = await hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: passwordHash,
      pic,
    });

    const savedUser = await newUser.save();

    if (savedUser) {
      res.status(201).json({
        _id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email,
        isAdmin: savedUser.isAdmin,
        pic: savedUser.pic,
        token: generateToken(savedUser._id),
      });
    } else {
      res.status(400);
      throw new Error("Something went wrong!!Try again later..");
    }
  }),

  loginUser: asyncHandler(async (req, res) => {
    let { email, password } = req.body;
    if (!email || !password) {
      res.status(400);
      throw new Error("Please Fill all the feilds");
    }
    const existingUser = await User.findOne({ email });
    if (existingUser && (await compare(password, existingUser.password))) {
      res.json({
        _id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
        isAdmin: existingUser.isAdmin,
        pic: existingUser.pic,
        token: generateToken(existingUser._id),
      });
    } else {
      res.status(401);
      throw new Error("Invalid Email or Password");
    }
  }),

  updateUser: asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.pic = req.body.pic || user.pic;
      if (req.body.password) {
        user.password = req.body.password;
      }

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        pic: updatedUser.pic,
        isAdmin: updatedUser.isAdmin,
        token: generateToken(updatedUser._id),
      });
    } else {
      res.status(404);
      throw new Error("User Not Found");
    }
  }),
};
