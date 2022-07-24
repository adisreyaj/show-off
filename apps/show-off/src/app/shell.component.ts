import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { User } from '@show-off/api-interfaces';
import { AuthService, CURRENT_USER } from '@show-off/ui/auth';
import { RemixIconModule } from 'angular-remix-icon';
import { Observable } from 'rxjs';
import { ButtonComponent, DROPDOWN_COMPONENTS } from 'zigzag';

@Component({
  selector: 'show-off-shell',
  template: `
    <header class="flex h-16 border-b border-slate-200 shadow-md">
      <div class="box flex w-full items-center justify-between">
        <div class="flex cursor-pointer items-center gap-1" routerLink="/">
          <img
            src="assets/images/logo.svg"
            class="h-10"
            aria-hidden="true"
            alt="Show-off"
          />
        </div>
        <div class="flex gap-4">
          <div class="flex gap-2">
            <a
              class="grid place-items-center p-2 underline hover:bg-slate-100"
              href="https://github.com/adisreyaj/show-off"
              aria-label="GitHub"
            >
              <rmx-icon name="github-line" class="icon-sm"></rmx-icon>
            </a>
            <a
              class="grid place-items-center p-2 underline hover:bg-slate-100"
              href="https://twitter.com/adisreyaj"
              aria-label="Twitter"
            >
              <rmx-icon name="twitter-line" class="icon-sm"></rmx-icon>
            </a>
          </div>

          <ng-container *ngIf="this.user$ | async as user; else loginButtonTpl">
            <div
              class="flex cursor-pointer items-center gap-2"
              [zzDropdownTrigger]="profileDropdown"
              placement="bottom-start"
            >
              <img
                class="rounded-full"
                width="40"
                height="40"
                [src]="user.image"
                [alt]="user.firstName"
              />
              <div>
                <p>{{ user.firstName }}</p>
              </div>

              <zz-dropdown #profileDropdown>
                <div class="flex flex-col gap-2">
                  <div
                    class="w-full"
                    size="sm"
                    variant="link"
                    zzButton
                    zzDropdownCloseOnClick
                    routerLink="/collections"
                  >
                    <p>My Collections</p>
                  </div>
                </div>
                <div class="flex flex-col gap-2">
                  <div
                    class="w-full"
                    size="sm"
                    variant="link"
                    zzButton
                    zzDropdownCloseOnClick
                    (click)="this.authService.logout()"
                  >
                    <p>Logout</p>
                  </div>
                </div>
              </zz-dropdown>
            </div>
          </ng-container>
        </div>
        <ng-template #loginButtonTpl>
          <button zzButton variant="primary" routerLink="/login">
            <div class="flex items-center gap-2">
              <rmx-icon name="login-box-line" class="icon-sm"></rmx-icon>
              <p class="hidden sm:block">Login</p>
            </div>
          </button>
        </ng-template>
      </div>
    </header>
    <main class="flex-1 overflow-y-auto pb-2">
      <router-outlet></router-outlet>
    </main>
    <footer
      class="flex h-10 items-center justify-center px-4 text-sm font-normal text-slate-500"
    >
      <p class="">
        Made as part of
        <a
          class="text-primary underline"
          href="https://planetscale.com/?utm_source=show-off.adi.so"
          >#PlanetScale</a
        >
        x
        <a
          class="text-primary underline"
          href="https://hashnode.com/?utm_source=show-off.adi.so"
          >#Hashnode</a
        >
        Hackathon
      </p>
    </footer>
  `,
  standalone: true,
  styles: [
    `
      :host {
        height: 100vh;
        display: flex;
        flex-direction: column;
      }

      main {
        height: calc(100vh - 64px - 40px);
      }
    `,
  ],
  imports: [
    RouterModule,
    CommonModule,
    ...DROPDOWN_COMPONENTS,
    ButtonComponent,
    RemixIconModule,
  ],
})
export class ShellComponent {
  constructor(
    @Inject(CURRENT_USER) public readonly user$: Observable<User>,
    public readonly authService: AuthService
  ) {}
}
