import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'order'
})
export class OrderPipe implements PipeTransform {

  transform(users: any[], args?: any): any {
    if (!users) {
      return users;
    }

    return users.sort(function (a, b) {
      return b.points - a.points;
    });
  }

}
