/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';

export const protobufPackage = 'user';

export interface UserData {
  fullName: string;
  email: string;
}

export interface UserId {
  id: string;
}

export interface SignedPayload {
  id: string;
  email: string;
}

export interface LoginData {
  id: string;
  fullName: string;
  email: string;
  token: string;
}

/** Register user */
export interface RegisterRequest {
  fullName: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  message: string;
  data: UserData | undefined;
}

/** Login user */
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  data: LoginData | undefined;
}

/** Validate user */
export interface ValidateUserRequest {
  token: string;
}

export interface ValidateUserResponse {
  status: number;
  id: string;
}

export const USER_PACKAGE_NAME = 'user';

export interface UserServiceClient {
  register(request: RegisterRequest): Observable<RegisterResponse>;

  login(request: LoginRequest): Observable<LoginResponse>;

  validateUser(request: ValidateUserRequest): Observable<ValidateUserResponse>;
}

export interface UserServiceController {
  register(
    request: RegisterRequest,
  ):
    | Promise<RegisterResponse>
    | Observable<RegisterResponse>
    | RegisterResponse;

  login(
    request: LoginRequest,
  ): Promise<LoginResponse> | Observable<LoginResponse> | LoginResponse;

  validateUser(
    request: ValidateUserRequest,
  ):
    | Promise<ValidateUserResponse>
    | Observable<ValidateUserResponse>
    | ValidateUserResponse;
}

export function UserServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ['register', 'login', 'validateUser'];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcMethod('UserService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcStreamMethod('UserService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
  };
}

export const USER_SERVICE_NAME = 'UserService';
