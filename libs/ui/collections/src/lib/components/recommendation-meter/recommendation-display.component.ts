import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Pipe,
  PipeTransform,
} from '@angular/core';
import { TooltipDirective } from 'zigzag';

@Pipe({
  name: 'recommendationColor',
  standalone: true,
})
export class RecommendationColorPipe implements PipeTransform {
  transform(val?: number | string): string {
    if (val == null) {
      return 'transparent';
    }
    const value = +val;
    if (value >= 0 && value < 33) {
      return '#f4310d';
    }
    if (value >= 33 && value < 66) {
      return '#f6f20c';
    }

    if (value >= 66 && value <= 100) {
      return '#00f25e';
    }
    return 'transparent';
  }
}

@Pipe({
  name: 'recommendationText',
  standalone: true,
})
export class RecommendationTextPipe implements PipeTransform {
  transform(val?: number | string): string {
    if (val == null) {
      return '-';
    }
    const value = +val;
    // Value between 0 and 33
    if (value >= 0 && value < 33) {
      return 'Not Recommended';
    }
    if (value >= 33 && value < 66) {
      return 'Okayish';
    }
    if (value >= 66 && value < 80) {
      return 'Recommended';
    }
    if (value >= 80 && value <= 100) {
      return 'Highly Recommended';
    }
    return '-';
  }
}

@Component({
  selector: 'show-off-recommendation-display',
  template: ` <div
    class="grid h-6 w-6 place-items-center rounded-full border-2"
    [style.border-color]="this.value | recommendationColor"
    [zzTooltip]="this.value | recommendationText"
  >
    <p style="font-size: 10px" class="cursor-default">{{ this.value }}</p>
  </div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [RecommendationColorPipe, TooltipDirective, RecommendationTextPipe],
})
export class RecommendationDisplayComponent {
  @Input()
  value?: number | string = 0;
}
