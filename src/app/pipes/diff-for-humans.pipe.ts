import { Pipe, PipeTransform } from '@angular/core';
import moment from 'moment';

@Pipe({
  name: 'diffForHumans'
})
export class DiffForHumansPipe implements PipeTransform {

  transform(value: Date | string | number | undefined): string {
    if (!value) return '';

    const momentDate = moment(value);
    if (!momentDate.isValid()) return '';

    return momentDate.fromNow();
  }

}
