import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import * as io from 'socket.io-client';
import { v4 as uuid } from 'uuid';

@Injectable()
export class GameService {
  private url = 'http://localhost:3000';
  private socket;

  private user;

  constructor() {
    this.socket = io(this.url);
  }

  public login(username) {
    this.socket.emit('new-user', {
      uuid: uuid(),
      name: username,
      color: '#' + (Math.random() * 0xFFFFFF << 0).toString(16)
    });
  }

  public sendMessage(message) {
    this.socket.emit('new-message', message);
  }

  public getMessages = () => {
    return Observable.create((observer) => {
      this.socket.on('new-message', (message) => {
        observer.next(message);
      });
    });
  };

}
