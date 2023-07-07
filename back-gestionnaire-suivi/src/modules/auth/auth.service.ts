import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { Tokens } from 'src/utils/tokens.type';
import * as dotenv from 'dotenv';
import { UpdateUserDto } from '../user/dto/update-user.dto';
import { AuthDto } from './dto/auth.dto';
import { Role } from '../user/entities/role.enum';


dotenv.config()

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) { }

  async register(dto: AuthDto): Promise<Tokens> {
    const hash = await this.hashData(dto.password);
    const newUser = await this.userService.create({
      email: dto.email,
      password: dto.password,
      hashed_token: hash
    });
    const tokens = await this.getTokens(newUser.id, newUser.email, newUser.roles);
    await this.updateRefreshTokenHash(newUser.id, tokens.refresh_token);
    return tokens;
  }

  async login(email: string, pass: string): Promise<Tokens> {
    const user = await this.userService.findOneByEmail(email);
    if (!user) {
      throw new ForbiddenException('Accès refusé');
    }
    const isPasswordValid = await bcrypt.compare(pass, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException("Email ou mot de passe incorrect");
    }
    const tokens = await this.getTokens(user.id, user.email, user.roles);
    await this.updateRefreshTokenHash(user.id, tokens.refresh_token)
    return tokens;
  }


  async logout(userId: string) {
    const user = await this.userService.findOne(userId);
    if (user.hashed_token) {
      const hashedToken = user.hashed_token;
      user.hashed_token = null;
      await this.userService.update(userId, { hashed_token: null })
      return hashedToken;
    }
  }

  async refreshTokens(userId: string, rt: string) {
    const user = await this.userService.findOne(userId);
    if (!user || !user.hashed_token) {
      throw new ForbiddenException("Accès refusé");
    }
    const rtMatches = await bcrypt.compare(rt, user.hashed_token);
    if (!rtMatches) {
      throw new ForbiddenException("Accès refusé");
    }
    const tokens = await this.getTokens(user.id, user.email, user.roles);
    await this.updateRefreshTokenHash(user.id, tokens.refresh_token);
    return tokens;
  }

  async updateRefreshTokenHash(userId: string, rt: string) {
    const hash = await this.hashData(rt);
    await this.userService.update(userId, { hashed_token: hash } as UpdateUserDto)
  }

  hashData(data: string) {
    return bcrypt.hash(data, 10);
  }

  async getTokens(userId: string, email: string, role: Role) {
    const [at, rt] = await Promise.all([

      this.jwtService.signAsync(
        {
          sub: userId,
          email,
          role,
        },
        {
          secret: process.env.JWT_SECRET,
          expiresIn: 60 * 15,
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
          role,
        },
        {
          secret: process.env.JWT_REFRESH,
          expiresIn: 60 * 60 * 24 * 30,
        },
      ),
    ]);
    return {
      access_token: at,
      refresh_token: rt,
    }
  }
}
