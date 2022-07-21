import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import {
  Collection,
  Item,
  ItemData,
  ItemServerData,
  SupportedItemTypes,
} from '@show-off/api-interfaces';
import {
  MasonryGridComponent,
  MasonryGridItemDirective,
  ShowIfLoggedInDirective,
  ShowIfOwnerDirective,
  UserInfoComponent,
} from '@show-off/ui/shared';
import { RemixIconModule } from 'angular-remix-icon';
import {
  filter,
  map,
  mapTo,
  Observable,
  startWith,
  Subject,
  switchMap,
} from 'rxjs';
import {
  ButtonComponent,
  DROPDOWN_COMPONENTS,
  FORM_COMPONENTS,
  ModalService,
} from 'zigzag';
import { CollectionsService } from '../../services';
import { CreateCollectionComponent } from '../create-collection.component';
import { CreateItemComponent } from '../create-item.component';
import { ItemBrowserComponent } from '../items/browser/item-browser.component';
import { ItemHeadphonesComponent } from '../items/headphones/item-headphones.component';
import { ItemIdeComponent } from '../items/ide/item-ide.component';
import { ItemKeyboardComponent } from '../items/keyboard/item-keyboard.component';
import { ItemLaptopComponent } from '../items/laptop/item-laptop.component';
import { ItemMicrophoneComponent } from '../items/microphone/item-microphone.component';
import { ItemMonitorComponent } from '../items/monitor/item-monitor.component';
import { ItemMouseComponent } from '../items/mouse/item-mouse.component';
import { ItemPhoneComponent } from '../items/phone/item-phone.component';
import { ItemSoftwareComponent } from '../items/software/item-software.component';
import { ItemTabletComponent } from '../items/tablet/item-tablet.component';
import { ItemTerminalComponent } from '../items/terminal/item-terminal.component';
import { ItemWebcamComponent } from '../items/webcam/item-webcam.component';
import { CollectionDetailHeaderComponent } from './collection-detail-header.component';

