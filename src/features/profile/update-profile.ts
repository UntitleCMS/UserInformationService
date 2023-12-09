import { Request, Response } from "express";
import { updateProfileById } from "../../repositories/profile.repository";
import { IUpdateProfile } from "../../models/profile.interface";

export async function updateProfileEndpoint(req: Request, res: Response) {
  if (req.query.sub && req.query.sub) {
    updateProfile(req.query.sub as string, req.body)
      .then((data) => res.json(data))
      .catch((err) => res.status(404).send(err));

    console.log(`Update profile with user ID ${req.params.userId}`);
  } else
    res.status(403).send({
      error: "Access Denied",
      msg: "You don't have permission to edit this comment",
    });
}

async function updateProfile(userId: string, updatingProfile: IUpdateProfile) {
  return await updateProfileById(userId, updatingProfile);
}
