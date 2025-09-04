import { Router } from "express";

const logoutRouter = (router: Router) => {
    router.post('/logout', async (req, res) => {
        // Logic to log out user
        res.status(200).send({ message: 'Logout successful' });
    });
}

export default logoutRouter;