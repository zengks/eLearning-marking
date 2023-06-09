import express from "express";
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";

import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import assignmentRoutes from "./routes/assignmentRoutes.js";

dotenv.config();

connectDB();

const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use('/auth/users', userRoutes);
app.use('/users/students', assignmentRoutes);

app.listen(port, () => console.log(`Server started on port ${port}`));