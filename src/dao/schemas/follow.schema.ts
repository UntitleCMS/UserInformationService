import { Schema } from "mongoose";

export const FollowSchema = new Schema({
  followerId: String,
  followeeId: String,
});
