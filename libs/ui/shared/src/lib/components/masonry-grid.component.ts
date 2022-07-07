import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  HostBinding,
  ViewEncapsulation,
} from '@angular/core';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[masonryGridItem]',
  standalone: true,
})
export class MasonryGridItemDirective {
  @HostBinding('class.masonry-grid-item')
  get isMasonryGridItem(): boolean {
    return true;
  }
}

@Component({
  selector: 'show-off-masonry-grid',
  template: `
    <section #grid class="masonry-grid">
      <ng-content></ng-content>
    </section>
  `,
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  styles: [
    `
      :host {
        width: 100%;
      }

      .masonry-grid {
        column-count: 4;
        column-gap: 16px;
      }

      .masonry-grid-item {
        display: inline-block;
        margin-bottom: 16px;
        width: 100%;
      }

      @media (max-width: 1199px) {
        .masonry-grid {
          column-count: 3;
        }
      }

      @media (max-width: 991px) {
        .masonry-grid {
          column-count: 2;
        }
      }

      @media (max-width: 767px) {
        .masonry-grid {
          column-count: 1;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MasonryGridComponent {}
