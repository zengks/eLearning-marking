import expressAsyncHandler from "express-async-handler";

import User from "../models/userModel.js";

// @desc register a new user
// route POST /auth/users
// @access Public
const registerUser = expressAsyncHandler(async (req, res) => {
    res.status(201).json({
        message: 'Register user'
    })
});

// @desc log in an existing user
// route POST /auth/users/login
// @access Public
const loginUser = expressAsyncHandler(async (req, res) => {
    res.status(200).json({
        message: 'login user'
    })
});

// @desc logout the current user
// route POST /auth/users/logout
// @access Public
const logoutUser = expressAsyncHandler(async (req, res) => {
    res.status(200).json({
        message: 'user logged out'
    })
});

// @desc Get logged in user's profile
// route GET /auth/users/profile
// @access Private (requires a token)
const getUserProfile = expressAsyncHandler(async (req, res) => {
    res.status(200).json({
        message: 'get user profile'
    })
});

// @desc Update logged in user's profile
// route PUT /auth/users/profile
// @access Private (requires a token)
const updateUserProfile = expressAsyncHandler(async (req, res) => {
    res.status(200).json({
        message: 'update user profile'
    })
});

export {
    registerUser,
    loginUser,
    logoutUser,
    getUserProfile,
    updateUserProfile
}