import express from "express";
import { addImage } from "../controllers/cloudinary.js";
import verifyJWT from "../middleware/verifyJWT.js";

const router = express.Router();
router.post("/upload", verifyJWT, addImage);
export default router;
