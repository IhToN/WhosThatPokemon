import {Component, OnInit} from '@angular/core';
import {slideToLeft} from '../../router.animations';
import {GameService} from '../game.service';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-gameroom',
  templateUrl: './gameroom.component.html',
  styleUrls: ['./gameroom.component.css'],
  animations: [slideToLeft()],
  host: {'[@routerTransition]': ''}
})
export class GameroomComponent implements OnInit {

  matchdata = {
    timeCreated: 0,
    round: 0,
    pokemonid: 0,
    users: []
  };
  roomid;
  messages = [];

  constructor(public gameserv: GameService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }

      const scrollToTop = window.setInterval(function () {
        const pos = window.pageYOffset;
        if (pos > 0) {
          window.scrollTo(0, pos - 20);
        } else {
          window.clearInterval(scrollToTop);
        }
      }, 16);
    });

    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };

    this.route.params.subscribe(params => {
      this.roomid = params['roomid'];

      if (!this.roomid) {
        this.router.navigate(['/home']);
      }

      this.joinroom();

      this.gameserv.getMatchData().subscribe(data => {
        this.matchdata = data;
      });
      this.gameserv.getRoomMessages().subscribe((msgdata) => {
        this.messages.push(msgdata);
      });
    });

  }

  joinroom() {
    this.gameserv.joinRoom(this.roomid);
  }
}
