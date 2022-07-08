import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {
  DataListComponent,
  DataListData,
  TypeIconPipe,
} from '@show-off/ui/shared';
import { BrowserData, SupportedItemTypes } from '@show-off/api-interfaces';

@Component({
  selector: 'show-off-item-browser',
  template: ` <div class="border border-slate-100 p-4 shadow-sm">
    <header class="mb-3 flex gap-2">
      <img
        class="h-6"
        [src]="'${SupportedItemTypes.Browser}' | typeIcon"
        alt="${SupportedItemTypes.Browser}"
      />
      <p class="text-lg">${SupportedItemTypes.Browser}</p>
    </header>
    <section>
      <show-off-data-list [data]="this.datalist"></show-off-data-list>
    </section>
  </div>`,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TypeIconPipe, DataListComponent],
})
export class ItemBrowserComponent {
  public datalist: DataListData[] = [];

  @Input()
  set data(data: BrowserData) {
    this.datalist = [
      {
        label: 'Publisher',
        value: data.make,
      },
      {
        label: 'Name',
        value: data.name,
      },
    ];
  }
}
