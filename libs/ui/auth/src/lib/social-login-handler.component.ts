import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@show-off/ui/auth';

@Component({
  template: '',
  standalone: true,
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
      this.authService.me().subscribe();
      await this.router.navigate(['/']);
    } else {
      await this.router.navigate(['/login']);
    }
  }
}
