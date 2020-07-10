import { Component, OnInit } from '@angular/core';
import { Maintenance } from '../../../../models/maintenance';
import { MaintenanceService } from '../../../../services/maintenance.service';
import { User } from '../../../../models/user';
import { UserService } from '../../../../services/user.service';
import { Router } from '@angular/router';
import { UserMaintenanceService } from '../../../../services/user-maintenance.service';
import { UserMaintenance } from '../../../../models/user-maintenance';

@Component({
  selector: 'app-list-maintenance',
  templateUrl: './list-maintenance.component.html',
  styleUrls: ['./list-maintenance.component.scss']
})
export class ListMaintenanceComponent implements OnInit {

  maintenanceList: Maintenance[];
  userList: User[];
  userMaintenance: UserMaintenance;

  constructor(
    private maintenanceService: MaintenanceService,
    private userMaintenanceService: UserMaintenanceService,
    private userService: UserService,
    private router: Router) { }

  ngOnInit() {
    this.getAllMaintenanceToSend();
    this.getAllUser();
    const date = new Date().toISOString();
    const dateSql = date.split('.');
    console.log(dateSql[0]);
  }

  getAllMaintenanceToSend() {
    this.maintenanceService.getAllByStatus('to-send').subscribe(data => {
      this.maintenanceList = data;
    });
  }

  getAllUser() {
    this.userService.getAllUser().subscribe(data => {
      console.log(data);
      this.userList = data;
    });
  }

  deleteMaintenance() {
    const maintenance = (document.getElementById('inputGroupSelect01') as HTMLInputElement).value;
    this.maintenanceService.deleteMaintenance(Number(maintenance)).subscribe(data => {
      console.log(data);
      this.getAllMaintenanceToSend();
    });
  }

  goToMaintenance() {
    this.router.navigateByUrl('/home/maintenance');
  }

  goToUser() {
    this.router.navigateByUrl('/home/operator');
  }

  forwardMaintenance() {
    const user = (document.getElementById('inputGroupSelect02') as HTMLInputElement).value;
    const maintenance = (document.getElementById('inputGroupSelect01') as HTMLInputElement).value;
    const date = new Date();
    date.setHours(date.getHours() + 2); // +2 italy date
    this.userMaintenance = {
      user: {
        id: Number(user),
      },
      maintenance: {
        id: Number(maintenance),
      },
      date: date.toISOString(),
      status: 'forwarded',
    };
    console.log(this.userMaintenance);
    this.userMaintenanceService.saveUM(this.userMaintenance).subscribe(data => {
      console.log(data);
      this.getAllMaintenanceToSend();
    });
  }
}
