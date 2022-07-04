import { Component } from '@angular/core';
import { ItemLaptopComponent } from './items/item-laptop.component';
import { ButtonComponent, ModalService } from 'zigzag';
import { CreateItemComponent } from './create-item.component';
import { CollectionsService } from '../services';
import { filter, switchMap } from 'rxjs';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'show-off-collection-detail',
  template: `
    <div class="box">
      <header class="mb-4 flex justify-between">
        <div>
          <h1 class="page-header">Adithya's WFH Collection</h1>
          <p>My current WFH setup</p>
        </div>
        <section>
          <button zzButton variant="primary" (click)="this.addNewItem()">
            Add Item
          </button>
        </section>
      </header>
      <section class="flex gap-4">
        <show-off-item-laptop style="min-width: 300px"></show-off-item-laptop>
        <show-off-item-laptop style="min-width: 300px"></show-off-item-laptop>
      </section>
    </div>
  `,
  standalone: true,
  imports: [ItemLaptopComponent, ButtonComponent, RouterModule],
})
export class CollectionDetailComponent {
  private readonly collectionId: string;

  constructor(
    private readonly modal: ModalService,
    private readonly collectionsService: CollectionsService,
    private readonly activatedRoute: ActivatedRoute
  ) {
    this.addNewItem();
    this.collectionId = this.activatedRoute.snapshot.params['id'];
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
      .subscribe();
  }
}
