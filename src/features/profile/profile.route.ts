import { Router } from "express";
import { authGuard } from "../../guard/auth.guard";
import { getProfileEndpoint } from "./get-profile";
import { updateProfileEndpoint } from "./update-profile";

const router = Router();

router.get("/:userId", getProfileEndpoint);
router.patch("/", authGuard, updateProfileEndpoint);

export default router;
