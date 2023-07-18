import {
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  Matches,
} from 'class-validator';

import { RegisterRequest } from '../user.pb';

export class RegisterUserDto implements RegisterRequest {
  @MaxLength(25)
  @MinLength(3)
  @IsString()
  @IsNotEmpty()
  readonly fullName: string;

  @Matches(new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/), {
    message: 'Invalid email format',
  })
  @IsString()
  @IsNotEmpty()
  readonly email: string;

  @Matches(
    new RegExp(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#)<>,'.{[$@(\]}\/;:\\|"!%&^*?_+-~èéêëēėęÿûüùúūîïíīįìôöòóœøōõàáâãåāßśšłžźżçćčñń°–—•€£¥₩₽§""„»«…¿¡''`‰]{10,15}$/i,
    ),
    {
      message: 'Password does not meet criteria',
    },
  )
  @MaxLength(20)
  @MinLength(3)
  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
