import { Component } from '@angular/core';
import { ButtonComponent, ModalService } from 'zigzag';
import { CollectionsService } from '../services';
import { filter, Observable, switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { CreateCollectionComponent } from './create-collection.component';

@Component({
  selector: 'show-off-collections',
  template: ` <div class="box">
    <header class="mb-4 flex justify-between">
      <div>
        <h1 class="page-header">Collections</h1>
      </div>
      <section>
        <button zzButton variant="primary" (click)="this.createNew()">
          Create New
        </button>
      </section>
    </header>
    <section class="flex gap-4">
      <ng-container *ngFor="let collection of this.collections$ | async">
        <p>{{ collection.name }}</p>
      </ng-container>
    </section>
  </div>`,
  standalone: true,
  imports: [ButtonComponent, CommonModule],
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
