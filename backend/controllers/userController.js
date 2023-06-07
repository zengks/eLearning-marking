import expressAsyncHandler from "express-async-handler";

import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

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
        console.log('Successfully registered.')
        generateToken(res, user._id);
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
    const { email, password } = req.body;
    const user = await User.findOne({ email })

    if (user && (await user.comparePassword(password))) {
        console.log('You have successfully logged in.')
        generateToken(res, user._id);
        res.status(200).json({
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            isAdmin: user.isAdmin,
        })
    } else {
        res.status(401);
        throw new Error('Invalid email or password')
    }
});

// @desc logout the current user
// route POST /auth/users/logout
// @access Public
const logoutUser = expressAsyncHandler(async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        expires: new Date(0),
    });

    console.log('You have successfully logged out.')

    res.status(200).json({
        message: 'logged out',
    })
});

// @desc Get logged in user's profile
// route GET /auth/users/profile
// @access Private (requires a token)
const getUserProfile = expressAsyncHandler(async (req, res) => {
    // a protect feature is used inside userRoutes file to prevent accessing user profile data without logging in first. Without verifying jsonwebtoken, no user profile information will be passed through.

    const userInfo = {
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        email: req.user.email,
        isAdmin: req.user.isAdmin,
    }

    res.status(200).json(userInfo);

});

// @desc Update logged in user's profile
// route PUT /auth/users/profile
// @access Private (requires a token)
const updateUserProfile = expressAsyncHandler(async (req, res) => {

    const user = await User.findById(req.user._id);

    if (user) {
        user.firstName = req.body.firstName || user.firstName;
        user.lastName = req.body.lastName || user.lastName;
        user.isAdmin = req.body.isAdmin || user.isAdmin;

        if (req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();

        res.status(200).json({
            _id: updatedUser._id,
            firstName: updatedUser.firstName,
            lastName: updatedUser.lastName,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
        })

    } else {
        res.status(404);
        throw new Error('User not found');
    }

});

export {
    registerUser,
    loginUser,
    logoutUser,
    getUserProfile,
    updateUserProfile
}