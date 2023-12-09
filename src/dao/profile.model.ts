import mongoose from "mongoose";
import { ProfileSchema } from "./schemas/profile.shema";

export const ProfileModel = mongoose.model("profiles", ProfileSchema);
