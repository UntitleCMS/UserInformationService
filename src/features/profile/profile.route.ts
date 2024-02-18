import { Router } from "express";
import { authGuard } from "../../guard/auth.guard";
import { getProfileEndpoint } from "./get-profile";
import { updateProfileEndpoint } from "./update-profile";
import { getDisplayNameEndpoint } from "./get-displayname";
import { getProfilesByNameEndpoint } from "./get-profiles-bynames";

const router = Router();

router.get("/displayName", getDisplayNameEndpoint);
router.get("/search", getProfilesByNameEndpoint);
router.get("/:userId", getProfileEndpoint);
router.patch("/", authGuard, updateProfileEndpoint);

export default router;
