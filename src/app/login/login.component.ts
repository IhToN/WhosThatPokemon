import {AfterViewChecked, Component, OnDestroy, OnInit} from '@angular/core';
import {slideToLeft} from '../../router.animations';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {GameService} from '../game.service';
import {FileSelectDirective, FileDropDirective, FileUploader} from 'ng2-file-upload/ng2-file-upload';
import {environment} from '../../environments/environment';

declare var jquery: any;
declare var $: any;
const URL = (environment.socketURL ? environment.socketURL : '') + '/upload';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [slideToLeft()],
  host: {'[@routerTransition]': ''}
})
export class LoginComponent implements OnInit, AfterViewChecked, OnDestroy {
  public uploader: FileUploader = new FileUploader({url: URL});

  username;
  avatarid = 0;
  message = '';

  roomid = 0;

  userslist: any;
  messages = [];

  subs = [];

  constructor(private router: Router, public gameserv: GameService) {
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

    this.subs.push(this.gameserv.getUsers().subscribe((userslist) => {
      this.userslist = userslist;
    }));

    this.subs.push(this.gameserv.getMessages().subscribe((msgdata) => {
      this.messages.push(msgdata);
    }));

    this.gameserv.playOpeningSong();
    this.gameserv.updateUserList();

    if (this.gameserv.user) {
      this.gameserv.relog();
    }

    if (this.gameserv.room >= 0) {
      this.gameserv.leaveRoom();
    }
  }

  ngAfterViewChecked(): void {
    const objDiv = document.getElementById('messages');
    if (objDiv) {
      objDiv.scrollTop = objDiv.scrollHeight;
    }
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  login() {
    if (!this.username) {
      console.log('You have to select a username.');
      return;
    }

    let avatar = 'assets/sprites/pokemon/' + this.avatarid + '.png';
    if (this.uploader.getNotUploadedItems().length) {
      this.uploader.uploadAll();
      avatar = URL + 's/' + this.uploader.queue[0].file.name;
      const fileType = avatar.split('.').pop();
      if (fileType !== 'jpg' && fileType !== 'png' && fileType !== 'jpeg' && fileType !== 'gif') {
        console.log('Wrong file format, choose another one.');
        return;
      }
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
