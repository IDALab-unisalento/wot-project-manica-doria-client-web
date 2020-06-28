import {Component, OnInit, ViewChild} from '@angular/core';
import {Machine} from '../../../models/machine';
import {Zone} from '../../../models/zone';
import {Step} from '../../../models/step';
import {MachineService} from '../../../services/machine.service';
import {ZoneService} from '../../../services/zone.service';
import {StepService} from '../../../services/step.service';
import {MaintenanceService} from '../../../services/maintenance.service';
import {Maintenance} from '../../../models/maintenance';

@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.css']
})
export class MaintenanceComponent implements OnInit {

  machineList: Machine[];
  zoneList: Zone[];
  stepList: Step[] = [];
  maintenanceList: Maintenance[];
  step: Step;
  isCreate = false;

  @ViewChild('name') name: any;
  
  constructor(private machineService: MachineService, private stepService: StepService, private zoneService: ZoneService, private maintenanceService: MaintenanceService) { }

  ngOnInit() {
    this.getAllMachine();
  }

  getAllMachine() {
    this.machineService.getAllMachine().subscribe(data => {
      this.machineList = data;
    });
  }

  getMaintenanceByMachine() {
    const machine = (document.getElementById('inputGroupSelect01') as HTMLInputElement).value;
    this.maintenanceService.getMaintenanceByMachine(machine).subscribe(data => {
      console.log(data);
      this.maintenanceList = data;
    });
  }

  getAllZoneByMachine() {
    const machine = (document.getElementById('inputGroupSelect01') as HTMLInputElement).value;
    this.zoneService.getAllZoneByMachineId(machine).subscribe(data => {
      this.zoneList = data;
      console.log(this.zoneList);
    });
  }

  getAllStepByZone() {
    const zone = (document.getElementById('inputGroupSelect02') as HTMLInputElement).value;
    console.log(zone);
    this.stepService.getStepByZoneId(zone).subscribe(data => {
      this.stepList = data;
    });
  }

  addStep() {
    this.step = {
      name: this.name.nativeElement.value,
      zone: {
        id: Number((document.getElementById('inputGroupSelect02') as HTMLInputElement).value),
      },
    };
    this.stepList.push(this.step);
  }

  deleteStep(myindex: number) {
    this.stepList.splice(myindex, 1);
  }

  saveStep() {
    for (const step of this.stepList) {
      this.stepService.saveStep(step).subscribe(data => {
        console.log(data);
      });
    }
  }

  showAddMaintenance() {
    this.isCreate = true;
  }
  
  hideAddMaintenance() {
    this.isCreate = false;
  }

  addMaintenance(value: string, value2: string) {
    
  }
}
