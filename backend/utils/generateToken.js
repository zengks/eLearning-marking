import jwt from 'jsonwebtoken';

const generateToken = (res, userId) => {

    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "7 days",
    });

    res.cookie('jwt', token, {
        // cookie only be used by the web server
        httpOnly: true,

        // requires https in production mode
        secure: process.env.NODE_ENV !== 'development',

        // expires in 7 days in milliseconds
        maxAge: 7 * 24 * 3600 * 1000,

        // some protection against cross-site request forgery attacks (CSRF)
        sameSite: 'strict'
    })
}

export default generateToken;