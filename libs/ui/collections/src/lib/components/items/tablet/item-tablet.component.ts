import { Component, Input } from '@angular/core';
import { SupportedItemTypes, TabletData } from '@show-off/api-interfaces';
import {
  DataListComponent,
  DataListData,
  TypeIconPipe,
} from '@show-off/ui/shared';

@Component({
  selector: 'show-off-item-tablet',
  template: `
    <div class="border border-slate-100 p-4 shadow-sm">
      <header class="mb-3 flex items-center gap-2">
        <img
          class="h-6"
          [src]="'${SupportedItemTypes.Tablet}' | typeIcon"
          alt="${SupportedItemTypes.Tablet}"
        />
        <p class="text-lg">${SupportedItemTypes.Tablet}</p>
      </header>
      <section>
        <show-off-data-list [data]="this.datalist"></show-off-data-list>
      </section>
    </div>
  `,
  standalone: true,
  imports: [TypeIconPipe, DataListComponent],
})
export class ItemTabletComponent {
  public datalist: DataListData[] = [];

  @Input()
  set data(data: TabletData) {
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
        label: 'Price',
        prefix: '$',
        value: data.price,
        type: 'number',
      },
    ];
  }
}
