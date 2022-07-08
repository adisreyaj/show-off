import { Component } from '@angular/core';
import { ButtonComponent, DROPDOWN_COMPONENTS, ModalService } from 'zigzag';
import { CollectionsService } from '../services';
import { filter, map, Observable, switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { CreateCollectionComponent } from './create-collection.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { UserInfoComponent } from '@show-off/ui/shared';
import { RemixIconModule } from 'angular-remix-icon';
import { CollectionCardComponent } from './collection-card.component';

@Component({
  selector: 'show-off-collections',
  template: ` <div class="box page">
    <header class="mb-4 flex justify-between">
      <div>
        <h1 class="page-header-text">{{ this.title$ | async }}</h1>
      </div>
      <section class="flex items-center gap-4">
        <div class="flex">
          <button zzButton variant="neutral">
            <rmx-icon name="sort-desc" class="icon-sm"></rmx-icon>
          </button>
          <button
            [zzDropdownTrigger]="sortByOptions"
            placement="bottom-start"
            variant="neutral"
            zzButton
          >
            <p>Sort</p>
            <zz-dropdown #sortByOptions>
              <div class="flex flex-col gap-2">
                <div class="w-full" size="sm" variant="link" zzButton>
                  <p>Last Updated</p>
                </div>
                <div class="w-full" size="sm" variant="link" zzButton>
                  <p>Creation Date</p>
                </div>
                <div class="w-full" size="sm" variant="link" zzButton>
                  <p>Last Updated</p>
                </div>
                <div class="w-full" size="sm" variant="link" zzButton>
                  <p>Likes</p>
                </div>
              </div>
            </zz-dropdown>
          </button>
        </div>
        <button zzButton variant="primary" (click)="this.createNew()">
          Create New
        </button>
      </section>
    </header>
    <section class="flex gap-4">
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

  constructor(
    private readonly collectionsService: CollectionsService,
    private readonly modal: ModalService,
    private readonly activatedRoute: ActivatedRoute
  ) {
    this.collections$ = this.collectionsService.getCollections();
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
}
