import { Component, OnInit, ViewChild } from '@angular/core';
import { Machine } from '../../../../models/machine';
import { Zone } from '../../../../models/zone';
import { Step } from '../../../../models/step';
import { MachineService } from '../../../../services/machine.service';
import { ZoneService } from '../../../../services/zone.service';
import { StepService } from '../../../../services/step.service';
import { MaintenanceService } from '../../../../services/maintenance.service';
import { Maintenance } from '../../../../models/maintenance';
import { Router } from '@angular/router';

@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.css']
})
export class MaintenanceComponent implements OnInit {

  machineList: Machine[];
  zoneList: Zone[];
  stepList: any[] = [];
  zone: Zone;
  maintenanceList: Maintenance[];
  maintenance: Maintenance ;
  step: Step;
  isCreate = false;

  @ViewChild('name') name: any;

  constructor(
    private machineService: MachineService,
    private stepService: StepService,
    private zoneService: ZoneService,
    private maintenanceService: MaintenanceService,
    private router: Router) { }

  ngOnInit() {
    this.getAllMachine();
    this.getAllMaintenanceToSend();
    this.getAllStepByMaintenance();
  }

  getAllMaintenanceToSend() {
    this.maintenanceService.getAllByStatus('to-send').subscribe(data => {
      this.maintenanceList = data;
    });
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
      this.isCreate = false;
      this.getAllMaintenanceToSend();
    });
  }

  getAllZoneByMachine() {
    const id_maintenance = (document.getElementById('inputGroupSelectMaintenance') as HTMLInputElement).value;
    const maintenance = this.maintenanceList.find(x => x.id === Number(id_maintenance));
    this.zoneService.getAllZoneByMachineId(maintenance.machine.id).subscribe(data => {
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
    const maintenance = (document.getElementById('inputGroupSelectMaintenance') as HTMLInputElement).value;
    this.stepService.getStepByMaintenanceId(Number(maintenance)).subscribe(data => {
      this.stepList = data;
      console.log(this.stepList);
    });
  }

  addStep() {
    this.step = {
      name: this.name.nativeElement.value,
      description: (document.getElementById('textAreaDescriptionStep') as HTMLInputElement).value,
      zone: this.zone,
      maintenance: {
        id: Number((document.getElementById('inputGroupSelectMaintenance') as HTMLInputElement).value),
      }
    };
    console.log('STEEEEEP', this.step);
    this.stepList.push(this.step);
  }

  deleteStep(id: number, myindex: number) {
    if (id !== undefined) {
      this.stepService.deleteStep(id).subscribe(data => {
        console.log(data);
        this.stepList.splice(myindex, 1);
      });
    } else {
      this.stepList.splice(myindex, 1);
    }
  }

  saveStep() {
    const maintenance = (document.getElementById('inputGroupSelectMaintenance') as HTMLInputElement).value;
    const main = { id: Number(maintenance) } as Maintenance;
    this.stepList[0].status = 'started';
    for (let i = 0; i < this.stepList.length; i++) {
      this.stepList[i].maintenance = main;
      console.log(this.stepList[i]);
      this.stepList[i].numbered = i + 1;
      if (i !== 0) {
        this.stepList[i].status = 'to-do';
      }
      this.stepService.saveStep(this.stepList[i]).subscribe(data => {
        console.log(data);
        this.router.navigateByUrl('/home/list-maintenance');
      });
    }
  }

  deleteMaintenance() {
    const maintenance = (document.getElementById('inputGroupSelectMaintenance') as HTMLInputElement).value;
    this.maintenanceService.deleteMaintenance(Number(maintenance)).subscribe(data => {
      console.log(data);
      this.getAllMaintenanceToSend();
    });
  }

  formMaintenance() {
    this.isCreate = true;
  }

  annulla() {
    this.isCreate = false;
  }
}
