import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'ingame'
})
export class IngamePipe implements PipeTransform {

  transform(items: any[], args?: any): any {
    console.log('value:', items);
    console.log('args:', args);

    if (!items) {
      return items;
    }

    return items.filter(user => !user.ingame);
  }

}
