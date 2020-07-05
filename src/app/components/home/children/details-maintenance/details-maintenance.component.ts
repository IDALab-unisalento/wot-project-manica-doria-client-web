import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MaintenanceService} from '../../../../services/maintenance.service';
import {Maintenance} from '../../../../models/maintenance';
import {StepService} from '../../../../services/step.service';
import {Step} from '../../../../models/step';

@Component({
  selector: 'app-details-maintenance',
  templateUrl: './details-maintenance.component.html',
  styleUrls: ['./details-maintenance.component.css']
})
export class DetailsMaintenanceComponent implements OnInit {

  maintenance: Maintenance;
  stepList: Step[];

  constructor(private route: ActivatedRoute, private maintenanceService: MaintenanceService, private stepService: StepService) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id-maintenance');
    console.log(id);
    this.getDetailsMaintenance(id);
  }

  getDetailsMaintenance(id: number) {
    this.maintenanceService.getMaintenanceById(id).subscribe(data => {
      console.log(data);
      this.maintenance = data;
      this.getStepsByMaintenance(id);
    });
  }

  getStepsByMaintenance(id: number) {
    this.stepService.getStepByMaintenanceId(id).subscribe(data => {
      console.log(data);
      this.stepList = data;
    });
  }

}
