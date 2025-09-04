import { Router } from "express";
import reviewRequestsRouter from "./review";
import sendRequestRouter from "./send";

const router = Router();
reviewRequestsRouter(router);
sendRequestRouter(router);

export default router;
