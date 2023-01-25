import { NextFunction, Request, Response } from "express";

import { decodeToken } from "./lib/auth";
import { JwtPayload } from "jsonwebtoken";

export const authTokenMiddleware = (
  req: Request & { user?: JwtPayload },
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer <token>

  if (token == null) return res.status(401).end();

  const payload = decodeToken(token);
  if (payload == null) return res.status(401).end();

  if (!req.url.includes(`/users/${payload.userId}`)) {
    res.status(401).end();
  }

  req.user = payload as JwtPayload;

  next();
};
