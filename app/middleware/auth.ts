import jwt from "jsonwebtoken";
import User from "../models/user";
import { Request, Response, NextFunction } from "express";

interface AuthenticatedRequest extends Request {
    user?: InstanceType<typeof User>;
}

export const authMiddleware = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).send({ message: "Unauthorized: No token provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded._id);

        if (!user) {
            return res.status(401).send({ message: "Unauthorized: Invalid token" });
        }

        req.user = user
        next();
    } catch (error) {
        res.status(401).send({ message: "Unauthorized", error: error.message });
    }
};
