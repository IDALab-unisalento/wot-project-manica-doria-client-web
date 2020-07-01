import { Router } from '@angular/router';
import { StorageService } from './../../../../services/storage.service';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-navbar-home',
  templateUrl: './navbar-home.component.html',
  styleUrls: ['./navbar-home.component.css']
})
export class NavbarHomeComponent implements OnInit {

  _opened: boolean;
  @Output() showMenu: EventEmitter<boolean>;

  constructor(private storage: StorageService, private router: Router) {
    this.showMenu = new EventEmitter<boolean>();
  }

  ngOnInit(): void {
  }

  _toggleSidebar() {
    this.showMenu.emit();
    this._opened = !this._opened;
  }

  logout() {
    this.storage.logout();
    this.router.navigate(['login']);
  }
}
