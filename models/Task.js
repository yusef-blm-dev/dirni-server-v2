import mongoose from "mongoose";

const taskShema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    require: true,
  },
  priority: {
    type: String,
    enum: ["low", "medium", "high"],
  },
  due: {
    type: Date,
    require: true,
  },
  status: {
    type: String,
    enum: ["open", "done"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});
const Task = mongoose.model("Task", taskShema);
export default Task;
