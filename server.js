import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDB } from "./config/dbConnect.js";
import userRouter from "./routes/userRouter.js";
import authRouter from "./routes/authRouter.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { corsOptions } from "./config/corsOptions.js";
import fileUpload from "express-fileupload";
import cldRouter from "./routes/cldRouter.js";
import taskRouter from "./routes/taskRouter.js";
dotenv.config;

const app = express();
const PORT = process.env.PORT || 3500;
connectDB();

app.use(express.json());
app.use(cookieParser());
app.use(fileUpload());
app.use(cors(corsOptions));

app.use("/api/users", userRouter);
app.use("/api/image", cldRouter);
app.use("/api/auth", authRouter);
app.use("/api/tasks", taskRouter);

app.get("/api", (req, res) => {
  res.status(200).json({ message: "Welcome to Taskly API" });
});

app.all("*", (req, res) => {
  res.status(404).json({
    message: "Not found",
  });
});

app.use(errorHandler);

app.listen(PORT, (req, res) =>
  console.log(`Server is running on port ${PORT}`)
);
