import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the SumPricesProductsPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'sumPricesProducts',
})
export class SumPricesProductsPipe implements PipeTransform {
  transform(input: any): number {
    let total: number = 0;
    for (let key in input) {
      if (key != "key" && key != "ready") {
        total += input[key].price * input[key].quantity;
      }
    }
    return total;
  }

}
