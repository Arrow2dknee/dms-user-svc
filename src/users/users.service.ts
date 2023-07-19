import { Injectable, HttpStatus } from '@nestjs/common';
import { Types } from 'mongoose';
import { RpcException } from '@nestjs/microservices';

import { UsersRepository } from './users.repository';
import { LoginUserDto, RegisterUserDto, VerificationTokenDto } from './dto';
import {
  UserData,
  LoginData,
  SignedPayload,
  ValidateUserResponse,
} from './user.pb';
import { JWTService } from './jwt/jwt.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JWTService,
  ) {}

  private async getUserById(id: string) {
    return this.usersRepository.findById(new Types.ObjectId(id));
  }

  private async getUserByName(name: string) {
    return this.usersRepository.findByName(name.toLowerCase());
  }

  private async getUserByEmail(email: string) {
    return this.usersRepository.findByEmail(email);
  }

  /** Public Methods below */

  public async newUserRegistration(dto: RegisterUserDto): Promise<UserData> {
    const { fullName, email, password } = dto;

    const userWithSimilarName = await this.getUserByName(fullName);
    if (userWithSimilarName) {
      throw new RpcException({
        message: 'User with this name already exists',
      });
    }
    const userWithSimilarEmail = await this.getUserByEmail(email);
    if (userWithSimilarEmail) {
      throw new RpcException({
        message: 'User with this email already exists',
      });
    }

    const payload: RegisterUserDto = {
      fullName: fullName.toLowerCase(),
      email,
      password: this.jwtService.encodePassword(password),
    };
    const newUser = await this.usersRepository.createUser(payload);

    return {
      fullName: newUser.fullName,
      email: newUser.email,
    };
  }

  public async validateUserByToken(
    dto: VerificationTokenDto,
  ): Promise<ValidateUserResponse> {
    const { token } = dto;
    const decodedUser: SignedPayload = await this.jwtService.verify(token);

    if (!decodedUser) {
      throw new RpcException({
        message: 'Invalid token',
      });
    }
    const user = await this.getUserById(decodedUser.id);

    if (!user) {
      throw new RpcException({
        message: 'User does not exists',
      });
    }

    return {
      id: user._id.toString(),
      status: HttpStatus.OK,
    };
  }

  public async loginUser(dto: LoginUserDto): Promise<LoginData> {
    const { email, password } = dto;

    const user = await this.getUserByEmail(email);

    if (!user) {
      throw new RpcException({
        message: 'User does not exists',
      });
    }

    const doesPwdMatch = this.jwtService.comparePassword(
      password,
      user.password,
    );

    if (!doesPwdMatch) {
      throw new RpcException({
        message: 'Incorrect email or password',
      });
    }

    return {
      id: user._id.toString(),
      fullName: user.fullName,
      email: user.email,
      token: this.jwtService.generateToken(user),
    };
  }
}
