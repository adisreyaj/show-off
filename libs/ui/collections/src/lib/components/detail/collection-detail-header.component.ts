import { Clipboard } from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Collection } from '@show-off/api-interfaces';
import {
  ShowIfLoggedInDirective,
  ShowIfOwnerDirective,
  UserInfoComponent,
} from '@show-off/ui/shared';
import { RemixIconModule } from 'angular-remix-icon';
import { isNil } from 'lodash-es';
import {
  ButtonComponent,
  DROPDOWN_COMPONENTS,
  ModalService,
  TooltipDirective,
} from 'zigzag';

@Component({
  selector: 'show-off-collection-detail-header',
  template: ` <header
    *ngIf="this.collection"
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
        zzButton
        variant="primary"
        *showIfOwner="collection.user.id"
        (click)="this.addNewItem.emit()"
      >
        <div class="flex items-center gap-2">
          <rmx-icon name="add-line" class="icon-sm"></rmx-icon>
          <p class="hidden sm:block">Add Item</p>
        </div>
      </button>
      <button
        *showIfOwner="collection.user.id"
        zzButton
        variant="neutral"
        [zzTooltip]="collection.private ? 'Make Public' : 'Make Private'"
        (click)="this.visibilityChange.emit(!collection.private)"
      >
        <div class="flex items-center gap-2">
          <rmx-icon
            [name]="collection.private ? 'lock-line' : 'lock-unlock-line'"
            class="icon-sm"
          ></rmx-icon>
        </div>
      </button>
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
      <button zzButton variant="neutral" [zzDropdownTrigger]="embedOptions">
        <div class="flex items-center gap-2">
          <rmx-icon name="share-line" class="icon-sm"></rmx-icon>
          <p class="hidden sm:block">Share</p>
        </div>

        <zz-dropdown #embedOptions>
          <div
            class="w-full"
            size="sm"
            variant="link"
            zzButton
            zzDropdownCloseOnClick
            (click)="this.openEmbedModal()"
          >
            <div class="flex items-center gap-2">
              <rmx-icon name="code-box-line" class="icon-xs"></rmx-icon>
              <p>Embed</p>
            </div>
          </div>
          <div
            class="w-full"
            size="sm"
            variant="link"
            zzButton
            zzDropdownCloseOnClick
            (click)="this.copyLink()"
          >
            <div class="flex items-center gap-2">
              <rmx-icon name="clipboard-line" class="icon-xs"></rmx-icon>
              <p>Copy Link</p>
            </div>
          </div>
        </zz-dropdown>
      </button>
      <button
        *showIfOwner="collection.user.id"
        zzButton
        variant="neutral"
        [zzDropdownTrigger]="settingsOption"
      >
        <div class="flex items-center gap-2">
          <rmx-icon name="settings-3-line" class="icon-sm"></rmx-icon>
        </div>
        <zz-dropdown #settingsOption>
          <div
            class="w-full"
            size="sm"
            variant="link"
            zzButton
            zzDropdownCloseOnClicck
            (click)="this.editCollection.emit()"
          >
            <div class="flex items-center gap-2">
              <rmx-icon name="pencil-line" class="icon-xs"></rmx-icon>
              <p>Edit</p>
            </div>
          </div>
          <div
            class="w-full"
            size="sm"
            variant="link"
            zzButton
            zzDropdownCloseOnClicck
            (click)="this.deleteCollection.emit(this.collection.id)"
          >
            <div class="flex items-center gap-2  text-red-500">
              <rmx-icon name="delete-bin-4-line" class="icon-xs"></rmx-icon>
              <p>Delete</p>
            </div>
          </div>
        </zz-dropdown>
      </button>
    </section>
  </header>`,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    ButtonComponent,
    UserInfoComponent,
    RemixIconModule,
    ShowIfLoggedInDirective,
    TooltipDirective,
    ShowIfOwnerDirective,
    ...DROPDOWN_COMPONENTS,
  ],
})
export class CollectionDetailHeaderComponent {
  @Input()
  collection?: Collection;

  @Output()
  addNewItem = new EventEmitter<void>();

  @Output()
  visibilityChange = new EventEmitter<boolean>();

  @Output()
  toggleLike = new EventEmitter<boolean>();

  @Output()
  deleteCollection = new EventEmitter<string>();

  @Output()
  editCollection = new EventEmitter<void>();

  constructor(
    private clipboard: Clipboard,
    private readonly modal: ModalService
  ) {}

  copyLink() {
    this.clipboard.copy(window.location.href);
  }

  async openEmbedModal() {
    if (!isNil(this.collection)) {
      const { CollectionEmbedScriptGeneratorComponent } = await import(
        '../embed/collection-embed-script-generator.component'
      );
      this.modal.open<Collection, never>(
        CollectionEmbedScriptGeneratorComponent,
        {
          size: 'md',
          data: this.collection,
        }
      );
    }
  }
}
