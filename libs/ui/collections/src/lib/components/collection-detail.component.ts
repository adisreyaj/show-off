import { Component } from '@angular/core';
import { ItemLaptopComponent } from './items/item-laptop.component';
import { ButtonComponent, ModalService } from 'zigzag';
import { CreateItemComponent } from './create-item.component';
import { CollectionsService } from '../services';

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
  imports: [ItemLaptopComponent, ButtonComponent],
})
export class CollectionDetailComponent {
  constructor(
    private readonly modal: ModalService,
    private readonly collectionsService: CollectionsService
  ) {
    this.addNewItem();
  }

  addNewItem() {
    const ref = this.modal.open(CreateItemComponent, {
      size: 'md',
    });
  }
}
