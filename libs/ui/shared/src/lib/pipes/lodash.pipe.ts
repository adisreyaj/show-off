import { Pipe, PipeTransform } from '@angular/core';
import { isEmpty, isNil } from 'lodash-es';

@Pipe({
  name: 'isNil',
  standalone: true,
})
export class isNilPipe implements PipeTransform {
  transform(value: unknown): boolean {
    return isNil(value);
  }
}

@Pipe({
  name: 'isEmpty',
  standalone: true,
})
export class isEmptyPipe implements PipeTransform {
  transform(value: unknown): boolean {
    return isEmpty(value);
  }
}
