import {Component, OnInit} from '@angular/core';
import {slideToLeft} from '../../router.animations';
import {GameService} from '../game.service';

@Component({
  selector: 'app-gameroom',
  templateUrl: './gameroom.component.html',
  styleUrls: ['./gameroom.component.css'],
  animations: [slideToLeft()],
  host: {'[@routerTransition]': ''}
})
export class GameroomComponent implements OnInit {

  constructor(public gameserv: GameService) {
  }

  ngOnInit() {
  }

  joinroom(roomid) {
    this.gameserv.joinRoom(roomid);
  }
}
