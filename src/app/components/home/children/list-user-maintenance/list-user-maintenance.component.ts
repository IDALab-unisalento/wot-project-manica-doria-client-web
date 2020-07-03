import { Component, OnInit } from '@angular/core';
import {UserMaintenance} from '../../../../models/user-maintenance';
import {UserMaintenanceService} from '../../../../services/user-maintenance.service';

@Component({
  selector: 'app-list-user-maintenance',
  templateUrl: './list-user-maintenance.component.html',
  styleUrls: ['./list-user-maintenance.component.css']
})
export class ListUserMaintenanceComponent implements OnInit {

  userMaintenanceList: UserMaintenance[];

  constructor(private userMaintenanceService: UserMaintenanceService) { }

  ngOnInit(): void {
  }

  getAllUserMaintenanceByStatus(status: string) {
    this.userMaintenanceService.getAllUMByStatus(status).subscribe(data => {
      console.log(data);
      this.userMaintenanceList = data;
    });
  }

}
