import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '@show-off/db';
import { BaseUser } from '@show-off/api-interfaces';
import {
  adjectives,
  animals,
  colors,
  uniqueNamesGenerator,
} from 'unique-names-generator';

@Injectable()
export class AuthService {
  frontendCallBackUrl = this.config.get('FRONT_END_CALLBACK_URL');

  constructor(
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
    private readonly prisma: PrismaService
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
      rejectOnNotFound: true,
    });
    const isMatching = await bcrypt.compare(password, user.password);
    if (isMatching) {
      return { token: await this.generateAccessToken(user) };
    } else {
      throw new UnauthorizedException();
    }
  }

  async generateAccessToken(user: Partial<User>) {
    const payload = {
      email: user.email,
      sub: user.id,
      username: user.username,
      aud: 'show-off-web',
      iss: 'show-off',
    };
    return this.jwtService.sign(payload);
  }

  async handleSocialLogin(req: Request, res: Response) {
    console.info(req.user);
    if (!req.user) {
      res.redirect(this.frontendCallBackUrl);
      return;
    }

    let user = await this.prisma.user.findUnique({
      where: { email: req.user.email },
      select: {
        id: true,
        username: true,
        email: true,
        firstName: true,
        lastName: true,
      },
    });

    if (!user) {
      user = await this.signup({
        ...req.user,
        username: uniqueNamesGenerator({
          dictionaries: [adjectives, animals, colors],
          length: 2,
        }),
      });
    }

    if (!user) {
      throw new InternalServerErrorException('Failed to authenticate');
    }

    const accessToken = await this.generateAccessToken(user);
    res.cookie('token', accessToken, {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: true,
      signed: true,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: 'strict',
    });
    /**
     * Set a non http cookie which can be removed by the client on logout
     */
    res.cookie('token-sync', accessToken, {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      httpOnly: false,
      secure: true,
      signed: true,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: 'strict',
    });
    res.redirect(
      `${this.frontendCallBackUrl}?code=SUCCESS&token=${accessToken}`
    );
    return;
  }

  private async signup(userData: BaseUser) {
    try {
      return await this.prisma.user.create({
        data: userData,
        select: {
          id: true,
          username: true,
          email: true,
          firstName: true,
          lastName: true,
        },
      });
    } catch (error) {
      return null;
    }
  }
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface User extends BaseUser {
      id: string;
    }
  }
}
