import { Router, Request as RequestType, Response } from "express";
import { authMiddleware } from "../../../middleware/auth";
import Request from "../../../models/request";
import User from "../../../models/user";

interface RequestParams extends RequestType {
    params: {
        send: 'interested' | 'ignored';
        toUserId: string;
    };
    user: InstanceType<typeof User>;
}

const SEND_REQUEST = ["ignored", "interested"];

export const sendRequestRouter = (router: Router) => {
    router.post('/connections/requests/:send/:toUserId', authMiddleware, async (req: RequestParams, res: Response) => {
        try {
            const { send, toUserId } = req.params;
            const loggedInUserId = req.user._id;

            if (toUserId === loggedInUserId) {
                return res.status(400).send({ message: "Requester cannot be the logged-in user" });
            }

            // Validate that a request between fromUserId and toUserId exists
            const existingRequest = await Request.findOne({
                _$or: [{ fromUserId: loggedInUserId, toUserId }, { fromUserId: toUserId, toUserId: loggedInUserId }]}
            );
            if (existingRequest) {
                return res.status(404).send({ message: "Connection request already exist between the users" });
            }

            // Check if a record with the same fromUserId exists with ignored or accepted status
            if (existingRequest.status && SEND_REQUEST.includes(existingRequest.status)) {
                return res.status(400).send({ message: "A request with this fromUserId already exists with ignored or accepted status" });
            }

            // Validate the send parameter
            if (!SEND_REQUEST.includes(send)) {
                return res.status(400).send({ message: "Invalid value for :send parameter" });
            }

            // Create or update the request
            const request = await Request.findOneAndUpdate(
                { fromUserId: loggedInUserId, toUserId },
                { status: send },
                { upsert: true, new: true }
            );

            res.status(200).send({ message: "Request processed successfully", request });
        } catch (error) {
            res.status(500).send({ message: "Internal server error", error: error.message });
        }
    });
};

