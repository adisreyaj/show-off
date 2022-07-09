import { Component, Inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CURRENT_USER } from '@show-off/ui/auth';
import { Observable } from 'rxjs';
import { User } from '@show-off/api-interfaces';

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
        <div
          *ngIf="this.user$ | async as user"
          class="flex cursor-pointer items-center gap-2"
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
        </div>
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
  imports: [RouterModule, CommonModule],
})
export class ShellComponent {
  constructor(@Inject(CURRENT_USER) public readonly user$: Observable<User>) {}
}
