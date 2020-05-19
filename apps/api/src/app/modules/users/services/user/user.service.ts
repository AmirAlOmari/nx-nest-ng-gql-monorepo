import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { hash } from 'argon2';

import { User } from '../../models/user/user.model';
import { RegisterUserDto } from '../../dtos/register-user/register-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) public userModel: ReturnModelType<typeof User>
  ) {}

  async getAllUsers() {
    const allUsers = await this.userModel.find().exec();

    return allUsers;
  }

  async registerUser(registerUserDto: RegisterUserDto) {
    const hashedPassword = await this.hashPassword(registerUserDto.password);
    const createUserDto = {
      ...registerUserDto,
      password: hashedPassword
    };

    const createdUser = await new this.userModel(createUserDto).save();

    return createdUser;
  }

  async hashPassword(inputPassword: string) {
    const hashedPassword = await hash(inputPassword);

    return hashedPassword;
  }
}
