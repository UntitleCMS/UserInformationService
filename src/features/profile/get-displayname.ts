import { Request, Response } from "express";
import { getDisplayNameByIds } from "../../repositories/profile.repository";

export async function getDisplayNameEndpoint(
  req: Request<{}, {}, {}, { uid: string | string[] }>,
  res: Response
) {
  const uid = req.query.uid;
  let result: string[];
  if (typeof uid === "string") {
    result = [uid];
  } else if (Array.isArray(uid)) {
    result = uid;
  } else {
    result = [];
  }

  getDisplayName(result)
    .then((data) => res.json(data))
    .catch((err) => res.status(404).send(err));
}

async function getDisplayName(userIds: string[]) {
  return await getDisplayNameByIds(userIds);
}
