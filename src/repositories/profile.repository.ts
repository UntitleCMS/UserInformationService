import { ProfileModel } from "../dao/profile.model";
import { IUpdateProfile } from "../models/profile.interface";

export async function getProfileById(userId: string) {
  return await ProfileModel.findOne({ userId });
}

export async function updateProfileById(
  userId: string,
  profile: IUpdateProfile
) {
  return await ProfileModel.findOneAndUpdate({ userId }, profile, {
    new: true,
    upsert: true,
  });
}
