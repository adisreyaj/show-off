import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {
  DataListComponent,
  DataListData,
  TypeIconPipe,
} from '@show-off/ui/shared';
import { IdeData, Link, SupportedItemTypes } from '@show-off/api-interfaces';
import { ItemLinksComponent } from '../item-links.component';

@Component({
  selector: 'show-off-item-ide',
  template: ` <div class="border border-slate-100 p-4 shadow-sm">
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
    <show-off-item-links [links]="this.links"></show-off-item-links>
  </div>`,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TypeIconPipe, DataListComponent, ItemLinksComponent],
})
export class ItemIdeComponent {
  public datalist: DataListData[] = [];
  public links: Link[] = [];

  @Input()
  set data(data: IdeData) {
    this.links = data.links ?? [];

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
