import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { ItemLaptopComponent } from './items/laptop/item-laptop.component';
import { ButtonComponent, FORM_COMPONENTS, ModalService } from 'zigzag';
import { CreateItemComponent } from './create-item.component';
import { CollectionsService } from '../services';
import { filter, mapTo, Observable, startWith, Subject, switchMap } from 'rxjs';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SupportedItemTypes } from '@show-off/api-interfaces';
import { ItemTabletComponent } from './items/tablet/item-tablet.component';
import { ItemIdeComponent } from './items/ide/item-ide.component';
import { ItemTerminalComponent } from './items/terminal/item-terminal.component';
import { ItemBrowserComponent } from './items/browser/item-browser.component';
import { RemixIconModule } from 'angular-remix-icon';
import { ItemKeyboardComponent } from './items/keyboard/item-keyboard.component';
import {
  MasonryGridComponent,
  MasonryGridItemDirective,
  UserInfoComponent,
} from '@show-off/ui/shared';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CollectionDetailHeaderComponent } from './collection-detail-header.component';

@Component({
  selector: 'show-off-collection-detail',
  template: `
    <div class="box page" *ngIf="this.collection$ | async as collection">
      <show-off-collection-detail-header
        [collection]="collection"
      ></show-off-collection-detail-header>
      <section class="flex gap-4">
        <div class="flex-1">
          <div class="flex gap-4">
            <show-off-masonry-grid>
              <article masonryGridItem *ngFor="let item of collection.items">
                <ng-container
                  *ngTemplateOutlet="itemViewTpl; context: { $implicit: item }"
                ></ng-container>
              </article>
            </show-off-masonry-grid>
            <section #grid class="grid"></section>
          </div>
        </div>

        <aside style="width: 300px;" class="rounded-md bg-slate-100 p-4">
          <header class="mb-2">
            <p class="text-lg font-medium">Comments</p>
          </header>
          <section>
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
            <ul class="list-style-none flex flex-col gap-4">
              <li
                class="rounded-md bg-white p-2"
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
          </section>
        </aside>
      </section>
    </div>

    <ng-template #itemViewTpl let-data>
      <ng-container [ngSwitch]="data.type">
        <ng-container *ngSwitchCase="'${SupportedItemTypes.Laptop}'">
          <show-off-item-laptop [data]="data"></show-off-item-laptop>
        </ng-container>
        <ng-container *ngSwitchCase="'${SupportedItemTypes.Tablet}'">
          <show-off-item-tablet [data]="data"></show-off-item-tablet>
        </ng-container>
        <ng-container *ngSwitchCase="'${SupportedItemTypes.Ide}'">
          <show-off-item-ide [data]="data"></show-off-item-ide>
        </ng-container>
        <ng-container *ngSwitchCase="'${SupportedItemTypes.Terminal}'">
          <show-off-item-terminal [data]="data"></show-off-item-terminal>
        </ng-container>
        <ng-container *ngSwitchCase="'${SupportedItemTypes.Browser}'">
          <show-off-item-browser [data]="data"></show-off-item-browser>
        </ng-container>
        <ng-container *ngSwitchCase="'${SupportedItemTypes.Keyboard}'">
          <show-off-item-keyboard [data]="data"></show-off-item-keyboard>
        </ng-container>
      </ng-container>
    </ng-template>
  `,
  standalone: true,
  imports: [
    ItemLaptopComponent,
    ItemTabletComponent,
    ItemIdeComponent,
    ItemTerminalComponent,
    ItemBrowserComponent,
    ItemKeyboardComponent,
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
  ],
})
export class CollectionDetailComponent {
  commentControl = new FormControl<string>('', { nonNullable: true });
  readonly collection$: Observable<any>;

  @ViewChild('grid')
  private grid?: ElementRef;
  private readonly collectionId: string;
  private readonly refreshSubject = new Subject<void>();

  constructor(
    private readonly modal: ModalService,
    private readonly cd: ChangeDetectorRef,
    private readonly collectionsService: CollectionsService,
    private readonly activatedRoute: ActivatedRoute
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
    const ref = this.modal.open(CreateItemComponent, {
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

  toggleLike(liked: boolean) {
    liked ? this.unlike() : this.like();
  }

  comment(text: string) {
    this.collectionsService.comment(this.collectionId, text).subscribe(() => {
      this.refreshSubject.next();
      this.commentControl.reset('');
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
