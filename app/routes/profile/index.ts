import { Router } from "express";
import profileDataRouter from "./profileData";

const router = Router();
profileDataRouter(router);

export default router;