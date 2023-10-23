import User from "../models/usermodel.js";
import asyncHandler from "express-async-handler";
import generateToken from "../Utils/generateToken.js";

const userAuth = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");
  const CorrectPassword = await user.matchPassword(password);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else if (!CorrectPassword) {
    res.status(401);
    throw new Error("Invalid password");
  } else {
    res.status(401);
    throw new Error("Invalid email");
  }
});

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userexists = await User.findOne({ email });

  if (userexists) {
    res.status(404);
    throw new Error("User already exists");
  }
  const user = await User.create({
    name,
    email,
    password,
  });
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(404);
    throw new Error("User already exists");
  }
});

const getuserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const UpdateuserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }
    const UpdateUser = await user.save();

    res.json({
      _id: UpdateUser._id,
      name: UpdateUser.name,
      email: UpdateUser.email,
      isAdmin: UpdateUser.isAdmin,
      token: generateToken(UpdateUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export { userAuth, getuserProfile, registerUser, UpdateuserProfile };
