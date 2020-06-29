import {Component, OnInit, ViewChild} from '@angular/core';
import {Machine} from '../../../models/machine';
import {Zone} from '../../../models/zone';
import {Step} from '../../../models/step';
import {MachineService} from '../../../services/machine.service';
import {ZoneService} from '../../../services/zone.service';
import {StepService} from '../../../services/step.service';
import {MaintenanceService} from '../../../services/maintenance.service';
import {Maintenance} from '../../../models/maintenance';
import {Router} from '@angular/router';

@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.css']
})
export class MaintenanceComponent implements OnInit {

  machineList: Machine[];
  zoneList: Zone[];
  stepList: Step[] = [];
  zone: Zone;
  maintenance: Maintenance;
  step: Step;
  isCreate = false;

  @ViewChild('name') name: any;
  
  constructor(private machineService: MachineService,
              private stepService: StepService,
              private zoneService: ZoneService,
              private maintenanceService: MaintenanceService,
              private router: Router) { }

  ngOnInit() {
    this.getAllMachine();
  }

  getAllMachine() {
    this.machineService.getAllMachine().subscribe(data => {
      this.machineList = data;
    });
  }

  saveMaintenance() {
    this.maintenance = {
      name: this.name.nativeElement.value,
      status: 'to-send',
      description: (document.getElementById('textAreaDescriptionMaintenance') as HTMLInputElement).value,
      type: (document.getElementById('inputGroupSelect04') as HTMLInputElement).value,
      machine: {
        id: Number((document.getElementById('inputGroupSelect01') as HTMLInputElement).value),
      }
    };
    this.maintenanceService.saveMaintenance(this.maintenance).subscribe(data => {
      console.log(data);
      this.maintenance = data;
      this.isCreate = true;
    });
  }

  getAllZoneByMachine() {
    const machine = (document.getElementById('inputGroupSelect01') as HTMLInputElement).value;
    this.zoneService.getAllZoneByMachineId(machine).subscribe(data => {
      this.zoneList = data;
      console.log(this.zoneList);
    });
  }

  getZoneById() {
    const zone = (document.getElementById('inputGroupSelect02') as HTMLInputElement).value;
    this.zoneService.getZoneById(zone).subscribe(data => {
      console.log(data);
      this.zone = data;
      this.addStep();
    });
  }

  getAllStepByMaintenance() {
    this.stepService.getStepByMaintenanceId(this.maintenance.id).subscribe(data => {
      this.stepList = data;
    });
  }

  addStep() {
    this.step = {
      name: this.name.nativeElement.value,
      description: (document.getElementById('textAreaDescriptionStep') as HTMLInputElement).value,
      zone: this.zone,
      maintenance: {
        id: this.maintenance.id,
      }
    };
    console.log('STEEEEEP', this.step);
    this.stepList.push(this.step);
  }

  deleteStep(myindex: number) {
    this.stepList.splice(myindex, 1);
  }

  saveStep() {
    for (let i = 0; i < this.stepList.length; i++) {
      this.stepList[i].numbered = i + 1;
      this.stepService.saveStep(this.stepList[i]).subscribe(data => {
        console.log(data);
        this.router.navigateByUrl('list-maintenance');
      });
    }
  }

  deleteMaintenance() {
    this.maintenanceService.deleteMaintenance(this.maintenance.id).subscribe(data => {
      console.log('Eliminato', data);
      this.isCreate = false;
    });
  }
}
