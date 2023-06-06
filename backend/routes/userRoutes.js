import express from "express";

import {
    registerUser,
    loginUser,
    logoutUser,
    getUserProfile,
    updateUserProfile
} from '../controllers/userController.js';

const userRoutes = express.Router();

// '/auth/users/' path is connected to this file.
userRoutes.post('/', registerUser);
userRoutes.post('/login', loginUser);
userRoutes.post('/logout', logoutUser);
userRoutes
    .route('/profile')
    .get(getUserProfile)
    .put(updateUserProfile)

export default userRoutes;