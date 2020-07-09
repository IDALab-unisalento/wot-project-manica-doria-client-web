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
import { Attachment } from '../../../../models/attachment';
import { AttachmentService } from '../../../../services/attachment.service';
import { DomSanitizer } from '@angular/platform-browser';
import * as moment from 'moment';
import {split} from 'ts-node';

@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.scss']
})
export class MaintenanceComponent implements OnInit {

  machineList: Machine[];
  zoneList: Zone[];
  stepList: Step[] = [];
  zone: Zone;
  maintenanceList: Maintenance[];
  newMaintenance = { } as Maintenance;
  step: Step;
  attachmentList: Attachment[] = [];
  attachment: Attachment;
  //video: string;
  isCreate = false;


  fileName = 'Select one or more Image';
  selectedStep = {
    zone: {
      beacon: {}
    }
  } as Step;

  @ViewChild('name') name: any;
  //@ViewChild('video') video: any;
  sanitizedImageData: any;
  saveMaintenanceError = false;
  addStepError = false;
  selectedMaintenanceError = false;

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

  // scarichiamo tutte le manutenzioni da inoltrare
  getAllMaintenanceToSend() {
    this.maintenanceService.getAllByStatus('to-send').subscribe(data => {
      this.maintenanceList = data;
    });
  }

  // scarichiamo tutti i macchinari che servono per la creazione della manutenzione
  getAllMachine() {
    this.machineService.getAllMachine().subscribe(data => {
      this.machineList = data;
    });
  }

  // attiviamo il form di creazione della manutenzione
  formMaintenance() {
    this.isCreate = true;
  }

  // nascondiamo il form di creazione della manutenzione
  annulla() {
    this.isCreate = false;
  }

  // salviamo la manutenzione per poi andare ad aggiungergli gli steps
  saveMaintenance() {
    const maintenance = {
      name: this.name.nativeElement.value,
      status: 'to-send',
      description: (document.getElementById('textAreaDescriptionMaintenance') as HTMLInputElement).value,
      type: (document.getElementById('inputGroupSelect04') as HTMLInputElement).value,
      machine: {
        id: Number((document.getElementById('inputGroupSelect01') as HTMLInputElement).value),
      }
    };
    if (this.name.nativeElement.value !== '' && (document.getElementById('textAreaDescriptionMaintenance') as HTMLInputElement).value !== '' &&
       (document.getElementById('inputGroupSelect01') as HTMLInputElement).value !== '0' && (document.getElementById('inputGroupSelect04') as HTMLInputElement).value !== '0') {
    this.maintenanceService.saveMaintenance(maintenance).subscribe(data => {
        console.log('Manutenzione creata', data);
        this.isCreate = false;
        this.getAllMaintenanceToSend();
        this.saveMaintenanceError = false;
      });
    } else {
      this.saveMaintenanceError = true;
    }
  }

  // cancelliamo la manutenzione selezionata
  deleteMaintenance() {
    const maintenance = (document.getElementById('inputGroupSelectMaintenance') as HTMLInputElement).value;
    this.maintenanceService.deleteMaintenance(Number(maintenance)).subscribe(data => {
      console.log('Manutenzione eliminata', data);
      this.getAllMaintenanceToSend();
    });
  }

  // una volta selezionata la manutenzione scarichiamo tutti gli steps creati in precedenza
  getAllStepByMaintenance() {
    const maintenance = (document.getElementById('inputGroupSelectMaintenance') as HTMLInputElement).value;
    this.stepService.getStepByMaintenanceId(Number(maintenance)).subscribe(data => {
      this.stepList = data;
      console.log('Steps scaricati dal DB', this.stepList);
      for (let i = 0; i < this.stepList.length; i++) {
        console.log(this.stepList[i].id);
        this.attachmentService.getAttachment(this.stepList[i].id).subscribe(data2 => {
          this.attachmentList = data2;
          console.log('Attachment scaricati dal DB dello step ', this.stepList[i].id, this.attachmentList);
          // aggiorniamo la lista degli step scaricati dal db con gli attachment scaricati dal db relativo ad ogni step
          this.stepList[i].attachmentList = this.attachmentList;
          this.attachmentList = []; // la svuotiamo per riutilizzarla
        });
      }
    });
  }

  // una volta selezionata manutenzione scarichiamo le zone che sono presenti nella macchinario associato
  getAllZoneByMachine() {
    const id_maintenance = (document.getElementById('inputGroupSelectMaintenance') as HTMLInputElement).value;
    const maintenance = this.maintenanceList.find(x => x.id === Number(id_maintenance));
    if (maintenance !== undefined) {
      this.zoneService.getAllZoneByMachineId(maintenance.machine.id).subscribe(data => {
        this.zoneList = data;
        //console.log('Zone associate al macchinario', this.zoneList);
      });
    }
  }

