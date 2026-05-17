import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from "@nestjs/common";
import { Response } from "express";
import { AppError } from "../errors/app-error";
import { ValidationError } from "../errors/validation/validation.error";
import { ApiErrorPayload, ApiErrorResponse } from "../types/api.types";

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  catch(error: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (error instanceof AppError) {
      return response
        .status(error.statusCode)
        .json(this.buildAppErrorResponseBody(error));
    }

    if (error instanceof HttpException) {
      return response
        .status(error.getStatus())
        .json(this.buildHttpErrorResponseBody(error));
    }

    this.logger.error(error);

    return response
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json(this.buildUnknownErrorResponseBody());
  }

  private buildAppErrorResponseBody(error: AppError): ApiErrorResponse {
    const errorPayload: ApiErrorPayload = {
      code: error.code,
      message: error.message,
    };

    if (error instanceof ValidationError) {
      errorPayload.fieldErrors = error.fieldErrors;
    }

    return {
      success: false,
      error: errorPayload,
    };
  }

  private buildHttpErrorResponseBody(error: HttpException): ApiErrorResponse {
    return {
      success: false,
      error: {
        code: "HTTP_ERROR",
        message: error.message,
      },
    };
  }

  private buildUnknownErrorResponseBody(): ApiErrorResponse {
    return {
      success: false,
      error: {
        code: "INTERNAL_SERVER_ERROR",
        message: "Internal server error",
      },
    };
  }
}
