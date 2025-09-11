import { Router, Request as RequestType, Response } from "express";
import { authMiddleware } from "../../../middleware/auth";
import User from "../../../models/user";
import Request from "../../../models/request";

interface RequestParams extends RequestType {
    user: InstanceType<typeof User>;
    query: {
        page?: string;
    };    
}

export const feedsRouter = (router: Router) => {
    router.get('/connections/feed', authMiddleware, async (req: RequestParams, res: Response) => {
        try {
            const loggedInUserId = req.user._id;
            const page = parseInt(req.query.page as string) || 1; // Default to page 1
            const limit = 10; // 10 records per page
            const skip = (page - 1) * limit;

            // Fetch users who are already connected or reviewed
            const excludedUserIds = await Request.find({
                $or: [
                    { fromUserId: loggedInUserId },
                    { toUserId: loggedInUserId }
                ],
                status: { $in: ["interested", "ignored", "accepted", "rejected"] }
            }).distinct("toUserId");

            // Add the logged-in user to the exclusion list
            excludedUserIds.push(loggedInUserId as typeof excludedUserIds[0]);

            // Fetch users excluding the logged-in user and already reviewed/connected users
            const users = await User.find({ _id: { $nin: excludedUserIds } })
                .skip(skip)
                .limit(limit);

            res.status(200).send({ 
                message: "Connection feed", 
                users, 
                page, 
                limit 
            });
        } catch (error) {
            res.status(500).send({ message: "Internal server error", error: error.message });
        }
    });
};
