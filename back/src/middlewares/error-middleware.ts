import { ApiErrorType, ErrorHandlerType } from "../types/misc";
import ApiError from "../utils/api-error";

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
