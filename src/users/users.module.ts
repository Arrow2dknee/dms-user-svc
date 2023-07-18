import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';

import { UserSchema, User } from './schemas/users.schema';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';
import { JWTService } from './jwt/jwt.service';
import { JwtStrategy } from './jwt/jwt.strategy';

@Module({
  imports: [
    JwtModule.register({
      secret: 'VQuGMDwLXfJXEDhAqleOlL6BtiUhRnKz',
      signOptions: { expiresIn: '24h' },
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, JWTService, JwtStrategy],
  exports: [UsersService],
})
export class UsersModule {}
