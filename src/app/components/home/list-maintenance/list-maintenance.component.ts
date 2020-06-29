import { Component, OnInit } from '@angular/core';
import {Maintenance} from '../../../models/maintenance';
import {MaintenanceService} from '../../../services/maintenance.service';

@Component({
  selector: 'app-list-maintenance',
  templateUrl: './list-maintenance.component.html',
  styleUrls: ['./list-maintenance.component.css']
})
export class ListMaintenanceComponent implements OnInit {

  maintenanceList: Maintenance[];

  constructor(private maintenanceService: MaintenanceService) { }

  ngOnInit() {
    this.getAllMaintenace();
  }

  getAllMaintenace() {
    this.maintenanceService.getAllByStatus('to-send').subscribe(data => {
      this.maintenanceList = data;
    });
  }

  deleteMaintenance(id: number, myindex: number) {
    this.maintenanceService.deleteMaintenance(id).subscribe(data => {
      console.log(data);
      this.maintenanceList.splice(myindex, 1);
    });
  }
}
