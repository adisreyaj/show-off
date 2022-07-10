import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Link } from '@show-off/api-interfaces';
import { TooltipDirective } from 'zigzag';
import { CommonModule } from '@angular/common';
import { LinkTypeIconPipe } from '@show-off/ui/shared';
import { RemixIconModule } from 'angular-remix-icon';

@Component({
  selector: 'show-off-item-links',
  standalone: true,
  template: ` <footer
    class="border-t border-slate-100 pt-2"
    *ngIf="this.links.length > 0"
  >
    <ul class="list-style-none flex flex-wrap gap-4">
      <ng-container *ngFor="let link of this.links">
        <li [zzTooltip]="link.type | titlecase">
          <a
            zzButton
            variant="link"
            size="sm"
            [href]="link.url"
            target="_blank"
            rel="noopener noreferrer"
          >
            <rmx-icon
              class="icon-sm"
              [name]="link.type | linkTypeIcon"
            ></rmx-icon>
          </a>
        </li>
      </ng-container>
    </ul>
  </footer>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, LinkTypeIconPipe, RemixIconModule, TooltipDirective],
})
export class ItemLinksComponent {
  @Input()
  links: Link[] = [];
}
