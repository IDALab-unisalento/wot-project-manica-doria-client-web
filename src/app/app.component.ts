import { Router } from '@angular/router';
import { DataSharingService } from './services/data-sharing.service';
import { UserService } from './services/user.service';
import { StorageService } from './services/storage.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'client-web';

  constructor(private storage: StorageService, private userService: UserService, private dataSharing: DataSharingService, private router: Router) {
    this.initializeApp();
  }
  ngOnInit(): void {

  }

  initializeApp() {
    this.storage.authState.subscribe(state => {
      console.log('STATO :>>', state);
      if (state) {
        this.userService.getUserById(StorageService.getId()).subscribe(
          user => {
            this.dataSharing.setCurrentUser(user);
            this.router.navigate(['home']);
          });
      }
    });

  }

}
