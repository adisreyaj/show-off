import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { HeadphonesData, SupportedItemTypes } from '@show-off/api-interfaces';
import {
  DataListComponent,
  DataListData,
  TypeIconPipe,
} from '@show-off/ui/shared';

@Component({
  selector: 'show-off-item-headphones',
  template: `
    <div class="border border-slate-100 p-4 shadow-sm">
      <header class="mb-3 flex gap-2">
        <img
          class="h-6"
          [src]="'${SupportedItemTypes.Headphones}' | typeIcon"
          alt="${SupportedItemTypes.Headphones}"
        />
        <p class="text-lg">${SupportedItemTypes.Headphones}</p>
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
export class ItemHeadphonesComponent {
  public datalist: DataListData[] = [];

  @Input()
  set data(data: HeadphonesData) {
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
        label: 'Price',
        prefix: '$',
        value: data.price,
        type: 'number',
      },
    ];
  }
}
