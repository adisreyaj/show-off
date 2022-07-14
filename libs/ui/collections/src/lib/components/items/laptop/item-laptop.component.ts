import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LaptopData } from '@show-off/api-interfaces';
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
import { RecommendationDisplayComponent } from '../../recommendation-meter/recommendation-display.component';
import { ItemDisplayBaseClass } from '../item-display-base.class';
import { ItemHeaderComponent } from '../item-header.component';

@Component({
  selector: 'show-off-item-laptop',
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
    RecommendationDisplayComponent,
    ItemHeaderComponent,
  ],
})
export class ItemLaptopComponent extends ItemDisplayBaseClass<LaptopData> {
  override getDataList(data: LaptopData): DataListData[] {
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
        label: 'Year',
        value: data.metadata?.['year'],
        type: 'number',
      },
      {
        label: 'RAM',
        value: data.metadata?.['ram'],
        suffix: 'GB',
        type: 'number',
      },
      {
        label: 'Storage',
        value: data.metadata?.['storage'],
        suffix: 'GB',
        type: 'number',
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
