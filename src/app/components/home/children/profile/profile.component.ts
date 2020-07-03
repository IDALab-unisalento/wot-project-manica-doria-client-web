import { User } from './../../../../models/user';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: User;
  oldPassword: string;

  constructor() { }

  ngOnInit(): void {
  }

  changePassword(form: any) {
    console.log('Password Cambiata');
  }

}
