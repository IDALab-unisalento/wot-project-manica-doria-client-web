import { DataSharingService } from 'src/app/services/data-sharing.service';
import { ChatService } from './../../../../../../services/chat.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Message } from 'src/app/models/message';
import { User } from 'src/app/models/user';
import { WsService } from 'src/app/services/ws.service';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.scss']
})
export class ChatMessageComponent implements OnInit {

  bodyCard: HTMLElement;

  currentUser = {} as User;

  messageList: Message[] = [];
  operator: User;
  nameMaintenance: string;
  idMaintenance: string;
  content: string;


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private chatService: ChatService,
    private dataSharing: DataSharingService,
    private ws: WsService,
  ) { }

  ngOnInit(): void {
    this.bodyCard = document.getElementById('bodyCard');
    setTimeout(() => { this.bodyCard.scrollTop = this.bodyCard.scrollHeight; }, 100);

    this.dataSharing.getCurrentUser().subscribe(user => this.currentUser = user);

    this.route.paramMap.subscribe(params => {
      this.idMaintenance = params.get('id');
      this.dataSharing.getCurrentMaintenanceName().subscribe(
        name => this.nameMaintenance = name
      );

      this.chatService.getMessageByMaintenanceId(parseInt(this.idMaintenance, 10)).subscribe(
        messages => {
          this.messageList = messages.message.sort((a, b) => {
            if (a.date < b.date) { return -1; }
            else if (a.date > b.date) { return 1; }
            else { return 0; }
          });
          console.log(this.messageList);
        }
      );
    });

    this.ws.observeMessage.subscribe((msg: any) => {
      if (msg !== undefined) {

        setTimeout(() => { this.bodyCard.scrollTop = this.bodyCard.scrollHeight; }, 100);
      }
    });

  }

  sendMessage(form: any) {

    const tempMessage = {
      user: {},
      chat: {}
    } as Message;

    tempMessage.user = this.currentUser;
    tempMessage.chat.id = parseInt(this.idMaintenance, 10);
    tempMessage.content = form.content;
    tempMessage.date = Date.now();

    this.ws.sendMessage(tempMessage, tempMessage.chat.id);
    this.messageList.push(tempMessage);
    setTimeout(() => { this.bodyCard.scrollTop = this.bodyCard.scrollHeight; }, 100);

    console.log(form.content);
    this.content = '';
  }

}
