import { IsNotEmpty, IsString } from 'class-validator';

import { LoginRequest } from '../user.pb';

export class LoginUserDto implements LoginRequest {
  @IsString()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
