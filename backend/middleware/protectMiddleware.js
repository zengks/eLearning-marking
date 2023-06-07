import jwt from 'jsonwebtoken';
import expressAsyncHandler from 'express-async-handler';

import User from '../models/userModel.js';

const protect = expressAsyncHandler(async (req, res, next) => {
    const token = req.cookies.jwt;

    if (token) {
        try {
            // extract user id from encoded jwt token
            const jwt_decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(jwt_decoded.userId).select('-password');
            next();
        } catch (error) {
            res.status(401)
            throw new Error('Something wrong with the token found.')
        }
    } else {
        res.status(401);
        throw new Error('Unauthorized. No token found.')
    }
})

export default protect;