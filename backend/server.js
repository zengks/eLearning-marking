import express from "express";
import dotenv from 'dotenv';

import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

connectDB();

const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use('/auth/users', userRoutes)

app.use('/', (req, res) => {
    res.send('Server is ready')
});

app.listen(port, () => console.log(`Server started on port ${port}`));