import { User } from './../../../../models/user';
import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../../services/user.service';
import {DataSharingService} from '../../../../services/data-sharing.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: User;
  oldPassword: string;

  constructor(private dataSharing: DataSharingService) { }

  ngOnInit(): void {
    this.dataSharing.getCurrentUser().subscribe(data => {
      this.user = data;
    });
  }

  changePassword(form: any) {
    console.log('Password Cambiata');
  }

}
