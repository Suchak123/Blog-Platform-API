import JWT from 'jsonwebtoken';

import dotenv from 'dotenv';
dotenv.config();

export const requireSignIn = async (req, res, next) => {
    try {

        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Authorization token missing' });
        }
        const decode = JWT.verify(
            token,
            process.env.JWT_SECRET
        );
        console.log("Decoded User: ", decode);
        req.user = decode;
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            error: error.message
        });
    }
}