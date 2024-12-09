export type ErrorType = "BAD_REQUEST" | "NOT_FOUND" | "UNAUTHORIZED";
export type ApiErrorType = {
  statusCode: number;
  message: string;
  stack?: string;
};
