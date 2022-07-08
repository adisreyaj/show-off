import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'show-off-user-info',
  template: ` <div class="flex items-center gap-2">
    <img
      width="30"
      height="30"
      class="rounded-full"
      [src]="this.user.image"
      [alt]="this.user.firstName"
    />
    <div class="text-sm">
      <p>
        {{ this.user.firstName }}
        {{ this.user.lastName }}
      </p>
      <p class="-mt-1 text-xs text-slate-600">@{{ this.user.username }}</p>
    </div>
  </div>`,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserInfoComponent {
  @Input()
  user: any;
}
