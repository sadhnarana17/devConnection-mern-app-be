import { Router } from "express";
import loginRouter from "./login";
import logoutRouter from "./logout";

const router = Router();
loginRouter(router);
logoutRouter(router);

export default router;