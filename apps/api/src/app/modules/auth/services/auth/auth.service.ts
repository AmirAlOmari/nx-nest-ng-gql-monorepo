import { Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';
import * as bcrypt from 'bcrypt';

// Jwt module
import { JwtService } from '../../../jwt/services/jwt/jwt.service';

// Users module
import { UserService } from '../../../users/services/user/user.service';

// User module
import { RegisterUserDto } from '../../dtos/register-user/register-user.dto';

@Injectable()
export class AuthService {
  constructor(public jwtService: JwtService, public userService: UserService) {}

  async login(email: string, password: string) {
    const foundUser = await this.userService.getUserWithShape({
      email
    });

    if (!foundUser) {
      throw new Error(`Wrong credentials`);
    }

    const hashedPassword = await this.hashPassword(password);
    const passwordVerified = await this.verifyPassword(
      hashedPassword,
      password
    );

    if (!passwordVerified) {
      throw new Error(`Wrong credentials`);
    }

    const accessToken = await this.jwtService.signAsync({
      userId: foundUser._id
    });
    const result = { accessToken: accessToken };

    return result;
  }

  async registerUser(registerUserDto: RegisterUserDto) {
    const hashedPassword = await this.hashPassword(registerUserDto.password);
    const createUserDto = {
      ...registerUserDto,
      password: hashedPassword
    };

    const createdUser = await this.userService.createUser(createUserDto);

    return createdUser;
  }

  // async hashPassword(inputPassword: string) {
  //   const hashedPassword = await bcrypt.hash(inputPassword, 9);

  //   return hashedPassword;
  // }

  async hashPassword(inputPassword: string) {
    const hashedPassword = await argon2.hash(inputPassword);

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
