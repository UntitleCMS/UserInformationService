import mongoose from "mongoose";
import { FollowSchema } from "./schemas/follow.schema";

export const FollowModel = mongoose.model("follows", FollowSchema);
