
import express from 'express';
import cors from "cors";
import cookieParser from "cookie-parser";

import { dbMiddleware } from "./src/middleware/index.js";
import {
  profileRoutes,
  userRoutes,
  projectRoutes,
  taskRoutes
} from "./src/routes/index.js";
import { PORT } from "./src/config/env.config.js";
import { connectDB } from "./src/config/db.config.js";
import morganConfig from "./src/config/morgan.config.js";



const app = express();

connectDB();

app.use(
  cors({
    origin: process.env.CLIENT_URL ||"http://localhost:5173",
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
);


app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "8kb" }));
app.use(cookieParser());

app.use(morganConfig);


app.get("/", (req, res) => res.send("Server ready"));

app.use("/api/user", userRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);

app.use(dbMiddleware);
app.listen(PORT, '0.0.0.0', () => console.log("Server Started at port : ", PORT));