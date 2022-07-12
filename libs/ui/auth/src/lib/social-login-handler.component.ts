import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@show-off/ui/auth';
import { firstValueFrom } from 'rxjs';

@Component({
  template: '',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SocialLoginHandlerComponent implements OnInit {
  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly authService: AuthService
  ) {}

  async ngOnInit() {
    const query = this.route.snapshot.queryParams;
    if (query && query?.['code'] === 'SUCCESS') {
      await firstValueFrom(this.authService.me(true));
      await this.router.navigateByUrl('/');
    } else {
      await this.router.navigateByUrl('/login');
    }
  }
}
