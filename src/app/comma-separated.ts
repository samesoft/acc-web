import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'commaSeparated'
})
export class CommaSeparatedPipe implements PipeTransform {
  transform(value: number): string {
    const formatter = new Intl.NumberFormat('en-US');
    return formatter.format(value);
  }
}