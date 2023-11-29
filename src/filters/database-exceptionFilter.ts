import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from "@nestjs/common";
import { QueryFailedError, TypeORMError } from "typeorm";
import { Response } from "express";

@Catch(TypeORMError)
export class DatabaseExceptionFilter implements ExceptionFilter {
	catch(exception: TypeORMError, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response: Response = ctx.getResponse<Response>();
		let status = HttpStatus.BAD_REQUEST;
		let message = "DataBase error";

		if (exception instanceof QueryFailedError) {
			if (exception.driverError.code === "ER_DUP_ENTRY") {
				message = "Duplicate entry";
				status = HttpStatus.CONFLICT;
			}
		}

		response.status(status).json({
			statusCode: status,
			message,
		});
	}
}
