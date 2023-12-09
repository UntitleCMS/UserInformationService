import { Request, Response } from "express";
import { removeFollowRelation } from "../../repositories/follow.repository";

export async function unfollowEndpoint(req: Request, res: Response) {
  console.log(
    `Remove relation: ${req.query.sub} unfollows ${req.params.userId}`
  );

  unfollow(req.query.sub as string, req.params.userId)
    .then((data) => res.json(data))
    .catch((err) => res.status(404).send(err));
}

async function unfollow(followerId: string, followeeId: string) {
  return await removeFollowRelation(followerId, followeeId);
}
