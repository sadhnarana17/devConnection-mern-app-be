import { Router } from "express";
import createAccountRouter from "./createAccount";

const router = Router();
createAccountRouter(router);
export default router;