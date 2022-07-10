import {
  Directive,
  EmbeddedViewRef,
  Inject,
  Input,
  OnDestroy,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { CURRENT_USER } from '@show-off/ui/auth';
import { Observable, Subscription } from 'rxjs';
import { User } from '@show-off/api-interfaces';
import { isNil } from 'lodash-es';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[showIfOwner]',
  standalone: true,
})
export class ShowIfOwnerDirective implements OnDestroy {
  @Input('showIfOwner')
  ownerId?: string;

  sub: Subscription;
  embeddedRef?: EmbeddedViewRef<HTMLElement>;

  constructor(
    private readonly vcr: ViewContainerRef,
    private readonly tpl: TemplateRef<HTMLElement>,
    @Inject(CURRENT_USER) private readonly currentUser$: Observable<User>
  ) {
    this.sub = this.currentUser$.subscribe((user) => {
      if (!isNil(this.ownerId) && user?.id === this.ownerId) {
        this.embeddedRef = this.vcr.createEmbeddedView<HTMLElement>(this.tpl);
        this.embeddedRef.detectChanges();
      } else {
        this.vcr.clear();
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    this.embeddedRef?.destroy();
  }
}
