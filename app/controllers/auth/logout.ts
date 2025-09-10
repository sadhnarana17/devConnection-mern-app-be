import { Router } from "express";
import { authMiddleware } from "../../middleware/auth";

export const logoutRouter = (router: Router) => {
    router.post('/logout', authMiddleware, async (req, res) => {
        try {
            res.clearCookie('token', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
            });

            res.status(200).send({ message: 'Logout successful' });
        } catch (error) {
            res.status(500).send({ message: 'Internal server error', error: error.message });
        }
    });
}

