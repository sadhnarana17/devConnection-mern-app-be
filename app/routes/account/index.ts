import { Router } from "express";
import { createAccountRouter } from "../../controllers/account";

const router = Router();
createAccountRouter(router);
export default router;