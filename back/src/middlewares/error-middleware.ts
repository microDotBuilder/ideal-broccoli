import { ApiErrorType } from "../types/misc";
import ApiError from "../utils/api-error";
import { Request, Response, NextFunction } from "express";

// const errorHandler = (
//   error: ApiErrorType | Error,
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   // Check if the error is an instance of an ApiError class which extends native Error class
//   if (!(error instanceof ApiError)) {
//     // if not
//     // create a new ApiError instance to keep the consistency

//     // assign an appropriate status code
//     const statusCode = error.statusCode ? 400 : 500;

//     // set a message from native Error instance or a custom one
//     const message = error.message || "Something went wrong";
//     error = new ApiError(statusCode, message, error.stack);
//   }

//   // Now we are sure that the `error` variable will be an instance of ApiError class
//   const response = {
//     ...error,
//     message: error.message,
//     ...(process.env.NODE_ENV === "development" && { stack: error.stack }), // Error stack traces should be visible in development for debugging
//   };

//   // Send error response
//   res.status(error?.statusCode).json(response);
// };

// export { errorHandler };

export type ErrorHandlerType = {
  error: ApiErrorType | Error;
  req: Request;
  res: Response;
  next: NextFunction;
};

/**
 *
 * @param {Error | ApiError} error
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 *
 *
 * @description This middleware is responsible to catch the errors from any request handler wrapped inside the {@link asyncHandler}
 */

export function newErrorHandler({ error, req, res, next }: ErrorHandlerType) {
  let errorInstance: ApiErrorType;
  if (!(error instanceof ApiError)) {
    errorInstance = new ApiError(400, error.message, error.stack);
  } else {
    errorInstance = error;
  }
  const response = {
    ...errorInstance,
    message: errorInstance.message,
    ...(process.env.NODE_ENV === "development" && {
      stack: errorInstance.stack,
    }), // Error stack traces should be visible in development for debugging
  };
  res.status(errorInstance.statusCode).json(response);
}
