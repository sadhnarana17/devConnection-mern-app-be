import { Router } from "express";
import { profileDataRouter } from "../../controllers/profile";

const router = Router();
profileDataRouter(router);

export default router;