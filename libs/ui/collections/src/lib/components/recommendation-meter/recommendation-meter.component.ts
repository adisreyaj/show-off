import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'show-off-recommendation-meter',
  template: ` <header class="mb-2">
      <p class="text-lg font-semibold">Recommendation</p>
    </header>
    <div class="range-wrap relative ml-4 w-full max-w-[400px]">
      <div
        class="gap-filler cursor-pointer"
        (click)="this.handleInputChange('0')"
      ></div>
      <input
        type="range"
        min="0"
        max="100"
        class="range w-full cursor-pointer opacity-0"
        #range
        (input)="this.handleInputChange(range.value)"
      />
      <output class="bubble" #bubble></output>
    </div>
    <div
      class="mb-4 mt-2 flex w-full max-w-[416px] items-center justify-between text-xs"
    >
      <div class="">Not Recommended</div>
      <div class="">Highly Recommended</div>
    </div>`,
  standalone: true,
  styles: [
    //language=SCSS
    `
      /* Custom Bar */
      .range-wrap::before {
        @apply absolute block h-2 w-full;
        content: '';
        background: linear-gradient(to right, #f4310d, #f6f20c, #00f25e);
        top: 50%;
        transform: translateY(-50%);
        transition: height 100ms ease;
      }

      .bubble {
        @apply pointer-events-none absolute grid h-6 w-6 place-items-center border-2 border-slate-200 bg-white text-xs font-semibold;
        top: 50%;
        transform: translateY(-50%);
        transition: color 100ms ease, transform 100ms ease;
        user-select: none; /*  Prevent Accidentally highlighting the number while sliding the cursor  */
      }

      .range-wrap:hover .bubble,
      .range-wrap:focus .bubble {
        @apply border-primary;
        transform: translateY(-50%);
      }

      .gap-filler {
        background-color: #f4310d;
        position: absolute;
        height: 8px;
        width: 16px;
        top: 50%;
        left: -16px;
        transform: translateY(-50%);
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: RecommendationMeterComponent,
      multi: true,
    },
  ],
})
export class RecommendationMeterComponent implements ControlValueAccessor {
  @ViewChild('range', { static: true }) range!: ElementRef<HTMLInputElement>;
  @ViewChild('bubble', { static: true }) bubble!: ElementRef<HTMLOutputElement>;

  private onTouched!: () => void;
  private onChanged!: (val: number) => void;

  writeValue(value?: number | null): void {
    this.update(value ?? 0);
  }

  registerOnChange(fn: never): void {
    this.onChanged = fn;
  }

  registerOnTouched(fn: never): void {
    this.onTouched = fn;
  }

  handleInputChange(val: string) {
    this.update(+val);
    this.onChanged(+val);
  }

  update(val: number) {
    const min = 0;
    const max = 100;

    const offset = Number((val - min) * 100) / (max - min);

    this.bubble.nativeElement.textContent = `${val}`;

    this.bubble.nativeElement.style.left = `calc(${offset}% - 14px)`;
  }
}
