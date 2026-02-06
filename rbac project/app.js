import express from "express";
import authRoutes from "./routes/authroutes.js"
import userRoutes from "./routes/useroutes.js";
import connectdb from "./config/db.js";
import dotenv from "dotenv";

dotenv.config();

connectdb();

const app = express();
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

export default app;
