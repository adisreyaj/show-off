import { Component } from '@angular/core';
import { ButtonComponent, DROPDOWN_COMPONENTS, ModalService } from 'zigzag';
import { CollectionsService } from '../services';
import { BehaviorSubject, filter, map, Observable, switchMap, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { CreateCollectionComponent } from './create-collection.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { UserInfoComponent } from '@show-off/ui/shared';
import { RemixIconModule } from 'angular-remix-icon';
import { CollectionCardComponent } from './collection-card.component';
import {
  CollectionOrderBy,
  CollectionOrderByType,
  OrderByDirection,
} from '@show-off/api-interfaces';

@Component({
  selector: 'show-off-collections',
  template: ` <div class="box page">
    <header class="mb-4 flex justify-between">
      <div>
        <h1 class="page-header-text">{{ this.title$ | async }}</h1>
      </div>
      <section class="flex items-center gap-4">
        <div class="flex">
          <button
            zzButton
            variant="neutral"
            (click)="this.changeSortDirection()"
          >
            <rmx-icon
              [name]="(this.sortIcon$ | async)!"
              class="icon-sm"
            ></rmx-icon>
          </button>
          <button
            [zzDropdownTrigger]="sortByOptions"
            placement="bottom-start"
            variant="neutral"
            zzButton
            style="width: 130px;text-align: left"
          >
            <p>{{ (this.sort$ | async)!.key }}</p>
            <zz-dropdown #sortByOptions>
              <div class="flex flex-col gap-2">
                <ng-container *ngFor="let option of this.sortOptions">
                  <div
                    class="w-full"
                    size="sm"
                    variant="link"
                    zzButton
                    zzDropdownCloseOnClick
                    (click)="this.sort(option)"
                  >
                    <p>{{ option }}</p>
                  </div>
                </ng-container>
              </div>
            </zz-dropdown>
          </button>
        </div>
        <button zzButton variant="primary" (click)="this.createNew()">
          <div class="flex items-center gap-2">
            <rmx-icon name="add-line" class="icon-sm"></rmx-icon>
            <p class="hidden sm:block">Create New</p>
          </div>
        </button>
      </section>
    </header>
    <section
      class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
    >
      <ng-container *ngFor="let collection of this.collections$ | async">
        <show-off-collection-card
          [collection]="collection"
        ></show-off-collection-card>
      </ng-container>
    </section>
  </div>`,
  standalone: true,
  imports: [
    ButtonComponent,
    CommonModule,
    UserInfoComponent,
    RouterModule,
    RemixIconModule,
    CollectionCardComponent,
    ...DROPDOWN_COMPONENTS,
  ],
})
export class CollectionsComponent {
  collections$: Observable<any[]>;
  title$: Observable<string>;

  sortOptions: CollectionOrderByType[] = Object.values(CollectionOrderByType);
  savedSort = localStorage.getItem('collection:sort');
  defaultSort: CollectionOrderBy = this.savedSort
    ? JSON.parse(this.savedSort)
    : {
        key: CollectionOrderByType.LastUpdated,
        direction: OrderByDirection.Desc,
      };
  sortChangeSubject = new BehaviorSubject<CollectionOrderBy>(this.defaultSort);

  sort$ = this.sortChangeSubject.asObservable().pipe(
    tap((sort) => {
      localStorage.setItem('collection:sort', JSON.stringify(sort));
    })
  );
  sortIcon$: Observable<string> = this.sortChangeSubject.pipe(
    map((sort) => {
      return sort.direction === OrderByDirection.Desc
        ? 'sort-desc'
        : 'sort-asc';
    })
  );

  constructor(
    private readonly collectionsService: CollectionsService,
    private readonly modal: ModalService,
    private readonly activatedRoute: ActivatedRoute
  ) {
    this.collections$ = this.sortChangeSubject.pipe(
      switchMap((sort) => this.collectionsService.getCollections(sort))
    );
    this.title$ = this.activatedRoute.data.pipe(
      map((data) => data['header'].text)
    );
  }

  createNew() {
    const ref = this.modal.open(CreateCollectionComponent, {
      size: 'md',
    });

    ref.afterClosed$
      .pipe(
        filter(Boolean),
        switchMap((data) => this.collectionsService.create(data))
      )
      .subscribe();
  }

  sort(option: CollectionOrderByType) {
    this.sortChangeSubject.next({
      key: option,
      direction: this.sortChangeSubject.value.direction,
    });
  }

  changeSortDirection() {
    this.sortChangeSubject.next({
      key: this.sortChangeSubject.value.key,
      direction:
        this.sortChangeSubject.value.direction === OrderByDirection.Desc
          ? OrderByDirection.Asc
          : OrderByDirection.Desc,
    });
  }
}
