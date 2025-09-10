import { Router } from "express";
import {loginRouter, logoutRouter } from "../../controllers/auth";

const router = Router();
loginRouter(router);
logoutRouter(router);

export default router;