import { Router } from "express";
import { authGuard } from "../../guard/auth.guard";
import { getFollowersEndpoint } from "./get-followers";
import { getFolloweesEndpoint } from "./get-followees";
import { followEndpoint } from "./follow";
import { unfollowEndpoint } from "./unfollow";
import { getFollowEndpoint } from "./get-follow";

const router = Router();

router.get("/:userId", getFollowEndpoint);
router.get("/:userId/followers", getFollowersEndpoint);
router.get("/:userId/followees", getFolloweesEndpoint);
router.post("/:userId/follow", authGuard, followEndpoint);
router.delete("/:userId/unfollow", authGuard, unfollowEndpoint);

export default router;
