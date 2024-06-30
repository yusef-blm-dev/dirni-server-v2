import User from "../models/User.js";
import Task from "../models/Task.js";
import asyncHandler from "express-async-handler";

export const getTasksByUser = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const page = parseInt(req.query.page) || 1;
  const pageSize = 4;
  const { status, orderBy, orderDirection } = req.query;

  if (!id) {
    console.error("No user id provided.");
    return res.status(400).json({ message: "No user id provided." });
  }

  const user = await User.findById(id);
  if (!user) {
    console.error("User not found.");
    return res.status(400).json({ message: "User not found." });
  }

  let query = { user: user._id };

  if (status) {
    query.status = status;
  }

  const sort = orderBy
    ? {
        [orderBy]: orderDirection === "asc" ? 1 : -1,
      }
    : {};

  try {
    const tasks = await Task.find(query)
      .sort(sort)
      .limit(pageSize)
      .skip((page - 1) * pageSize);

    const taskCount = await Task.countDocuments(query);

    if (!tasks.length) {
      console.warn("No tasks found.");
      return res.status(200).json({ tasks: [], taskCount: 0 });
    }

    res.status(200).json({ tasks, taskCount });
  } catch (error) {
    console.error("Internal server error:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

export const createTask = asyncHandler(async (req, res) => {
  const { user, title, description, priority, status, due } = req.body;

  const task = await Task.create({
    user,
    title,
    description,
    priority,
    status,
    due,
  });
  if (!task) {
    res.status(400).json({ message: "Task not created." });
  }
  res.status(201).json(task);
});

export const getTask = asyncHandler(async (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.status(400).json({ message: "No task id provided." });
  }
  const task = await Task.findById(id);
  if (!task) {
    res.status(400).json({ message: "Task not found." });
  }
  res.status(200).json(task);
});

export const updateTask = asyncHandler(async (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.status(400).json({ message: "No task id provided." });
  }
  const task = await Task.findById(id);
  if (!task) {
    res.status(400).json({ message: "Task not found." });
  }
  const { user, title, description, priority, status, due } = req.body;
  task.user = user;
  task.title = title;
  task.description = description;
  task.priority = priority;
  task.status = status;
  task.due = due;
  await task.save();
  res.status(200).json(task);
});

export const deleteTask = asyncHandler(async (req, res) => {
  console.log("im here");
  const id = req.params.id;
  console.log(id);
  if (!id) {
    return res.status(400).json({ message: "No task id provided." });
  }

  const task = await Task.findById(id);
  if (!task) {
    return res.status(404).json({ message: "Task not found." });
  }
  const data = await task.deleteOne();
  console.log(data);
  res.status(200).json({ message: "Task deleted." });
});
