import { Request, Response } from "express";
import { getFollowersOfUser } from "../../repositories/follow.repository";

export async function getFollowersEndpoint(req: Request, res: Response) {
  console.log(`Get Followers from user ID ${req.params.userId}`);

  getFollowers(req.params.userId)
    .then((data) => res.json(data))
    .catch((err) => res.status(404).send(err));
}

async function getFollowers(userId: string) {
  return await getFollowersOfUser(userId);
}
