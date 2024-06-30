import express from "express";
const router = express.Router();
import {
  // getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";
import verifyJWT from "../middleware/verifyJWT.js";
router.use(verifyJWT);

// router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.post("/", createUser);
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
