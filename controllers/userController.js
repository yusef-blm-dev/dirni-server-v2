import User from "../models/User.js";
import Task from "../models/Task.js";
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";

export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password").lean();
  if (!users?.length) {
    return res.status(404).json({ message: "No users found" });
  }
  res.status(200).json(users);
});
export const getUserById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({ message: "Invalid request" });
  }
  const user = await User.findById(id).select("-password").exec();
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.status(200).json(user);
});
export const createUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  const userExist = await User.findOne({ email }).lean().exec();
  if (userExist) {
    return res.status(400).json({ message: "User already exists" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ username, email, password: hashedPassword });
  if (user) {
    res.status(201).json({ message: "User created successfully" });
  } else {
    res.status(400).json({ message: "Failed to create user" });
  }
});
export const updateUser = asyncHandler(async (req, res) => {
  const { id, username, email, password, avatar } = req.body;

  if (!id || !username || !email) {
    return res
      .status(400)
      .json({ message: "Please provide id, username, and email" });
  }

  const user = await User.findById(id).exec();
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const userByEmail = await User.findOne({ email }).exec();
  if (userByEmail && userByEmail._id.toString() !== id) {
    return res.status(400).json({ message: "Email already in use" });
  }

  if (password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
  }

  user.username = username;
  user.email = email;
  user.avatar = avatar;

  await user.save();

  res
    .status(200)
    .json({ message: `${user.username} updated successfully`, user });
});
export const deleteUser = asyncHandler(async (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).json({ message: "Invalid request" });
  }
  const user = await User.findOne({ _id: id }).exec();

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  const deletedUser = await user.deleteOne();

  res.status(200).json({
    message: `User with username ${user.username} deleted successfully`,
  });
});
