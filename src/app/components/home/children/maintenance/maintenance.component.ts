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
import {Attachment} from '../../../../models/attachment';
import {AttachmentService} from '../../../../services/attachment.service';
import {map, mergeMap, switchMap} from 'rxjs/operators';
import {DomSanitizer} from '@angular/platform-browser';
import {stringify} from 'querystring';

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
  maintenanceList: Maintenance[];
  maintenance: Maintenance ;
  step: Step;
  attachmentList: Attachment[] = [];
  attachment: Attachment;
  isCreate = false;

  @ViewChild('name') name: any;
  @ViewChild('video') video: any;
  sanitizedImageData: any;

  constructor(
    private machineService: MachineService,
    private stepService: StepService,
    private zoneService: ZoneService,
    private maintenanceService: MaintenanceService,
    private attachmentService: AttachmentService,
    private sanitizer: DomSanitizer,
    private router: Router) { }

  ngOnInit() {
    this.getAllMachine();
    this.getAllMaintenanceToSend();
    //this.getAllStepByMaintenance();
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
    if (maintenance !== undefined) {
      this.zoneService.getAllZoneByMachineId(maintenance.machine.id).subscribe(data => {
        this.zoneList = data;
        console.log(this.zoneList);
      });
    }
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
      for (let i = 0; i < this.stepList.length; i++) {
        this.attachmentService.getAttachment(this.stepList[i].id).subscribe(data => {
          this.attachmentList = data;
          console.log('ATTA', this.attachmentList);
          this.stepList[i].attachmentList = this.attachmentList;
        });
      }
    });
  }

  addStep() {
    if (this.video.nativeElement.value != null || this.video.nativeElement.value !== '') {
      console.log(this.video.nativeElement.value);
      this.attachment = {
        path: this.video.nativeElement.value,
        type: 'video',
      };
      //this.attachmentList.push(this.attachment);
    }
    this.step = {
      name: this.name.nativeElement.value,
      description: (document.getElementById('textAreaDescriptionStep') as HTMLInputElement).value,
      zone: this.zone,
      maintenance: {
        id: Number((document.getElementById('inputGroupSelectMaintenance') as HTMLInputElement).value),
      },
      attachmentList: this.attachmentList,
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
        if (this.stepList[i].attachmentList.length !== 0) {
          for (let j = 0; j < this.stepList[i].attachmentList.length; j++) {
            if (this.stepList[i].attachmentList[j].type === 'image') {
              this.attachmentService.uploadFile(this.stepList[i].attachmentList[j].file, this.stepList[i].attachmentList[j].type, data.id).subscribe(data2 => {
                console.log(data2);
              });
            }
            if (this.stepList[i].attachmentList[j].type === 'video') {
              this.attachmentService.saveAttachment(this.stepList[i].attachmentList[j]).subscribe(data3 => {
                console.log(data3);
              });
            }
          }
        }
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

  onFileSelected(event) {
    console.log(event);
    this.attachmentList = [];
    for (let i = 0; i < event.target.files.length; i++) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[i]);
      reader.onloadend = () => {
        const base64 = reader.result;
        console.log(base64);
        /*if (typeof base64 === 'string') {
          this.sanitizedImageData = (this.sanitizer.bypassSecurityTrustUrl(base64));
        }*/
        //console.log('BS', this.sanitizedImageData);
        this.attachment = {
          file: event.target.files[i],
          encodedFile: base64.toString(),
          type: 'image',
        };
        this.attachmentList.push(this.attachment);
      };
    }
    console.log(this.attachmentList);
  }
}
