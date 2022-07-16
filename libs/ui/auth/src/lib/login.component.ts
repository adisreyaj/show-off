import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { AuthProvider } from '@show-off/api-interfaces';
import { AUTH_CONFIG, AuthConfig } from './auth.token';
import { ButtonComponent, FORM_COMPONENTS } from 'zigzag';

@Component({
  selector: 'show-off-login',
  template: `
    <section class="mt-10 grid place-items-center">
      <div class="w-full max-w-[380px]">
        <header class="mb-8">
          <img alt="Flare" class="h-12 w-12" src="assets/images/logo.svg" />
          <div class="mt-4">
            <h1 class="mb-2 text-2xl font-bold">Welcome to Show Off</h1>
            <p class="text-slate-500">Showcase your setup</p>
          </div>
        </header>

        <section class="relative">
          <div
            class="absolute top-0 left-0 grid h-full w-full place-items-center bg-white bg-opacity-80"
          >
            <div class="flex flex-col items-center">
              <p
                class="rounded-full bg-slate-200 px-2 py-1 text-xs font-medium"
              >
                Coming Soon...
              </p>
            </div>
          </div>
          <div class="form-group mb-4">
            <label class="text-sm font-medium text-slate-500" for="email"
              >Email</label
            >
            <input class="w-full" id="email" readonly type="email" zzInput />
          </div>
          <div class="form-group">
            <label class="text-sm font-medium text-slate-500" for="password"
              >Password</label
            >
            <input
              class="w-full"
              id="password"
              readonly
              type="password"
              zzInput
            />
          </div>
          <footer class="mt-4">
            <button class="w-full" variant="primary" zzButton>
              Get Started
            </button>
          </footer>
        </section>
        <div class="mb-8 mt-6 text-center text-sm text-slate-400">
          <p class="separator mx-6">
            &nbsp;&nbsp;Or sign up with a social account&nbsp;&nbsp;
          </p>
        </div>
        <div class="mt-6 grid grid-cols-2 gap-4">
          <button
            (click)="onSocialLogin(providers.Google)"
            class="w-full"
            type="button"
            variant="neutral"
            zzButton
          >
            <div class="flex items-center justify-center">
              <span>
                <img
                  alt="Login with Google"
                  class="h-6 w-6"
                  src="assets/images/google.svg"
                />
              </span>
              <span class="ml-2">Google</span>
            </div>
          </button>
          <button
            (click)="onSocialLogin(providers.Github)"
            class="w-full"
            type="button"
            variant="neutral"
            zzButton
          >
            <div class="flex items-center justify-center">
              <span>
                <img
                  alt="Login with Github"
                  class="h-6 w-6"
                  src="assets/images/github.svg"
                />
              </span>
              <span class="ml-2">GitHub</span>
            </div>
          </button>
        </div>
        <section class="mt-6">
          <p class="text-sm  text-slate-500">
            Social accounts sign you up automatically if you don't have an
            account yet.
          </p>
        </section>
        <section class="mt-8 text-sm text-slate-400">
          <p>Copyright © Show Off 2022. All rights reserved</p>
        </section>
      </div>
    </section>
    <section class="relative flex">
      <img
        class="h-screen w-full object-cover"
        src="assets/images/login.webp"
        alt="Login"
      />
    </section>
  `,
  styles: [
    `
      :host {
        @apply grid h-screen grid-cols-2;
      }

      .separator {
        @apply border-b border-slate-300 text-center;
        height: 12px;
      }

      .separator:first-line {
        background-color: white;
      }
    `,
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ButtonComponent, ...FORM_COMPONENTS],
})
export class LoginComponent {
  providers = AuthProvider;

  constructor(@Inject(AUTH_CONFIG) private readonly authConfig: AuthConfig) {}

  onSocialLogin(provider: AuthProvider) {
    location.href = `${this.authConfig.authURL}/${provider}`;
  }
}
