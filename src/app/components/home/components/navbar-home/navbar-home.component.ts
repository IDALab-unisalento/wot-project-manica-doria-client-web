import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-navbar-home',
  templateUrl: './navbar-home.component.html',
  styleUrls: ['./navbar-home.component.css']
})
export class NavbarHomeComponent implements OnInit {

  _opened: boolean;
  @Output() showMenu: EventEmitter<boolean>;

  constructor() {
    this.showMenu = new EventEmitter<boolean>();
  }

  ngOnInit(): void {
  }

  _toggleSidebar() {
    this.showMenu.emit();
    this._opened = !this._opened;
  }

}
