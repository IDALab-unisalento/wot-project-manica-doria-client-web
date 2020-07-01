import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';
import { DataSharingService } from 'src/app/services/data-sharing.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  _opened: boolean = true;

  constructor(

    private userService: UserService,
    private dataSharing: DataSharingService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {

  }

  _toggleSidebar() {
    this._opened = !this._opened;
  }

  goTo(path: string) {
    this.router.navigate([path], { relativeTo: this.route });
  }
}
