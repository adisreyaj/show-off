import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Pipe,
  PipeTransform,
} from '@angular/core';
import { TypeIconPipe, UserInfoComponent } from '@show-off/ui/shared';
import { RemixIconModule } from 'angular-remix-icon';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TooltipDirective } from 'zigzag';
import { uniqBy } from 'lodash-es';

@Pipe({
  name: 'uniqueItems',
  standalone: true,
})
export class UniqueItemsPipe<Data> implements PipeTransform {
  transform(value: Data[]): Data[] {
    return uniqBy(value, 'type');
  }
}

@Component({
  selector: 'show-off-collection-card',
  template: ` <article
    class="cursor-pointer border border-slate-100 p-4 shadow-sm hover:shadow-lg"
    [routerLink]="['/collections', collection.id]"
  >
    <header class="mb-3">
      <p class="text-lg font-semibold">{{ collection.name }}</p>
    </header>
    <div>
      <section class="mb-3 grid grid-cols-5">
        <ng-container *ngFor="let item of collection.items | uniqueItems">
          <div class="grid h-10 w-10 place-items-center rounded-full">
            <img
              class="block h-6 w-6"
              [src]="item.type | typeIcon"
              [alt]="item.type"
            />
          </div>
        </ng-container>
      </section>
      <section class="flex items-center gap-4 border-y border-slate-200 py-1">
        <div class="flex items-center gap-2">
          <rmx-icon name="heart-3-line" class="icon-xxs"></rmx-icon>
          <p class="text-sm">{{ collection._count.likes }}</p>
        </div>
        <div class="flex items-center gap-2">
          <rmx-icon name="chat-1-line" class="icon-xxs"></rmx-icon>
          <p class="text-sm">{{ collection._count.comments }}</p>
        </div>
        <div class="flex items-center gap-2">
          <rmx-icon name="share-forward-line" class="icon-xxs"></rmx-icon>
          <p class="text-sm">{{ collection._count.shares }}</p>
        </div>
      </section>
    </div>
    <footer class="flex items-center justify-between gap-4 pt-4">
      <show-off-user-info [user]="collection.user"></show-off-user-info>
      <div>
        <p class="text-xs text-slate-500">
          {{ collection.updatedAt | date: 'mediumDate' }}
        </p>
      </div>
    </footer>
  </article>`,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    UserInfoComponent,
    RemixIconModule,
    CommonModule,
    RouterModule,
    TypeIconPipe,
    TooltipDirective,
    UniqueItemsPipe,
  ],
})
export class CollectionCardComponent {
  @Input()
  collection: any;
}
