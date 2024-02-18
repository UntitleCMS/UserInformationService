import { ProfileModel } from "../dao/profile.model";
import { IUpdateProfile } from "../models/profile.interface";

export async function getProfileById(userId: string) {
  const profile = await ProfileModel.aggregate([
    {
      $match: { userId },
    },
    {
      $lookup: {
        from: "follows",
        localField: "userId",
        foreignField: "followeeId",
        as: "follower",
      },
    },
    {
      $lookup: {
        from: "follows",
        localField: "userId",
        foreignField: "followerId",
        as: "followee",
      },
    },
    {
      $project: {
        followee: { $size: "$followee" },
        follower: { $size: "$follower" },
        shortBio: 1,
        displayName: 1,
        userId: 1,
      },
    },
  ]);
  return profile.length > 0 ? profile[0] : null;
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
    displayName: (profilesMap.get(userId) || {}).displayName || "user_unnamed",
  }));

  return result;
}

export async function getProfilesByName(
  name: string
  // offset: number,
  // limit: number
) {
  const startName = new RegExp("^" + name, "i");
  return await ProfileModel.find({ displayName: { $regex: startName } });
  // .limit(limit)
  // .skip((offset - 1) * limit);
}
