import { Component } from '@angular/core';
import { SupportedItemTypes } from '@show-off/api-interfaces';
import {
  DataListComponent,
  DataListData,
  TypeIconPipe,
} from '@show-off/ui/shared';

@Component({
  selector: 'show-off-item-laptop',
  template: `
    <div class="rounded-md border border-gray-200 shadow-sm p-4">
      <header class="flex gap-2 mb-2">
        <img
          width="30"
          height="30"
          [src]="'${SupportedItemTypes.Laptop}' | typeIcon"
          alt="Laptop"
        />
        <p class="text-lg">Laptop</p>
      </header>
      <section>
        <show-off-data-list [data]="this.data"></show-off-data-list>
      </section>
    </div>
  `,
  standalone: true,
  imports: [TypeIconPipe, DataListComponent],
})
export class ItemLaptopComponent {
  data: DataListData[] = [
    {
      label: 'Make',
      value: 'Apple',
    },
    {
      label: 'Model',
      value: 'MacBook Pro',
    },
    {
      label: 'Year',
      value: '2020',
    },
    {
      label: 'Price',
      value: '$ 2599',
    },
  ];
}
