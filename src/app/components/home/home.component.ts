import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  _opened: boolean = true;

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  _toggleSidebar() {
    this._opened = !this._opened;
  }

  goTo(path: string) {
    this.router.navigate([path], { relativeTo: this.route });
  }
}
