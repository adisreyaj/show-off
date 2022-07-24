import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-github2';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(private config: ConfigService) {
    super({
      clientID: config.get('GITHUB_CLIENT_ID'),
      clientSecret: config.get('GITHUB_CLIENT_SECRET'),
      callbackURL: config.get('GITHUB_CALLBACK_URI'),
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    _refreshToken: string,
    profile: {
      displayName: string;
      emails: { value: string }[];
      photos: { value: string }[];
    },
    done: (error: Error, user: GithubUser) => void
  ): Promise<void> {
    const { displayName, emails, photos } = profile;
    const [firstName, lastName] = displayName.split(' ');
    const user: GithubUser = {
      email: emails[0].value,
      firstName,
      lastName,
      image: photos[0].value,
      accessToken,
    };
    done(null, user);
  }
}

interface GithubUser {
  email: string;
  firstName: string;
  lastName: string;
  image: string;
  accessToken: string;
}
