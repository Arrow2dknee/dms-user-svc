import { Injectable, ForbiddenException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

import { UserDocument } from '../schemas/users.schema';
import { SignedPayload } from '../user.pb';

@Injectable()
export class JWTService {
  constructor(private jwtService: JwtService) {}

  // Decode JWT Token
  public async decodeToken(token: string): Promise<unknown> {
    return this.jwtService.decode(token, null);
  }

  // Generate JWT Token
  public generateToken(user: UserDocument): string {
    return this.jwtService.sign({ id: user._id.toString(), email: user.email });
  }

  // Validate user password
  public comparePassword(password: string, userPassword: string): boolean {
    return bcrypt.compareSync(password, userPassword);
  }

  // Encode user password
  public encodePassword(password: string): string {
    const salt: string = bcrypt.genSaltSync(10); // 10 rounds

    return bcrypt.hashSync(password, salt);
  }

  // Validate JWT Token, throw forbidden error if JWT Token is invalid
  public async verify(token: string): Promise<SignedPayload> {
    try {
      return this.jwtService.verify(token);
    } catch (err) {
      throw new ForbiddenException('Forbidden');
    }
  }
}
