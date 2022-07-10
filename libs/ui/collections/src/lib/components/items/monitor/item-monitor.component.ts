import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {
  Link,
  MonitorData,
  SupportedItemTypes,
} from '@show-off/api-interfaces';
import {
  DataListComponent,
  DataListData,
  LinkTypeIconPipe,
  TypeIconPipe,
} from '@show-off/ui/shared';
import { CommonModule } from '@angular/common';
import { RemixIconModule } from 'angular-remix-icon';
import { ButtonComponent, TooltipDirective } from 'zigzag';
import { ItemLinksComponent } from '../item-links.component';

@Component({
  selector: 'show-off-item-monitor',
  template: `
    <div class="border border-slate-100 p-4 shadow-sm">
      <header class="mb-3 flex gap-2">
        <img
          class="h-6"
          [src]="'${SupportedItemTypes.Monitor}' | typeIcon"
          alt="${SupportedItemTypes.Monitor}"
        />
        <p class="text-lg">${SupportedItemTypes.Monitor}</p>
      </header>
      <section class="pb-2">
        <show-off-data-list [data]="this.datalist"></show-off-data-list>
      </section>
      <show-off-item-links [links]="this.links"></show-off-item-links>
    </div>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    TypeIconPipe,
    LinkTypeIconPipe,
    DataListComponent,
    RemixIconModule,
    ButtonComponent,
    TooltipDirective,
    ItemLinksComponent,
  ],
})
export class ItemMonitorComponent {
  public datalist: DataListData[] = [];
  public links: Link[] = [];

  @Input()
  set data(data: MonitorData) {
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
        label: 'Resolution',
        value: data.metadata?.['resolution'],
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
