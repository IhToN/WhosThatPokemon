import {Component, OnInit} from '@angular/core';
import {slideToLeft} from '../../router.animations';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {GameService} from '../game.service';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [slideToLeft()],
  host: {'[@routerTransition]': ''}
})
export class LoginComponent implements OnInit {

  logged = false;

  username;
  avatarid = 0;
  message = '';

  roomid = 0;

  userslist: any;
  messages = [];

  constructor(private router: Router, public gameserv: GameService) {
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

    this.gameserv.getUsers().subscribe((userslist) => {
      this.userslist = userslist;
    });

    this.gameserv.getMessages().subscribe((msgdata) => {
      this.messages.push(msgdata);
    });

    if (this.gameserv.user) {
      this.gameserv.relog();
      this.logged = true;
    }
  }

  login() {
    this.gameserv.login(this.username, 'assets/sprites/pokemon/' + this.avatarid + '.png');
    this.logged = true;
  }

  sendMessage() {
    if (this.message.length > 0 && this.message.length <= this.gameserv.messagelength) {
      this.gameserv.sendMessage(this.message);
      this.message = '';
    }
  }

  joinroom() {
    this.router.navigate(['game/' + this.roomid]);
  }
}
