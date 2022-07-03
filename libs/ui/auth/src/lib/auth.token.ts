import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '@show-off/api-interfaces';

export const AUTH_CONFIG = new InjectionToken<AuthConfig>(
  'Authentication related configs'
);

export interface AuthConfig {
  authURL: string;
}

export const CURRENT_USER = new InjectionToken<Observable<User>>(
  'Logged in user details'
);
