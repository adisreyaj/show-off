import { Pipe, PipeTransform } from '@angular/core';
import { LinkType } from '@show-off/api-interfaces';

@Pipe({
  name: 'linkTypeIcon',
  standalone: true,
})
export class LinkTypeIconPipe implements PipeTransform {
  transform(type: LinkType): string {
    return {
      [LinkType.Link]: 'earth-line',
      [LinkType.Buy]: 'shopping-cart-2-line',
      [LinkType.Affiliate]: 'shopping-cart-2-line',
      [LinkType.Video]: 'video-line',
    }[type];
  }
}
