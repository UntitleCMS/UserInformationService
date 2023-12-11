import { Request, Response } from "express";
import { getFollow } from "../../repositories/follow.repository";

export async function getFollowEndpoint(req: Request, res: Response) {
  console.log(
    `Get Follow from user ID ${req.params.userId} of ${req.query.sub}`
  );

  getFollowBy((req.query.sub as string | null) || "passport", req.params.userId)
    .then((data) => res.json(data))
    .catch((err) => res.status(404).send(err));
}

async function getFollowBy(followerId: string, followeeId: string) {
  return await getFollow(followerId, followeeId);
}
