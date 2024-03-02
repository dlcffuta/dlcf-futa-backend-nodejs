import { response, Response } from "express";

response.customSuccess = function (code: number, message: string, data: any, success: boolean = true): Response {
  return this.status(code).json({message, data, success});
};
