export default class ApiResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: any;
  constructor(
    statusCode: number,
    message: string = "success",
    data: any = null
  ) {
    this.statusCode = statusCode;
    this.success = true;
    this.message = message;
    this.data = data;
  }
}
