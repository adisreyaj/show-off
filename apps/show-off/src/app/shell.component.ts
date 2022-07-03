import { Component, Inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CURRENT_USER } from '@show-off/ui/auth';
import { Observable } from 'rxjs';
import { User } from '@show-off/api-interfaces';

@Component({
  selector: 'show-off-shell',
  template: `
    <header class="box h-16 flex items-center justify-between">
      <div>
        <img
          src="assets/images/logo.svg"
          height="50"
          width="50"
          aria-hidden="true"
          alt="Show-off"
        />
      </div>
      <div
        *ngIf="this.user$ | async as user"
        class="flex gap-2 items-center cursor-pointer"
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
