import JWT from 'jsonwebtoken';

import dotenv from 'dotenv';
dotenv.config();

export const requireSignIn = async (req, res, next) => {
    try {
        const decode = JWT.verify(
            req.headers.authorization,
            process.env.JWT_SECRET
        );
        console.log("Decoded User: ", decode);
        req.user = decode;
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            error: "Unauthorized access"
        });
    }
}