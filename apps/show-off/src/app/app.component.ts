import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { take } from 'rxjs';

import { AuthService } from '@show-off/ui/auth';

@Component({
  selector: 'show-off-root',
  template: ` <router-outlet></router-outlet>`,
  standalone: true,
  imports: [RouterModule],
})
export class AppComponent {
  constructor(private readonly authService: AuthService) {
    authService.init().pipe(take(1)).subscribe();
  }
}
