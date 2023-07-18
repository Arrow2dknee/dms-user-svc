import { IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator';

import { RegisterRequest } from '../user.pb';

export class RegisterUserDto implements RegisterRequest {
  @MaxLength(25)
  @MinLength(3)
  @IsString()
  @IsNotEmpty()
  readonly fullName: string;

  @IsString()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
