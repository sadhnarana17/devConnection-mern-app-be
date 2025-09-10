import { Router } from "express";

export const profileDataRouter = (router: Router) => {
    router.get('/getDetails', async (req, res) => {
        // Logic to fetch user profile data
        res.status(200).send({ message: 'User profile data' });
    });
}
