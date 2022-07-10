import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {
  DataListComponent,
  DataListData,
  TypeIconPipe,
} from '@show-off/ui/shared';
import {
  BrowserData,
  Link,
  SupportedItemTypes,
} from '@show-off/api-interfaces';
import { ItemLinksComponent } from '../item-links.component';
import { ButtonComponent, DROPDOWN_COMPONENTS } from 'zigzag';
import { RemixIconModule } from 'angular-remix-icon';

@Component({
  selector: 'show-off-item-browser',
  template: ` <div class="border border-slate-100 p-4 shadow-sm">
    <header class="mb-3 flex items-center justify-between">
      <div class="flex gap-2">
        <img
          class="h-6"
          [src]="'${SupportedItemTypes.Browser}' | typeIcon"
          alt="${SupportedItemTypes.Browser}"
        />
        <p class="text-lg">${SupportedItemTypes.Browser}</p>
      </div>
      <div>
        <ng-content></ng-content>
      </div>
    </header>
    <section>
      <show-off-data-list [data]="this.datalist"></show-off-data-list>
    </section>
    <show-off-item-links [links]="this.links"></show-off-item-links>
  </div>`,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    TypeIconPipe,
    DataListComponent,
    ItemLinksComponent,
    ButtonComponent,
    ...DROPDOWN_COMPONENTS,
    RemixIconModule,
  ],
})
export class ItemBrowserComponent {
  public datalist: DataListData[] = [];
  public links: Link[] = [];

  @Input()
  set data(data: BrowserData) {
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
