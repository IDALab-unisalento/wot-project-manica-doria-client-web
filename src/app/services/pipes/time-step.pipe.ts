import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeStep'
})
export class TimeStepPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): string {
    return (value / (1000 * 60 * 60)).toFixed(2);
  }

}
