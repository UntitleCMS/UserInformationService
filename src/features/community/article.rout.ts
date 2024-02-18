import { Router } from "express";
import { articleEndpoint } from "./article";

const router = Router();

router.get("/articles", articleEndpoint);

export default router;
