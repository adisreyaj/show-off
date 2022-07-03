import { Component, Inject } from '@angular/core';
import { AuthProvider } from '@show-off/api-interfaces';
import { AUTH_CONFIG, AuthConfig } from './auth.token';

@Component({
  selector: 'show-off-login',
  template: `
    <section></section>
    <section class="mt-10">
      <div class="mb-8 text-center text-sm text-slate-400">
        <p class="separator mx-6">
          &nbsp;&nbsp;Sign up with a social account&nbsp;&nbsp;
        </p>
      </div>
      <div class="grid grid-cols-2 gap-4">
        <button
          (click)="onSocialLogin(providers.Google)"
          class="w-full"
          type="button"
          variant="outline"
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
          variant="outline"
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
    </section>
  `,
  styles: [
    `
      :host {
        @apply grid;
        grid-template-columns: 1fr 1fr;
      }
    `,
  ],
  standalone: true,
})
export class LoginComponent {
  providers = AuthProvider;
  constructor(@Inject(AUTH_CONFIG) private readonly authConfig: AuthConfig) {}

  onSocialLogin(provider: AuthProvider) {
    location.href = `${this.authConfig.authURL}/${provider}`;
  }
}
