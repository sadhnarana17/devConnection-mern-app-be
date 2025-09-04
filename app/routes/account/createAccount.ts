import { Router } from "express";

const createAccountRouter = (router: Router) => {
    router.post('/createAccount', async (req, res) => {
        // Logic to create an account
        res.status(201).send({ message: 'Account created successfully' });
    });
}
export default createAccountRouter;