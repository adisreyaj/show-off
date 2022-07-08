import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { LaptopData, SupportedItemTypes } from '@show-off/api-interfaces';
import {
  DataListComponent,
  DataListData,
  TypeIconPipe,
} from '@show-off/ui/shared';

@Component({
  selector: 'show-off-item-laptop',
  template: `
    <div class="border border-slate-100 p-4 shadow-sm">
      <header class="mb-3 flex gap-2">
        <img
          class="h-6"
          [src]="'${SupportedItemTypes.Laptop}' | typeIcon"
          alt="${SupportedItemTypes.Laptop}"
        />
        <p class="text-lg">${SupportedItemTypes.Laptop}</p>
      </header>
      <section>
        <show-off-data-list [data]="this.datalist"></show-off-data-list>
      </section>
    </div>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TypeIconPipe, DataListComponent],
})
export class ItemLaptopComponent {
  public datalist: DataListData[] = [];

  @Input()
  set data(data: LaptopData) {
    this.datalist = [
      {
        label: 'Make',
        value: data.make,
      },
      {
        label: 'Model',
        value: data.name,
      },
      {
        label: 'Year',
        value: data.metadata?.['year'],
        type: 'number',
      },
      {
        label: 'RAM',
        value: data.metadata?.['ram'],
        suffix: 'GB',
        type: 'number',
      },
      {
        label: 'Storage',
        value: data.metadata?.['storage'],
        suffix: 'GB',
        type: 'number',
      },
      {
        label: 'Size',
        value: data.metadata?.['size'],
        suffix: 'inch',
        type: 'number',
      },
      {
        label: 'Price',
        prefix: '$',
        value: data.price,
        type: 'number',
      },
    ];
  }
}
