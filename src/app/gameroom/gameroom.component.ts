import {AfterViewChecked, Component, OnDestroy, OnInit} from '@angular/core';
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
export class GameroomComponent implements OnInit, AfterViewChecked, OnDestroy {

  matchdata = {
    timeCreated: 0,
    round: 0,
    pokemonid: 0,
    users: []
  };

  roomid;
  message = '';

  pokemonfound = {user: '', pokemon: 0};

  messages = [];

  subs = [];

  constructor(public gameserv: GameService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.subs.push(this.router.events.subscribe((evt) => {
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
    }));

    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };

    this.subs.push(this.route.params.subscribe(params => {
      this.roomid = params['roomid'];

      if (!this.roomid) {
        this.router.navigate(['/home']);
      }

      this.gameserv.getMatchData().subscribe(data => {
        this.matchdata = data;
        console.log('JSON del Match', this.matchdata);
        console.log('Nombre del Pokemon', this.gameserv.getPokeName(this.matchdata.pokemonid));
      });
      this.gameserv.getRoomMessages().subscribe((msgdata) => {
        this.messages.push(msgdata);
      });
      this.gameserv.getPokemonFound().subscribe((pokedata) => {
        this.pokemonfound = pokedata;
        if (this.matchdata.pokemonid === this.pokemonfound.pokemon) {
          this.messages.push({
            user: {name: 'Sistema', color: 'red'},
            message: `<strong>${pokedata.user.name}</strong> ha acertado el pokemon!`
          });
        } else {
          this.messages.push({
            user: {name: 'Sistema', color: 'red'},
            message: `<strong>${pokedata.user.name}</strong> ha optado por usar el comodín de ser mamá...`
          });
        }
      });
      this.gameserv.playWTPSound();

      if (this.gameserv.user) {
        this.gameserv.relog();
      }

      this.joinroom();

      if (this.matchdata.round > this.gameserv.maxrounds) {
        this.gameserv.restartRoom();
      }
    }));

  }

  ngAfterViewChecked(): void {
    const objDiv = document.getElementById('messages');
    if (objDiv) {
      objDiv.scrollTop = objDiv.scrollHeight;
    }
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  sendMessage() {
    if (this.message.length > 0 && this.message.length <= this.gameserv.messagelength) {
      this.gameserv.sendMessage(this.message, this.roomid);
      this.message = '';
    }
  }

  joinroom() {
    this.gameserv.joinRoom(this.roomid);
  }

  leave() {
    this.gameserv.leaveRoom();
    this.router.navigate(['/home']);
  }
}
