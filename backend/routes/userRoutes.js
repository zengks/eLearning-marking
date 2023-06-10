import express from "express";

import protect from "../middleware/protectMiddleware.js";
import {
    registerUser,
    loginUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getAllStudents
} from '../controllers/userController.js';

const userRoutes = express.Router();

// '/auth/users/' path is connected to this file.
userRoutes.post('/', registerUser);
userRoutes.post('/login', loginUser);
userRoutes.post('/logout', logoutUser);
userRoutes
    .route('/profile')
    .get(protect, getUserProfile)

userRoutes.route('/students').get(protect, getAllStudents)

export default userRoutes;