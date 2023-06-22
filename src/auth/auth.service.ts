import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  async login(loginUserDto: LoginUserDto): Promise<{ accessToken: string }> {
    const { email, password } = loginUserDto;

    const foundUser = await this.userRepository.findOneBy({ email });
    if (!foundUser) {
      throw new NotFoundException(
        `User with e-mail ${email} is not registered.`,
      );
    }

    const isMatch = await bcrypt.compare(password, foundUser.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid password.');
    }

    // Generate Access Token

    return { accessToken: 'asdsadsaddassad' };
  }

  async register(
    registerUserDto: RegisterUserDto,
  ): Promise<{ accessToken: string }> {
    const {
      name,
      fatherLastName,
      motherLastName,
      email,
      password,
      confirmPassword,
    } = registerUserDto;

    const foundUser = await this.userRepository.findOneBy({ email });
    if (foundUser) {
      throw new ConflictException('E-mail entered is already in use.');
    }

    if (password !== confirmPassword) {
      throw new BadRequestException(
        'Password and confirm password must be the same.',
      );
    }

    const newUser = new User();
    newUser.name = name;
    newUser.fatherLastName = fatherLastName;
    newUser.motherLastName = motherLastName;
    newUser.email = email;

    const salt = await bcrypt.genSalt();
    newUser.password = await bcrypt.hash(password, salt);

    await this.userRepository.save(newUser);

    // Generate Access Token

    return { accessToken: 'asdsadsaddassad' };
  }
}
