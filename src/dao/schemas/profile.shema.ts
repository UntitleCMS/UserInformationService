import { Schema } from "mongoose";

export const ProfileSchema = new Schema({
  userId: String,
  displayName: String,
  shortBio: String,
  location: String,
});