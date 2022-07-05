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
        <div>
          <img
            routerLink="/"
            class="cursor-pointer"
            src="assets/images/logo.svg"
            height="50"
            width="50"
            aria-hidden="true"
            alt="Show-off"
          />
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
    <main>
      <router-outlet></router-outlet>
    </main>
  `,
  standalone: true,
  imports: [RouterModule, CommonModule],
})
export class ShellComponent {
  constructor(@Inject(CURRENT_USER) public readonly user$: Observable<User>) {}
}
