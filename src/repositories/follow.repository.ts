import { FollowModel } from "../dao/follow.model";
import { IFollow, IFollowees, IFollowers } from "../models/follow.interface";

export async function addFollowRelation(
  followerId: string,
  followeeId: string
) {
  const existRelation = await FollowModel.findOne<IFollow>({
    followerId,
    followeeId,
  });

  if (existRelation) throw new Error("This relation have already been");
  return await FollowModel.create<IFollow>({ followerId, followeeId });
}

export async function removeFollowRelation(
  followerId: string,
  followeeId: string
) {
  return await FollowModel.deleteMany(
    { followerId, followeeId },
    { new: true }
  );
}

export async function getFollowersOfUser(userId: string) {
  const followers = await FollowModel.aggregate<IFollowers>([
    {
      $match: {
        followeeId: userId,
      },
    },
    {
      $group: {
        _id: "$followeeId",
        followerIds: {
          $push: "$followerId",
        },
      },
    },
    {
      $project: {
        followeeId: "$_id",
        followerIds: 1,
        _id: 0,
      },
    },
  ]);

  return followers[0] ?? { followeeId: userId, followerIds: [] };
}

export async function getFolloweesOfUser(userId: string) {
  const followees = await FollowModel.aggregate<IFollowees>([
    {
      $match: {
        followerId: userId,
      },
    },
    {
      $group: {
        _id: "$followerId",
        followeeIds: {
          $push: "$followeeId",
        },
      },
    },
    {
      $project: {
        followerId: "$_id",
        followeeIds: 1,
        _id: 0,
      },
    },
  ]);

  return followees[0] ?? { followerId: userId, followeeIds: [] };
}
