import { Request, Response } from "express";
import { getProfilesByName } from "../../repositories/profile.repository";

export async function getProfilesByNameEndpoint(req: Request, res: Response) {
  const keyword = req.query.keyword as string;
  getProfiles(keyword)
    .then((data) => res.json(data))
    .catch((err) => res.status(404).send(err));
}

async function getProfiles(keyword: string) {
  return await getProfilesByName(keyword);
}
