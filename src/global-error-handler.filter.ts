import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';

@Catch()
export class GlobalErrorHandlerFilter<T> implements ExceptionFilter {
	catch(exception: T, host: ArgumentsHost) {
		const ctx = host.switchToHttp();

		const httpStatus =
			exception instanceof HttpException
				? exception.getStatus()
				: HttpStatus.INTERNAL_SERVER_ERROR;

		const responseBody = {
			statusCode: httpStatus,
			timestamp: new Date().toISOString(),
			path: ctx.getRequest().url,
		};

		if (httpStatus === HttpStatus.INTERNAL_SERVER_ERROR) {
			console.error(exception);
		}

		return ctx.getResponse().status(httpStatus).json(responseBody);
	}
}