@Component({
  selector: 'show-off-collection-detail',
  template: `
    <div class="box page" *ngIf="this.collection$ | async as collection">
      <show-off-collection-detail-header
        [collection]="collection"
        (addNewItem)="this.addNewItem()"
        (toggleLike)="this.toggleLike($event)"
        (visibilityChange)="this.updateVisibility($event)"
        (deleteCollection)="this.deleteCollection($event)"
        (editCollection)="this.updateCollection(collection)"
      ></show-off-collection-detail-header>
      <section
        class="grid flex-1 grid-cols-1 gap-0 sm:grid-cols-[1fr_300px] sm:gap-4"
      >
        <div class="flex-1">
          <div
            class="flex"
            *ngIf="collection.items.length > 0; else noItemsInCollection"
          >
            <show-off-masonry-grid>
              <article
                class="min-w-[200px]"
                masonryGridItem
                *ngFor="let item of collection.items"
              >
                <ng-container
                  *ngTemplateOutlet="
                    itemViewTpl;
                    context: {
                      $implicit: item,
                      collection: collection,
                      ownerId: collection.user.id
                    }
                  "
                ></ng-container>
              </article>
            </show-off-masonry-grid>
            <section #grid class="grid"></section>
          </div>
          <ng-template #noItemsInCollection>
            <div class="grid h-full place-items-center">
              <div class="grid place-items-center">
                <img
                  src="assets/images/no-items.png"
                  height="250px"
                  width="250px"
                  alt="No Items in collection"
                />
                <p class="-mt-6">No items in collection</p>
              </div>
            </div>
          </ng-template>
        </div>
        <aside class="bg-slate-100 p-4">
          <header class="mb-2">
            <p class="text-lg font-medium">Comments</p>
          </header>
          <section *showIfLoggedIn>
            <textarea
              style="background-color: white; width: 100%;margin-bottom: 8px;"
              type="text"
              variant="fill"
              rows="3"
              zzInput
              [formControl]="this.commentControl"
            ></textarea>
            <button
              zzButton
              variant="primary"
              (click)="this.comment(this.commentControl.value)"
              [disabled]="this.commentControl.invalid"
            >
              Comment
            </button>
          </section>
          <section class="mt-4">
            <ul
              *ngIf="collection.comments.length > 0; else noComments"
              class="list-style-none flex flex-col gap-4"
            >
              <li
                class="bg-white p-2"
                *ngFor="let comment of collection.comments"
              >
                <header class="mb-2">
                  <show-off-user-info
                    [user]="comment.user"
                  ></show-off-user-info>
                </header>
                <div>
                  <p class="text-sm line-clamp-3">
                    {{ comment.text }}
                  </p>
                </div>
              </li>
            </ul>
            <ng-template #noComments>
              <div class="grid h-full place-items-center">
                <div class="grid place-items-center">
                  <img
                    src="assets/images/no-comments.png"
                    height="150px"
                    width="150px"
                    alt="No Comments in collection"
                  />
                  <p class="-mt-2 text-xs">Be the first one to comment!</p>
                </div>
              </div>
            </ng-template>
          </section>
        </aside>
      </section>
    </div>

    <ng-template
      #itemViewTpl
      let-data
      let-ownerId="ownerId"
      let-collection="collection"
    >
      <ng-container [ngSwitch]="data.type">
        <ng-container *ngSwitchCase="'${SupportedItemTypes.Laptop}'">
          <show-off-item-laptop [data]="data">
            <ng-container
              *ngTemplateOutlet="
                moreOptionsDropdown;
                context: { $implicit: data, ownerId: collection.user.id }
              "
            ></ng-container>
          </show-off-item-laptop>
        </ng-container>
        <ng-container *ngSwitchCase="'${SupportedItemTypes.Tablet}'">
          <show-off-item-tablet [data]="data">
            <ng-container
              *ngTemplateOutlet="
                moreOptionsDropdown;
                context: { $implicit: data, ownerId: collection.user.id }
              "
            ></ng-container>
          </show-off-item-tablet>
        </ng-container>
        <ng-container *ngSwitchCase="'${SupportedItemTypes.Ide}'">
          <show-off-item-ide [data]="data">
            <ng-container
              *ngTemplateOutlet="
                moreOptionsDropdown;
                context: { $implicit: data, ownerId: collection.user.id }
              "
            ></ng-container>
          </show-off-item-ide>
        </ng-container>
        <ng-container *ngSwitchCase="'${SupportedItemTypes.Terminal}'">
          <show-off-item-terminal [data]="data">
            <ng-container
              *ngTemplateOutlet="
                moreOptionsDropdown;
                context: { $implicit: data, ownerId: collection.user.id }
              "
            ></ng-container>
          </show-off-item-terminal>
        </ng-container>
        <ng-container *ngSwitchCase="'${SupportedItemTypes.Browser}'">
          <show-off-item-browser [data]="data">
            <ng-container
              *ngTemplateOutlet="
                moreOptionsDropdown;
                context: { $implicit: data, ownerId: collection.user.id }
              "
            ></ng-container>
          </show-off-item-browser>
        </ng-container>
        <ng-container *ngSwitchCase="'${SupportedItemTypes.Keyboard}'">
          <show-off-item-keyboard [data]="data">
            <ng-container
              *ngTemplateOutlet="
                moreOptionsDropdown;
                context: { $implicit: data, ownerId: collection.user.id }
              "
            ></ng-container>
          </show-off-item-keyboard>
        </ng-container>
        <ng-container *ngSwitchCase="'${SupportedItemTypes.Phone}'">
          <show-off-item-phone [data]="data">
            <ng-container
              *ngTemplateOutlet="
                moreOptionsDropdown;
                context: { $implicit: data, ownerId: collection.user.id }
              "
            ></ng-container>
          </show-off-item-phone>
        </ng-container>
        <ng-container *ngSwitchCase="'${SupportedItemTypes.Headphones}'">
          <show-off-item-headphones [data]="data">
            <ng-container
              *ngTemplateOutlet="
                moreOptionsDropdown;
                context: { $implicit: data, ownerId: collection.user.id }
              "
            ></ng-container>
          </show-off-item-headphones>
        </ng-container>
        <ng-container *ngSwitchCase="'${SupportedItemTypes.Microphone}'">
          <show-off-item-microphone [data]="data">
            <ng-container
              *ngTemplateOutlet="
                moreOptionsDropdown;
                context: { $implicit: data, ownerId: collection.user.id }
              "
            ></ng-container>
          </show-off-item-microphone>
        </ng-container>
        <ng-container *ngSwitchCase="'${SupportedItemTypes.Webcam}'">
          <show-off-item-webcam [data]="data">
            <ng-container
              *ngTemplateOutlet="
                moreOptionsDropdown;
                context: { $implicit: data, ownerId: collection.user.id }
              "
            ></ng-container>
          </show-off-item-webcam>
        </ng-container>
        <ng-container *ngSwitchCase="'${SupportedItemTypes.Mouse}'">
          <show-off-item-mouse [data]="data">
            <ng-container
              *ngTemplateOutlet="
                moreOptionsDropdown;
                context: { $implicit: data, ownerId: collection.user.id }
              "
            ></ng-container>
          </show-off-item-mouse>
        </ng-container>
        <ng-container *ngSwitchCase="'${SupportedItemTypes.Monitor}'">
          <show-off-item-monitor [data]="data">
            <ng-container
              *ngTemplateOutlet="
                moreOptionsDropdown;
                context: { $implicit: data, ownerId: collection.user.id }
              "
            ></ng-container>
          </show-off-item-monitor>
        </ng-container>
        <ng-container *ngSwitchCase="'${SupportedItemTypes.Software}'">
          <show-off-item-software [data]="data">
            <ng-container
              *ngTemplateOutlet="
                moreOptionsDropdown;
                context: { $implicit: data, ownerId: collection.user.id }
              "
            ></ng-container>
          </show-off-item-software>
        </ng-container>
      </ng-container>
    </ng-template>

    <ng-template #moreOptionsDropdown let-data let-ownerId="ownerId">
      <button
        *showIfOwner="ownerId"
        zzButton
        size="sm"
        variant="link"
        [zzDropdownTrigger]="moreOptions"
      >
        <rmx-icon name="more-fill" class="icon-sm"></rmx-icon>
        <zz-dropdown #moreOptions>
          <div
            class="w-full"
            size="sm"
            variant="link"
            zzButton
            zzDropdownCloseOnClick
            (click)="this.editItem(data)"
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
            zzDropdownCloseOnClick
            (click)="this.deleteItem(data)"
          >
            <div class="flex items-center gap-2 text-red-500">
              <rmx-icon name="delete-bin-4-line" class="icon-xs"></rmx-icon>
              <p>Delete</p>
            </div>
          </div>
        </zz-dropdown>
      </button>
    </ng-template>
  `,
  standalone: true,
  styles: [
    `
      :host {
        height: 100%;
        display: block;
      }
    `,
  ],
  imports: [
    ItemLaptopComponent,
    ItemTabletComponent,
    ItemIdeComponent,
    ItemTerminalComponent,
    ItemBrowserComponent,
    ItemKeyboardComponent,
    ItemPhoneComponent,
    ItemHeadphonesComponent,
    ItemMicrophoneComponent,
    ItemWebcamComponent,
    ItemMouseComponent,
    ItemMonitorComponent,
    ButtonComponent,
    CollectionDetailHeaderComponent,
    UserInfoComponent,
    MasonryGridComponent,
    MasonryGridItemDirective,
    RouterModule,
    CommonModule,
    RemixIconModule,
    ReactiveFormsModule,
    ...FORM_COMPONENTS,
    ...DROPDOWN_COMPONENTS,
    ShowIfOwnerDirective,
    ShowIfLoggedInDirective,
    ItemSoftwareComponent,
  ],
})
export class CollectionDetailComponent {
  commentControl = new FormControl<string>('', { nonNullable: true });
  readonly collection$: Observable<Collection>;
  showComments = true;

