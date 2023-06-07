import expressAsyncHandler from "express-async-handler";

import User from "../models/userModel.js";

// @desc register a new user
// route POST /auth/users
// @access Public
const registerUser = expressAsyncHandler(async (req, res) => {

    const { firstName, lastName, email, password, isAdmin } = req.body;

    const userExisted = await User.findOne({ email });
    if (userExisted) {
        res.status(400);
        throw new Error('User already exists');
    }

    const user = await User.create({
        firstName,
        lastName,
        email,
        password,
        isAdmin,
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            isAdmin: user.isAdmin,
        })
    } else {
        res.status(400);
        throw new Error("Invalid user data");
    }
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