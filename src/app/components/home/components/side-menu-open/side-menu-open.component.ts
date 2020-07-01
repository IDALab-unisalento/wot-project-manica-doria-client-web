import { StorageService } from './../../../../services/storage.service';
import { User } from './../../../../models/user';
import { DataSharingService } from './../../../../services/data-sharing.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-menu-open',
  templateUrl: './side-menu-open.component.html',
  styleUrls: ['./side-menu-open.component.css']
})
export class SideMenuOpenComponent implements OnInit {

  user = {} as User;
  surname: string;
  name: string;

  constructor(private dataSharing: DataSharingService) { }

  ngOnInit(): void {
    this.user.name = StorageService.getValue('NAME_KEY');
    this.user.surname = StorageService.getValue('SURNAME_KEY');
    this.dataSharing.getCurrentUser().subscribe(user => {
      this.user = user;
      console.log(user);
    });
  }



}
