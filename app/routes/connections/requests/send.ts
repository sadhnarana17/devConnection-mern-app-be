import { Router } from "express";

const sendRequestRouter = (router: Router) => {
    router.post('/connections/requests/:send', async (req, res) => {
        // Logic to send a connection request
        res.status(200).send({ message: 'Connection request sent successfully' });
    });
}

export default sendRequestRouter;