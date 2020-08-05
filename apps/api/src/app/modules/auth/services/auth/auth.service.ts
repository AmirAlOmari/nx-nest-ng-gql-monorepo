import { Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';
import * as bcrypt from 'bcrypt';

// Jwt module
import { JwtService } from '../../../jwt/services/jwt/jwt.service';

// Users module
import { UserService } from '../../../users/services/user/user.service';

// Auth module
import { RegisterUserDto } from '../../dtos/register-user/register-user.dto';
import { WrongCredentialsError } from '../../errors/wrong-credentials/wrong-credentials.error';

@Injectable()
export class AuthService {
  constructor(public jwtService: JwtService, public userService: UserService) {}

  async login(email: string, password: string) {
    const foundUser = await this.userService.getUserWithShape({
      email,
    });

    if (!foundUser) {
      throw await WrongCredentialsError.create();
    }

    const passwordVerified = await this.verifyPassword(
      foundUser.password,
      password
    );

    if (!passwordVerified) {
      throw await WrongCredentialsError.create();
    }

    const accessToken = await this.jwtService.signAsync({
      userId: foundUser._id,
    });
    const result = { accessToken: accessToken };

    return result;
  }

  async registerUser(registerUserDto: RegisterUserDto) {
    const hashedPassword = await this.hashPassword(registerUserDto.password);
    const createUserDto = {
      ...registerUserDto,
      password: hashedPassword,
    };

    const createdUser = await this.userService.createUser(createUserDto);

    return createdUser;
  }

  // async hashPassword(inputPassword: string) {
  //   const hashedPassword = await bcrypt.hash(inputPassword, 9);

  //   return hashedPassword;
  // }

  async hashPassword(password: string) {
    const hashedPassword = await argon2.hash(password);

    return hashedPassword;
  }

  // async verifyPassword(hashedPassword: string, probePassword: string) {
  //   const verified = await bcrypt.compare(probePassword, hashedPassword);

  //   return verified;
  // }

  async verifyPassword(hashedPassword: string, probePassword: string) {
    const verified = await argon2.verify(hashedPassword, probePassword);

    return verified;
  }
}
