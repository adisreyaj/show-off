import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'show-off-shell',
  template: `<router-outlet></router-outlet>`,
  standalone: true,
  imports: [RouterModule],
})
export class ShellComponent {}
