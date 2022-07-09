import { Component, Inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService, CURRENT_USER } from '@show-off/ui/auth';
import { Observable } from 'rxjs';
import { User } from '@show-off/api-interfaces';
import { ButtonComponent, DROPDOWN_COMPONENTS } from 'zigzag';
import { RemixIconModule } from 'angular-remix-icon';

@Component({
  selector: 'show-off-shell',
  template: `
    <header class="flex h-16 border-b border-slate-200 shadow-md">
      <div class="box flex w-full items-center justify-between">
        <div class="flex cursor-pointer items-center gap-1" routerLink="/">
          <img
            src="assets/images/logo.svg"
            height="45"
            width="45"
            aria-hidden="true"
            alt="Show-off"
          />
          <div>
            <p class="text-2xl font-semibold uppercase">Show Off</p>
            <p class="-mt-2 text-sm text-slate-500">Showcase your setup</p>
          </div>
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
                  (click)="this.authService.logout()"
                >
                  <p>Logout</p>
                </div>
              </div>
            </zz-dropdown>
          </div>
        </ng-container>
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
    <main class="flex-1 overflow-y-auto">
      <router-outlet></router-outlet>
    </main>
  `,
  standalone: true,
  styles: [
    `
      :host {
        height: 100vh;
        display: flex;
        flex-direction: column;
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
