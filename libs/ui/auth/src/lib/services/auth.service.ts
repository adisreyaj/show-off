import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {
  BehaviorSubject,
  catchError,
  combineLatest,
  map,
  Observable,
  of,
  throwError,
} from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Apollo, gql } from 'apollo-angular';

import { User } from '@show-off/api-interfaces';
import { AUTH_CONFIG, AuthConfig } from '@show-off/ui/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly logoutSubject = new BehaviorSubject<boolean>(false);
  public readonly isLoggedIn$ = combineLatest([
    this.me(),
    this.logoutSubject.asObservable(),
  ]).pipe(map(([user, loggedOut]) => !loggedOut && !!user));

  constructor(
    private apollo: Apollo,
    private readonly router: Router,
    private readonly http: HttpClient,
    @Inject(AUTH_CONFIG) private config: AuthConfig,
    private readonly cookieService: CookieService
  ) {}

  me(refresh = false): Observable<User | null> {
    return this.apollo
      .query<{ me: User }>({
        query: gql`
          query me {
            me {
              id
              email
              image
              username
              firstName
              lastName
            }
          }
        `,
        fetchPolicy: refresh ? 'network-only' : 'cache-first',
      })
      .pipe(
        map((result) => result.data.me),
        catchError((err) => {
          if (err?.message === 'Unauthorized') {
            return of(null);
          }
          return throwError(() => new Error('Something went wrong'));
        })
      );
  }

  init() {
    return this.me();
  }

  async logout() {
    this.cookieService.deleteAll('/');
    this.logoutSubject.next(true);
    await this.apollo.client.resetStore();
    await this.router.navigate(['/login']);
  }
}
