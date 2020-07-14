import { DataSharingService } from 'src/app/services/data-sharing.service';
import { MaintenanceService } from './../../../../../../services/maintenance.service';
import { Maintenance } from './../../../../../../models/maintenance';
import { ChatService } from './../../../../../../services/chat.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Chat } from './../../../../../../models/chat';
import { Component, OnInit } from '@angular/core';
import { Message } from 'src/app/models/message';
import { User } from 'src/app/models/user';
import { Route } from '@angular/compiler/src/core';
import { WsService } from 'src/app/services/ws.service';


@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss']
})
export class ChatListComponent implements OnInit {

  chats: Chat[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private chatService: ChatService,
    private dataSharing: DataSharingService,
    private maintenaceService: MaintenanceService,
    private ws: WsService,
  ) {
    this.chats = [];
  }

  ngOnInit(): void {

    this.chatService.getAllChats().subscribe(
      data => {
        this.chats = data;
        console.log(this.chats);

        this.chats.forEach(chat => {
          this.maintenaceService.getMaintenanceById(chat.id)
            .subscribe(maintenance => {
              chat.maintenanceName = maintenance.name;
              console.log(chat);
            });
        });
      }
    );

    this.ws.observeMessage.subscribe((msg: Message) => {
      console.log(msg);
      this.chats.forEach(chat => {
        console.log('corresponde', {
          msg: msg.chat.id,
          chat: chat.id
        });
        // solo due uguali altrimenti non funziona
        if (msg.chat.id === chat.id) {
          console.log('trovato')
          chat.newMessage = true;
        }
      });
    });
  }

  goTo(id: number, name: string) {
    this.dataSharing.setMaintenanceChat(name);
    this.router.navigate([id], { relativeTo: this.route });
  }



}
