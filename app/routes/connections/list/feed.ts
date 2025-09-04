import { Router } from "express";

const feedsRouter = (router: Router) => {
    router.get('/connections/feed', async (req, res) => {
        // Logic to get connection feed
        res.status(200).send({ message: 'Connection feed' });
    });
}

export default feedsRouter;