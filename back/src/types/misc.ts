import { NextFunction, Request, Response } from "express";

export type ErrorType = "BAD_REQUEST" | "NOT_FOUND" | "UNAUTHORIZED";
export type ApiErrorType = {
  statusCode: number;
  message: string;
  stack?: string;
};

// TYPE for middleware to handle errors
export type ErrorHandlerType = {
  error: ApiErrorType | Error;
  req: Request;
  res: Response;
  next: NextFunction;
};
