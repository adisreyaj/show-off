import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ItemData } from '@show-off/api-interfaces';
import { TypeIconPipe } from '@show-off/ui/shared';
import { CommonModule } from '@angular/common';
import { RecommendationDisplayComponent } from '../recommendation-meter/recommendation-display.component';

@Component({
  selector: 'show-off-item-header',
  template: ` <header
    class="mb-3 flex items-center justify-between"
    *ngIf="this.item"
  >
    <div class="flex items-center gap-2">
      <img
        class="h-5"
        [src]="this.item.type | typeIcon"
        [alt]="this.item.type"
      />
      <p class="text-md">{{ this.item.type }}</p>
      <show-off-recommendation-display
        [value]="this.item?.recommendation"
      ></show-off-recommendation-display>
    </div>
    <div>
      <ng-content></ng-content>
    </div>
  </header>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TypeIconPipe, CommonModule, RecommendationDisplayComponent],
  standalone: true,
})
export class ItemHeaderComponent {
  @Input()
  item?: ItemData;
}
