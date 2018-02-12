import {Component, OnInit} from '@angular/core';
import {slideToLeft} from '../../router.animations';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {GameService} from '../game.service';
import {FileSelectDirective, FileDropDirective, FileUploader} from 'ng2-file-upload/ng2-file-upload';
import {environment} from '../../environments/environment';

declare var jquery: any;
declare var $: any;
const URL = environment.socketURL + '/upload/';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [slideToLeft()],
  host: {'[@routerTransition]': ''}
})
export class LoginComponent implements OnInit {

  public uploader: FileUploader = new FileUploader({url: URL});

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
    }
  }

  login() {
    let avatar = 'assets/sprites/pokemon/' + this.avatarid + '.png';
    console.log('A subir:', this.uploader.getNotUploadedItems());
    console.log('A la URL:', URL);
    if (this.uploader.getNotUploadedItems().length) {
      this.uploader.uploadAll();
      console.log('Uploader:', this.uploader);
      console.log('Archivos:', this.uploader.queue);
      avatar = 'uploads/' + this.uploader.queue[0].file.name;
    }
    this.gameserv.login(this.username, avatar);
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
