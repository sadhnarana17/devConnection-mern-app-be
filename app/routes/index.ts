import { Router } from "express";
import accountRoutes from "./account";
import authRoutes from "./auth";
import profieRoutes from "./profile";
import connectionRoutes from "./connections";

const router = Router();

router.use('/account', accountRoutes);
router.use('/connections', connectionRoutes);
router.use('/profile', profieRoutes);
router.use('/auth', authRoutes);

export default router;