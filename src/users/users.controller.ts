import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';

import {
  USER_SERVICE_NAME,
  RegisterResponse,
  ValidateUserResponse,
  LoginResponse,
} from './user.pb';
import { UsersService } from './users.service';
import { RegisterUserDto, VerificationTokenDto, LoginUserDto } from './dto';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Register method
  @GrpcMethod(USER_SERVICE_NAME, 'Register')
  async registerUser(dto: RegisterUserDto): Promise<RegisterResponse> {
    const data = await this.usersService.newUserRegistration(dto);

    return {
      message: 'User registered successfully',
      data,
    };
  }

  // Validate user method
  @GrpcMethod(USER_SERVICE_NAME, 'ValidateUser')
  async validateUser(dto: VerificationTokenDto): Promise<ValidateUserResponse> {
    return this.usersService.validateUserByToken(dto);
  }

  // Login method
  @GrpcMethod(USER_SERVICE_NAME, 'Login')
  async login(dto: LoginUserDto): Promise<LoginResponse> {
    const data = await this.usersService.loginUser(dto);

    return {
      message: 'User logged-in successfully',
      data,
    };
  }
}
