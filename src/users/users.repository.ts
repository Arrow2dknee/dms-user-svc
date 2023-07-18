import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { UserDocument, User } from './schemas/users.schema';
import { RegisterUserDto } from './dto';

export class UsersRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async findById(userId: Types.ObjectId): Promise<UserDocument> {
    return this.userModel.findById(userId);
  }

  async findByName(name: string): Promise<UserDocument> {
    return this.userModel.findOne({ fullName: name }); // Lowercase search
  }

  async findByEmail(email: string): Promise<UserDocument> {
    return this.userModel.findOne({ email });
  }

  async createUser(dto: RegisterUserDto): Promise<UserDocument> {
    return this.userModel.create(dto);
  }
}
