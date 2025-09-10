import { Router } from "express";
import User from "../../models/user";

export const loginRouter = (router: Router) => {
    router.post('/login', async (req, res) => {
        try {
            const { body: { email, password } } = req;
            const user = await User.findOne({ emailId: email });
            if (!user) {
                return res.status(401).send({ message: 'Invalid email or password' });
            }
            const isPasswordValid = await user.checkValidPassword(password);
            if (!isPasswordValid) {
                return res.status(401).send({ message: 'Invalid email or password' });
            }
            const token = await user.getJWT();
            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 7 * 24 * 60 * 60 * 1000,
            });

            res.status(200).send({ message: 'Login successful' });
        } catch (error) {
            res.status(500).send({ message: 'Internal server error', error: error.message });
        }
    });
}