  @ViewChild('grid')
  private grid?: ElementRef;
  private readonly collectionId: string;
  private readonly refreshSubject = new Subject<void>();

  constructor(
    private readonly modal: ModalService,
    private readonly cd: ChangeDetectorRef,
    private readonly collectionsService: CollectionsService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router
  ) {
    this.collectionId = this.activatedRoute.snapshot.params['id'];
    this.collection$ = this.refreshSubject.pipe(
      startWith(true),
      mapTo(true),
      switchMap((refresh) =>
        this.collectionsService.getCollection(this.collectionId, refresh)
      )
    );
  }

  addNewItem() {
    const ref = this.modal.open<never, ItemData>(CreateItemComponent, {
      size: 'md',
    });

    ref.afterClosed$
      .pipe(
        filter(Boolean),
        switchMap((data) =>
          this.collectionsService.addNewItem(this.collectionId, data)
        )
      )
      .subscribe(() => {
        this.refreshSubject.next();
      });
  }

  editItem(data: Item) {
    const ref = this.modal.open<ItemData, ItemServerData>(CreateItemComponent, {
      size: 'md',
      data,
    });

    ref.afterClosed$
      .pipe(
        filter(Boolean),
        /**
         * Type of the item cannot be edited afterwards
         */
        map((item) => {
          const { type, ...rest } = item;
          return rest;
        }),
        switchMap((data) => {
          return this.collectionsService.updateItem(data);
        })
      )
      .subscribe(() => {
        this.refreshSubject.next();
      });
  }

  toggleLike(liked: boolean) {
    liked ? this.unlike() : this.like();
  }

  comment(text: string) {
    this.collectionsService.comment(this.collectionId, text).subscribe(() => {
      this.refreshSubject.next();
      this.commentControl.reset('');
    });
  }

  updateVisibility(isPrivate: boolean) {
    this.collectionsService
      .updateVisibility(this.collectionId, isPrivate)
      .subscribe(() => {
        this.refreshSubject.next();
      });
  }

  deleteItem(data: Item) {
    return this.collectionsService.deleteItem(data.id).subscribe(() => {
      this.refreshSubject.next();
    });
  }

  updateCollection(collection: Collection) {
    const ref = this.modal.open<Collection, Collection>(
      CreateCollectionComponent,
      {
        data: collection,
        size: 'md',
      }
    );
    ref.afterClosed$
      .pipe(
        filter(Boolean),
        switchMap((data) =>
          this.collectionsService.update(collection.id, {
            name: data.name,
            description: data.description,
          })
        )
      )
      .subscribe(() => {
        this.refreshSubject.next();
      });
  }

  deleteCollection(collectionId: string) {
    this.collectionsService.deleteCollection(collectionId).subscribe(() => {
      this.router.navigate(['/']);
    });
  }

  private like() {
    this.collectionsService.like(this.collectionId).subscribe(() => {
      this.refreshSubject.next();
    });
  }

  private unlike() {
    this.collectionsService.unlike(this.collectionId).subscribe(() => {
      this.refreshSubject.next();
    });
  }
}
