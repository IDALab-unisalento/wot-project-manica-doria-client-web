import { User } from './../../../../models/user';
import { DataSharingService } from './../../../../services/data-sharing.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-operator',
  templateUrl: './operator.component.html',
  styleUrls: ['./operator.component.css']
})
export class OperatorComponent implements OnInit {
  user: User;

  constructor(private dataSharing: DataSharingService) { }

  ngOnInit(): void {

  }

}
