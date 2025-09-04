import { Router } from "express";
import connectionsRouter from "./list/connections";
import feedsRouter from "./list/feed";
import reviewRequestsRouter from "./requests/review";
import sendRequestRouter from "./requests/send";

const router = Router();
connectionsRouter(router);
feedsRouter(router);
reviewRequestsRouter(router);
sendRequestRouter(router);

export default router;