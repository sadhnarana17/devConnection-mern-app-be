import { Router } from "express";
import connectionsRouter from "./connections";
import feedsRouter from "./feed";

const router = Router();
connectionsRouter(router);
feedsRouter(router);

export default router;