import { Request, Response } from "express";
import { getFolloweesOfUser } from "../../repositories/follow.repository";

export async function getFolloweesEndpoint(req: Request, res: Response) {
  console.log(`Get Followees from user ID ${req.params.userId}`);

  getFollowees(req.params.userId)
    .then((data) => res.json(data))
    .catch((err) => res.status(404).send(err));
}

async function getFollowees(userId: string) {
  return await getFolloweesOfUser(userId);
}
