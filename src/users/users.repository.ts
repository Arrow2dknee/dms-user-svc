import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { UserDocument, User } from './schemas/users.schema';
import { RegisterUserDto } from './dto';

export class UsersRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async findById(userId: Types.ObjectId): Promise<UserDocument> {
    return this.userModel.findById(userId).lean();
  }

  async findByName(name: string): Promise<UserDocument> {
    return this.userModel.findOne({ fullName: name }).lean(); // Lowercase search
  }

  async findByEmail(email: string): Promise<UserDocument> {
    return this.userModel.findOne({ email }).lean();
  }

  async createUser(dto: RegisterUserDto): Promise<UserDocument> {
    return this.userModel.create(dto);
  }
}
