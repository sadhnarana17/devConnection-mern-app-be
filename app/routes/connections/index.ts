import { Router } from "express";
import {connectionsRouter, feedsRouter} from "../../controllers/connections/list";
import { sendRequestRouter, reviewRequestsRouter } from "../../controllers/connections/requests";

const router = Router();
connectionsRouter(router);
feedsRouter(router);
reviewRequestsRouter(router);
sendRequestRouter(router);

export default router;