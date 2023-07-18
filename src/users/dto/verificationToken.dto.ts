import { IsNotEmpty, IsString } from 'class-validator';

import { ValidateUserRequest } from '../user.pb';

export class VerificationTokenDto implements ValidateUserRequest {
  @IsString()
  @IsNotEmpty()
  readonly token: string;
}
