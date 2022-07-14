import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  DataListComponent,
  DataListData,
  TypeIconPipe,
} from '@show-off/ui/shared';
import { IdeData } from '@show-off/api-interfaces';
import { ItemLinksComponent } from '../item-links.component';
import { ItemDisplayBaseClass } from '../item-display-base.class';
import { ItemHeaderComponent } from '../item-header.component';

@Component({
  selector: 'show-off-item-ide',
  template: ` <div class="border border-slate-100 p-4 shadow-sm">
    <show-off-item-header [item]="this.originalData">
      <ng-content></ng-content>
    </show-off-item-header>
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
    ItemHeaderComponent,
  ],
})
export class ItemIdeComponent extends ItemDisplayBaseClass<IdeData> {
  getDataList(data: IdeData): DataListData[] {
    return [
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
