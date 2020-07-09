import { Message } from './../../../../models/message';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  currentUser = {
    name: `Mimmo`,
    surname: `D'Oria`,
    role: `Operatore`
  } as User;

  messageList: Message[] = [
    {
      id: 1,
      content: `Ciao sono il messaggio dell'operatore`,
      date: Date.now(),
      user: {
        name: `Mimmo`,
        surname: `D'Oria`,
        role: `Operatore`
      }
    },
    {
      id: 2,
      content: `Ciao sono il messaggio dell'manager`,
      date: Date.now() + 1000000,
      user: {
        name: `Alessandro`,
        surname: `Manica`,
        role: `Manager`
      }
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
