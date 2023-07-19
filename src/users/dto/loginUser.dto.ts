import {
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  Matches,
} from 'class-validator';

import { LoginRequest } from '../user.pb';

export class LoginUserDto implements LoginRequest {
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
