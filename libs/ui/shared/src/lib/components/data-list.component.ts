import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { isNilPipe } from '../pipes';

@Component({
  selector: 'show-off-data-list',
  template: `
    <ul class="list-style-none flex flex-col gap-1">
      <li
        *ngFor="let row of this.data"
        class="grid grid-cols-2 items-center text-sm"
      >
        <ng-container *ngIf="!(row.value | isNil)">
          <p class="text-xs text-slate-400">{{ row.label }}:</p>
          <p class="text-slate-800">
            <span
              class="text-xs text-slate-500"
              [class.font-mono]="row.type === 'number'"
              >{{ row.prefix }}</span
            >
            <span [class.font-mono]="row.type === 'number'">{{
              row.value
            }}</span>
            <span
              class="text-xs text-slate-500"
              [class.font-mono]="row.type === 'number'"
              >{{ row.suffix }}</span
            >
          </p>
        </ng-container>
      </li>
    </ul>
  `,
  imports: [CommonModule, isNilPipe],
  standalone: true,
})
export class DataListComponent {
  @Input()
  data: DataListData[] = [];
}

export interface DataListData {
  label: string;
  value: string | number | boolean | undefined;
  type?: 'number' | 'string';
  prefix?: string;
  suffix?: string;
}
