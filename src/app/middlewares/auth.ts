import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import config from "../../config";
import { Secret } from "jsonwebtoken";
import AppError from "../error/AppError";
import { jwtHelpers } from "../utiles/jwtHelpers";

const auth = (...roles: string[]) => {
  return async (
    req: Request & { user?: any },
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader) {
        throw new AppError(StatusCodes.UNAUTHORIZED, "You are not authorized");
      }

      // Extract token, handling potential 'Bearer <token>' format
      const token = authHeader.startsWith("Bearer ")
        ? authHeader.split(" ")[1]
        : authHeader;

      if (!token) {
        throw new AppError(StatusCodes.UNAUTHORIZED, "You are not authorize");
      }

      const verifiedUser = jwtHelpers.verifyToken(
        token as string,
        config.jwt.jwt_secret as Secret,
      );
      req.user = verifiedUser;

      if (roles.length && !roles.includes(verifiedUser.role)) {
        throw Error("Forbidden!");
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};

export default auth;
