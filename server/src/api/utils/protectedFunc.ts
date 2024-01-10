import { NextFunction, Request, Response } from "express";

export const protectedFunc = (
  func: (arg0: Request, arg1: Response) => Promise<void>,
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await func(req, res);
    } catch (err) {
      next(err);
    }
  };
};
