import express from "express";
import dotenv from 'dotenv';

import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const app = express();

const port = process.env.PORT || 5000;

app.use('/', (req, res) => {
    res.send('Server is ready')
});

app.listen(port, () => console.log(`Server started on port ${port}`));