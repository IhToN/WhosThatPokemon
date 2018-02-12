import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'ingame'
})
export class IngamePipe implements PipeTransform {

  transform(users: any[], args?: any): any {
    if (!users) {
      return users;
    }

    return users.filter(user => !user.ingame);
  }

}
