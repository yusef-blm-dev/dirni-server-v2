import express from "express";
import {
  getTasksByUser,
  getTask,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js";
import verifyJWT from "../middleware/verifyJWT.js";

const router = express.Router();
router.use(verifyJWT);

router.get("/user/:id", getTasksByUser);
router.get("/:id", getTask);
router.patch("/:id", updateTask);
router.post("/create", createTask);
router.delete("/:id", deleteTask);

export default router;
