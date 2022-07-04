import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'show-off-data-list',
  template: `
    <ul class="list-style-none">
      <li *ngFor="let row of this.data" class="grid grid-cols-2">
        <p class="text-slate-500">{{ row.label }}:</p>
        <p class="text-slate-800">{{ row.value }}</p>
      </li>
    </ul>
  `,
  imports: [CommonModule],
  standalone: true,
})
export class DataListComponent {
  @Input()
  data: DataListData[] = [];
}

export interface DataListData {
  label: string;
  value: string | number;
}
