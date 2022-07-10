import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {
  Link,
  MicrophoneData,
  SupportedItemTypes,
} from '@show-off/api-interfaces';
import {
  DataListComponent,
  DataListData,
  TypeIconPipe,
} from '@show-off/ui/shared';
import { ItemLinksComponent } from '../item-links.component';

@Component({
  selector: 'show-off-item-microphone',
  template: `
    <div class="border border-slate-100 p-4 shadow-sm">
      <header class="mb-3 flex gap-2">
        <img
          class="h-6"
          [src]="'${SupportedItemTypes.Microphone}' | typeIcon"
          alt="${SupportedItemTypes.Microphone}"
        />
        <p class="text-lg">${SupportedItemTypes.Microphone}</p>
      </header>
      <section>
        <show-off-data-list [data]="this.datalist"></show-off-data-list>
      </section>
      <show-off-item-links [links]="this.links"></show-off-item-links>
    </div>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TypeIconPipe, DataListComponent, ItemLinksComponent],
})
export class ItemMicrophoneComponent {
  public datalist: DataListData[] = [];
  public links: Link[] = [];

  @Input()
  set data(data: MicrophoneData) {
    this.links = data.links ?? [];

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