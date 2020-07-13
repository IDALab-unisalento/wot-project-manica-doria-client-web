import { User } from 'src/app/models/user';
import { Chat } from './../models/chat';
import { ActivatedRoute } from '@angular/router';
import { ApiVariables } from './../common/ApiVariables';
import { Message } from './../models/message';
import { Injectable } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WsService {

  webSocketEndPoint = 'http://' + ApiVariables.localhost + '/ws';
  topic = '/topic/greetings/';

  stompClient: any;
  messageReceived: any;
  observeMessage: any;

  isConnected = false;

  constructor(private route: ActivatedRoute) {
    this.observeMessage = new BehaviorSubject<any>(this.messageReceived);
  }

  connect(id: number) {
    console.log('Initialize WebSocket Connection');
    const ws = new SockJS(this.webSocketEndPoint);
    this.stompClient = Stomp.over(ws);
    this.stompClient.connect({}, (frame: any) => {
      this.stompClient.subscribe(this.topic + id, (msgEvent: any) => {
        this.onReceived(msgEvent);
      });
    }, this.errorCallBack);
  }

  disconnect() {
    if (this.stompClient !== null) {
      this.stompClient.disconnect();
      this.isConnected = false;
    }
    console.log('Disconnected');
  }

  // on error, schedule a reconnection attempt
  errorCallBack(error, id: number) {
    console.log('errorCallBack -> ' + error);
    setTimeout(() => {
      this.connect(id);
    }, 5000);
  }

  onReceived(msg: any): void {
    const msgBody = JSON.parse(msg.body);
    this.isConnected = true;
    let received = {
      content: msgBody.content,
      date: msgBody.date,
      user: msgBody.user,
      chat: {
        id: msg.headers.destination.split('/').slice(-1).pop()
      }
    } as Message;
    console.log('POST CREATION:>>', received)
    this.observeMessage.next(received);
  }

  sendMessage(message: Message, id: number) {
    this.stompClient.send('/app/chat/' + id, {}, JSON.stringify(message));
  }
}
