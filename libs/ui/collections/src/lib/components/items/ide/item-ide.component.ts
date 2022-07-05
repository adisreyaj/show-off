import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {
  DataListComponent,
  DataListData,
  TypeIconPipe,
} from '@show-off/ui/shared';
import { IdeData, SupportedItemTypes } from '@show-off/api-interfaces';

@Component({
  selector: 'show-off-item-ide',
  template: ` <div class="rounded-md border border-gray-200 p-4 shadow-sm">
    <header class="mb-3 flex gap-2">
      <img
        class="h-6"
        [src]="'${SupportedItemTypes.Ide}' | typeIcon"
        alt="${SupportedItemTypes.Ide}"
      />
      <p class="text-lg">${SupportedItemTypes.Ide}</p>
    </header>
    <section>
      <show-off-data-list [data]="this.datalist"></show-off-data-list>
    </section>
  </div>`,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TypeIconPipe, DataListComponent],
})
export class ItemIdeComponent {
  public datalist: DataListData[] = [];

  @Input()
  set data(data: IdeData) {
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
