import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MonitorData } from '@show-off/api-interfaces';
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
import { ItemDisplayBaseClass } from '../item-display-base.class';
import { ItemHeaderComponent } from '../item-header.component';

@Component({
  selector: 'show-off-item-monitor',
  template: `
    <div class="border border-slate-100 p-4 shadow-sm">
      <show-off-item-header [item]="this.originalData">
        <ng-content></ng-content>
      </show-off-item-header>
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
    ItemHeaderComponent,
  ],
})
export class ItemMonitorComponent extends ItemDisplayBaseClass<MonitorData> {
  override getDataList(data: MonitorData): DataListData[] {
    return [
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
