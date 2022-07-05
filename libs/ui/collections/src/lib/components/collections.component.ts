import { Component } from '@angular/core';
import { ButtonComponent, ModalService } from 'zigzag';
import { CollectionsService } from '../services';
import { filter, Observable, switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { CreateCollectionComponent } from './create-collection.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'show-off-collections',
  template: ` <div class="box">
    <header class="mb-4 flex justify-between">
      <div>
        <h1 class="page-header-text">Collections</h1>
      </div>
      <section>
        <button zzButton variant="primary" (click)="this.createNew()">
          Create New
        </button>
      </section>
    </header>
    <section class="flex gap-4">
      <ng-container *ngFor="let collection of this.collections$ | async">
        <article
          class="cursor-pointer rounded-md border border-slate-200 p-4 shadow-sm"
          [routerLink]="['/collections', collection.id]"
        >
          <header>
            <p class="text-lg font-semibold">{{ collection.name }}</p>
          </header>
          <div>
            <section></section>
          </div>
          <footer class="flex items-center gap-4">
            <div>
              <img
                width="30"
                height="30"
                class="rounded-full"
                [src]="collection.user.image"
                [alt]="collection.user.firstName"
              />
            </div>
            <div class="text-sm">
              <p>
                {{ collection.user.firstName }} {{ collection.user.lastName }}
              </p>
              <p class="-mt-1 text-xs text-slate-600">
                @{{ collection.user.username }}
              </p>
            </div>
          </footer>
        </article>
      </ng-container>
    </section>
  </div>`,
  standalone: true,
  imports: [ButtonComponent, CommonModule, RouterModule],
})
export class CollectionsComponent {
  collections$: Observable<any[]>;

  constructor(
    private readonly collectionsService: CollectionsService,
    private readonly modal: ModalService
  ) {
    this.collections$ = this.collectionsService.getCollections();
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
