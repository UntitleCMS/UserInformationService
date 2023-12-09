import { Request, Response } from "express";
import { addFollowRelation } from "../../repositories/follow.repository";

export async function followEndpoint(req: Request, res: Response) {
  console.log(`New relation: ${req.query.sub} follows ${req.params.userId}`);

  const sub = req.query.sub as string;
  const userId = req.params.userId;
  if (sub !== userId) {
    follow(sub, userId)
      .then((data) => res.json(data))
      .catch((err) => res.status(409).send(err));
  } else {
    res.status(400).send({
      error: "Bad Request",
      msg: "Follower cannot self-follow",
    });
  }
}

async function follow(followerId: string, followeeId: string) {
  return await addFollowRelation(followerId, followeeId);
}
