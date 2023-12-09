import { Request, Response } from "express";
import { getProfileById } from "../../repositories/profile.repository";

export async function getProfileEndpoint(req: Request, res: Response) {
  console.log(`Get Profile with user ID ${req.params.userId}`);

  getProfile(req.params.userId)
    .then((data) => res.json(data))
    .catch((err) => res.status(404).send(err));
}

async function getProfile(userId: string) {
  return await getProfileById(userId);
}
