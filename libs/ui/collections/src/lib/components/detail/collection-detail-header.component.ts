import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { RemixIconModule } from 'angular-remix-icon';
import { ButtonComponent } from 'zigzag';
import {
  ShowIfLoggedInDirective,
  UserInfoComponent,
} from '@show-off/ui/shared';

@Component({
  selector: 'show-off-collection-detail-header',
  template: ` <header
    class="page-header mb-6 flex flex-wrap items-center justify-between gap-4"
  >
    <section>
      <div class="mb-2">
        <h1 class="page-header-text">{{ collection.name }}</h1>
        <p>{{ collection?.description }}</p>
      </div>
      <show-off-user-info [user]="collection.user"></show-off-user-info>
    </section>
    <section class="flex gap-4">
      <button
        *showIfLoggedIn
        zzButton
        variant="neutral"
        (click)="this.toggleLike.emit(collection.liked)"
      >
        <div class="flex items-center gap-2">
          <rmx-icon
            [name]="collection.liked ? 'heart-3-fill' : 'heart-3-line'"
            class="icon-sm"
            [class.text-pink-500]="collection.liked"
          ></rmx-icon>
          <p class="hidden sm:block">Like</p>
        </div>
      </button>
      <button zzButton variant="neutral">
        <div class="flex items-center gap-2">
          <rmx-icon name="share-line" class="icon-sm"></rmx-icon>
          <p class="hidden sm:block">Share</p>
        </div>
      </button>
      <button zzButton variant="neutral">
        <div class="flex items-center gap-2">
          <rmx-icon name="settings-3-line" class="icon-sm"></rmx-icon>
        </div>
      </button>
      <button zzButton variant="primary" (click)="this.addNewItem.emit()">
        <div class="flex items-center gap-2">
          <rmx-icon name="add-line" class="icon-sm"></rmx-icon>
          <p class="hidden sm:block">Add Item</p>
        </div>
      </button>
    </section>
  </header>`,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ButtonComponent,
    UserInfoComponent,
    RemixIconModule,
    ShowIfLoggedInDirective,
  ],
})
export class CollectionDetailHeaderComponent {
  @Input()
  collection: any;

  @Output()
  addNewItem = new EventEmitter<void>();

  @Output()
  toggleLike = new EventEmitter<boolean>();
}
