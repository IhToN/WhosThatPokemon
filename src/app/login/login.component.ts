import {Component, OnInit} from '@angular/core';
import {slideToLeft} from '../../router.animations';
import {NavigationEnd, Router} from '@angular/router';
import {GameService} from '../game.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [slideToLeft()],
  host: {'[@routerTransition]': ''}
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private gameserv: GameService) {
  }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }

      const scrollToTop = window.setInterval(function () {
        const pos = window.pageYOffset;
        if (pos > 0) {
          window.scrollTo(0, pos - 20); // how far to scroll on each step
        } else {
          window.clearInterval(scrollToTop);
        }
      }, 16); // how fast to scroll (this equals roughly 60 fps)
    });

    this.gameserv.login('test');
  }

}
