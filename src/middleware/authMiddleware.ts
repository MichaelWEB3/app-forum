import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { AuthUser } from '../types/AuthUser';
import jwt from "jsonwebtoken";

const authMiddleware = (handler: NextApiHandler) => (
    req: NextApiRequest,
    res: NextApiResponse,

) => {
    const secret = process.env.NEXTAUTH_SECRET
    const token = req.headers.authorization?.replace('Bearer ', '');
    console.log(token)
    try {
        const decodedToken = jwt.verify(token as string, secret as string);
        const userId: AuthUser | any = decodedToken.sub;
        return handler(req, res);

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal server error" });
    }
};

export default authMiddleware;