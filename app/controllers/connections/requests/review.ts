import { Router, Request as RequestType, Response } from "express";
import Request from "../../../models/request";
import User from "../../../models/user";
import { authMiddleware } from "../../../middleware/auth";

interface RequestParams extends RequestType {
    params: {
        review: 'accepted' | 'rejected';
        fromUserId: string;
    };
    user: InstanceType<typeof User>;
}

const REVIEW_REQUEST = ['accepted', 'rejected'];

export const reviewRequestsRouter = (router: Router) => {
    router.post('/connections/requests/:review/:', authMiddleware, async (req: RequestParams, res: Response) => {
        try {
         const toUserId = req.user._id;
         const {fromUserId, review} = req.params;

         if(!REVIEW_REQUEST.includes(req.params.review)){
            return res.status(400).send({message: 'Invalid value for :review parameter'});
         }
         if(toUserId === fromUserId){
            return res.status(400).send({message: 'Reviewer cannot accept it/\'s own request'});
         }
         const isRequestExistOrReviewed= Request.findOne({
            $or: [{fromUserId: fromUserId, toUserId: toUserId}, {fromUserId: toUserId, toUserId: fromUserId }],
            status: {$in: REVIEW_REQUEST}
         });

        if(isRequestExistOrReviewed){
            return res.status(400).send({message: 'Request already reviewed or no request found'});
        }
        await Request.findOneAndUpdate(
            {fromUserId: fromUserId, toUserId: toUserId},
            {status: review},
            {new: true}
        );
         return res.status(200).send({ message: 'Connection request reviewed successfully' });
        } catch (error) {
            return res.status(500).send({ message: 'Internal server error', error: error.message });
        }
    });
}
