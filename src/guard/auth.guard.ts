import { NextFunction, Request, Response } from "express";

export async function authGuard(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const sub = req.query.sub;
  if (!!sub) next();
  else
    res.status(401).send({
      error: "Unauthorized",
      msg: "You don't have permission to access this activity",
    });
}
