import { ChangeDetectionStrategy, Component } from '@angular/core';
import { KeyboardData } from '@show-off/api-interfaces';
import {
  DataListComponent,
  DataListData,
  TypeIconPipe,
} from '@show-off/ui/shared';
import { ItemLinksComponent } from '../item-links.component';
import { ItemDisplayBaseClass } from '../item-display-base.class';
import { ItemHeaderComponent } from '../item-header.component';

@Component({
  selector: 'show-off-item-keyboard',
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
    TypeIconPipe,
    DataListComponent,
    ItemLinksComponent,
    ItemHeaderComponent,
  ],
})
export class ItemKeyboardComponent extends ItemDisplayBaseClass<KeyboardData> {
  getDataList(data: KeyboardData): DataListData[] {
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
        label: 'Price',
        prefix: '$',
        value: data.price,
        type: 'number',
      },
    ];
  }
}
