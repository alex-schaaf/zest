import { NextFunction, Request, Response } from "express";

import { decodeToken } from "./lib/auth";

export const authTokenMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token } = req.cookies;

  if (!token) {
    console.debug("Unauthorized: No token found in cookie");
    return res.status(401).end();
  }

  const payload = decodeToken(token);

  if (payload == null) {
    console.debug("Unauthorized: Token is invalid");
    return res.status(401).end();
  }

  if (req.url !== "/users" && !req.url.includes(`/users/${payload.userId}`)) {
    console.debug("Unauthorized: trying to access route of other user");
    res.status(401).end();
  }

  next();
};
