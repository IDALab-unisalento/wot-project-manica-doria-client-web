import { ChatService } from './../../services/chat.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';
import { DataSharingService } from 'src/app/services/data-sharing.service';
import { WsService } from 'src/app/services/ws.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  _opened: boolean = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private ws: WsService,
    private chatService: ChatService,
  ) { }

  ngOnInit(): void {
    if (matchMedia) {
      const mq = window.matchMedia('(max-width: 768px)');
      if (mq.matches) {
        this._opened = false;
      } else {
        this._opened = true;
      }
    }

    this.chatService.getAllChats().subscribe(
      chats => {
        chats.forEach(chat => {
          this.ws.connect(chat.id);
        });
      });
  }

  _toggleSidebar() {
    this._opened = !this._opened;
  }

}
