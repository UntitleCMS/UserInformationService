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

export async function getDisplayNameByIds(userIds: string[]) {
  const profiles = await ProfileModel.find(
    { userId: { $in: userIds } },
    { _id: 0, userId: 1, displayName: 1 }
  );

  const profilesMap = new Map(
    profiles.map((profile) => [profile.userId, profile])
  );

  const result = userIds.map((userId) => ({
    userId,
    displayName:
      (profilesMap.get(userId) || {}).displayName || "user_unnamed",
  }));

  return result;
}
