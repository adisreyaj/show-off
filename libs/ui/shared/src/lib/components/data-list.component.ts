import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { isNilPipe } from '../pipes';
import { isNil } from 'lodash-es';

@Component({
  selector: 'show-off-data-list',
  template: `
    <ul class="list-style-none flex flex-col gap-1">
      <li
        *ngFor="let row of this.formattedDataList"
        class="grid grid-cols-2 items-center text-sm"
      >
        <p class="text-xs text-slate-400">{{ row.label }}:</p>
        <p class="text-slate-800">
          <span
            class="text-xs text-slate-500"
            [class.font-mono]="row.type === 'number'"
            >{{ row.prefix }}</span
          >
          <span [class.font-mono]="row.type === 'number'">{{ row.value }}</span>
          <span
            class="text-xs text-slate-500"
            [class.font-mono]="row.type === 'number'"
            >{{ row.suffix }}</span
          >
        </p>
      </li>
    </ul>
  `,
  imports: [CommonModule, isNilPipe],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataListComponent {
  formattedDataList: DataListData[] = [];

  @Input()
  set data(data: DataListData[]) {
    this.formattedDataList = data.filter((item) => !isNil(item.value));
  }
}

export interface DataListData {
  label: string;
  value: string | number | boolean | undefined;
  type?: 'number' | 'string';
  prefix?: string;
  suffix?: string;
}
