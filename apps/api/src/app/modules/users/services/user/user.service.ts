import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';

// Jwt module
import { JwtService } from '../../../jwt/services/jwt/jwt.service';

// User module
import { User } from '../../models/user/user.model';
import { CreateUserDto } from '../../dtos/create-user/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    public customJwtService: JwtService,
    @InjectModel(User) public userModel: ReturnModelType<typeof User>
  ) {}

  async getAllUsers() {
    const allUsers = await this.userModel.find().exec();

    return allUsers;
  }

  async getUserById(userId: string) {
    const user = await this.userModel.findById(userId).exec();

    return user;
  }

  async getUserWithShape(shape: Partial<User>) {
    const foundUser = await this.userModel.findOne(shape).exec();

    return foundUser;
  }

  async createUser(createUserDto: CreateUserDto) {
    const foundUserWithTheSameEmail = await this.getUserWithShape({
      email: createUserDto.email
    });

    if (foundUserWithTheSameEmail) {
      throw Error(`User with email ${createUserDto.email} already exists`); // TODO: extend and store different errors in separate place
    }

    const createdUser = await new this.userModel(createUserDto).save();

    return createdUser;
  }
}
