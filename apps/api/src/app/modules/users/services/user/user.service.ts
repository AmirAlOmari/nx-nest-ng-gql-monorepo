import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { hash } from 'argon2';

import { CustomJwtService } from '../../../jwt/services/jwt/jwt.service';

import { User } from '../../models/user/user.model';
import { RegisterUserDto } from '../../dtos/register-user/register-user.dto';

@Injectable()
export class UserService {
  constructor(
    public customJwtService: CustomJwtService,
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

  async login(email: string, password: string) {
    const hashedPassword = await this.hashPassword(password);

    const foundUser = await this.userModel
      .findOne({ email, password: hashedPassword })
      .exec();

    if (!foundUser) {
      throw new Error(`Wrong credentials`);
    }

    const accessToken = await this.customJwtService.signAsync({
      userId: foundUser._id
    });
    const output = { accessToken: accessToken };

    return output;
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
