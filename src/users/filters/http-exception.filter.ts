// // import {
// //   ExceptionFilter,
// //   Catch,
// //   ArgumentsHost,
// //   HttpException,
// //   HttpStatus,
// // } from '@nestjs/common';
// // import { HttpArgumentsHost } from '@nestjs/common/interfaces';
// // import { Request, Response } from 'express';

// // @Catch(HttpException)
// // export class HttpExceptionFilter implements ExceptionFilter {
// //   catch(exception: HttpException, host: ArgumentsHost) {
// //     const ctx: HttpArgumentsHost = host.switchToHttp();
// //     const res: Response = ctx.getResponse<Response>();
// //     const req: Request = ctx.getRequest<Request>();
// //     const status: HttpStatus = exception.getStatus();

// //     if (status === HttpStatus.BAD_REQUEST) {
// //       const res: any = exception.getResponse();
// //       return { status, error: res.message };
// //     }

// //     res.status(status).json({
// //       statusCode: status,
// //       timestamp: new Date().toISOString(),
// //       path: req.url,
// //     });
// //   }
// // }

// import {
//   ExceptionFilter,
//   Catch,
//   ArgumentsHost,
//   HttpException,
// } from '@nestjs/common';
// import { Request, Response } from 'express';

// @Catch(HttpException)
// export class HttpExceptionFilter implements ExceptionFilter {
//   catch(exception: HttpException, host: ArgumentsHost) {
//     const ctx = host.switchToHttp();
//     const response = ctx.getResponse<Response>();
//     const request = ctx.getRequest<Request>();
//     const status = exception.getStatus();

//     response &&
//       response.status &&
//       response.status(status).json({
//         statusCode: status,
//         timestamp: new Date().toISOString(),
//         path: request.url,
//       });
//   }
// }

// import {
//   ExceptionFilter,
//   Catch,
//   ArgumentsHost,
//   HttpException,
//   HttpStatus,
// } from '@nestjs/common';
// import { HttpAdapterHost } from '@nestjs/core';

// @Catch()
// export class AllExceptionsFilter implements ExceptionFilter {
//   constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

//   catch(exception: unknown, host: ArgumentsHost): void {
//     // In certain situations `httpAdapter` might not be available in the
//     // constructor method, thus we should resolve it here.
//     const { httpAdapter } = this.httpAdapterHost;

//     const ctx = host.switchToHttp();

//     const httpStatus =
//       exception instanceof HttpException
//         ? exception.getStatus()
//         : HttpStatus.INTERNAL_SERVER_ERROR;

//     let httpErrorMessage = '';

//     if (exception instanceof HttpException) {
//       httpErrorMessage = exception.message || exception.name || exception.stack;
//     }

//     httpErrorMessage =
//       exception['errorInfo']?.message ||
//       (Array.isArray(exception['response']?.message)
//         ? exception['response']['message'][0]
//         : exception['response']?.message) ||
//       (Array.isArray(exception['message'])
//         ? exception['message'][0]
//         : exception['message']) ||
//       exception['error'] ||
//       exception['error']?.message;

//     const responseBody = {
//       statusCode: httpStatus,
//       message: httpErrorMessage,
//     };

//     if (exception['response']?.data) {
//       responseBody['data'] = exception['response']['data'] || {};
//     }

//     httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
//   }
// }

import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    // In certain situations `httpAdapter` might not be available in the
    // constructor method, thus we should resolve it here.
    const app = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const responseBody = {
      statusCode: httpStatus,
      timestamp: new Date().toISOString(),
      // path: httpAdapter.getRequestUrl(ctx.getRequest()),
    };

    // httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