  // quando premiamo su aggiungi step stiamo selezionando la zona associata e poi lanciamo la funzione che lancia aggiungi step
  getZoneById() {
    if ((document.getElementById('inputGroupSelectMaintenance') as HTMLInputElement).value !== '0') {
      const zone = (document.getElementById('inputGroupSelect02') as HTMLInputElement).value;
      console.log(zone);
      if ((document.getElementById('inputGroupSelect02') as HTMLInputElement).value !== '0') {
        this.zoneService.getZoneById(zone).subscribe(data => {
          this.zone = data;
          // aggiunge lo step
          this.addStep();
        });
      } else {
        this.addStepError = true;
      }
      this.selectedMaintenanceError = false;
    } else {
      this.selectedMaintenanceError = true;
    }
  }

  // salviamo le foto prese dal pc nell'array degli attachment per poi poterle salvare nel db
  onFileSelected(event) {
    //console.log('Event: ', event);
    this.attachmentList = [];
    this.printImageSelected(event.target.files);
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
    console.log('AttachmentList dopo il select file', this.attachmentList);
  }

  // aggiungiamo lo step all'array degli step che poi andremo a salvare definitivamente nel db premendo il tasto salva e completa
  addStep() {
    /*if (this.video != null) {
      console.log(this.video);
      //const videoY = this.video.split('watch?v=').join('embed/');
      //this.sanitizedImageData = (this.sanitizer.bypassSecurityTrustUrl(videoY));
      //console.log(videoY);
      console.log('Prima', this.attachment);
      this.attachment = {
        path: this.video,
        type: 'video',
      };
      console.log('Dopo', this.attachment);
      this.attachmentList.push(this.attachment);
      console.log('Attachment dopo il video', this.attachmentList);
    }*/
    this.step = {
      name: this.name.nativeElement.value,
      description: (document.getElementById('textAreaDescriptionStep') as HTMLInputElement).value,
      duration: this.getStepTime(),
      zone: this.zone,
      maintenance: {
        id: Number((document.getElementById('inputGroupSelectMaintenance') as HTMLInputElement).value),
      },
      attachmentList: this.attachmentList,
    };
    if (this.name.nativeElement.value !== '' && (document.getElementById('textAreaDescriptionStep') as HTMLInputElement).value !== ''
    && (document.getElementById('inputGroupSelectMaintenance') as HTMLInputElement).value !== '0') {
      console.log('Step Aggiunto', this.step);
      this.svuotaForm();
      this.stepList.push(this.step);
      console.log('ALL Step After add', this.stepList);
      this.addStepError = false;
    } else {
      this.addStepError = true;
    }
  }

  svuotaForm() {
    this.attachmentList = [];
    this.name.nativeElement.value = null;
    (document.getElementById('textAreaDescriptionStep') as HTMLInputElement).value = null;
    (document.getElementById('inputImage') as HTMLInputElement).value = null;
    //this.video = null;
  }

  // cancelliamo gli step dall'array (se era già presente nel db lo elimina dal db)
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



  // salviamo gli steps nel db
  saveStep() {
    const maintenance = (document.getElementById('inputGroupSelectMaintenance') as HTMLInputElement).value;
    const main = { id: Number(maintenance) } as Maintenance;
    this.stepList[0].status = 'in-progress';
    for (let i = 0; i < this.stepList.length; i++) {
      this.stepList[i].maintenance = main;
      console.log('Step List:', this.stepList[i]);
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
              this.attachmentService.saveVideo(this.stepList[i].attachmentList[j], data.id).subscribe(data3 => {
                console.log(data3);
              });
            }
          }
        }
        this.router.navigateByUrl('/home/list-maintenance');
      });
    }
    console.log('SAVE', this.stepList);
  }

  iframeDidLoad(path: string) {
    console.log(path);
    //(document.getElementById('myIframe') as HTMLInputElement).setAttribute('src', path);
  }

  getStepTime(): number {
    const time = (document.getElementById('appt') as HTMLInputElement).value;
    const t = time.split(':');
    const min = Number(t[1]) * 60000;
    const hours = Number(t[0]) * 3600000;
    return min + hours;
  }

  printImageSelected(images: any) {
    this.fileName = '';
    for (const image of images) {
      this.fileName = this.fileName + image.name + '; ';
    }
  }

  selectStepDetails(step: Step) {
    this.attachmentList = step.attachmentList;
    this.selectedStep = step;
  }
}
