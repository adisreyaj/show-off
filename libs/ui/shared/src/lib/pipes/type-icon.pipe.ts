import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'typeIcon',
  standalone: true,
})
export class TypeIconPipe implements PipeTransform {
  transform(type: string): string {
    return `assets/images/item-types/${type.toLowerCase()}.svg`;
  }
}
