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
  //maintenance: Maintenance ;
  step: Step;
  attachmentList: Attachment[] = [];
  attachment: Attachment;
  video: string;
  isCreate = false;

  @ViewChild('name') name: any;
  //@ViewChild('video') video: any;
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
    this.maintenanceService.saveMaintenance(maintenance).subscribe(data => {
      console.log('Manutenzione creata', data);
      //this.maintenance = data;
      this.isCreate = false;
      this.getAllMaintenanceToSend();
    });
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
        this.attachmentService.getAttachment(this.stepList[i].id).subscribe(data2 => {
          this.attachmentList = data2;
          console.log('Attachment scaricati dal DB', this.attachmentList);
          // aggiorniamo la lista degli step scaricati dal db con gli attachment scaricati dal db relativo ad ogni step
          this.stepList[i].attachmentList = this.attachmentList;
          this.attachmentList = [];
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
        console.log('Zone associate al macchinario', this.zoneList);
      });
    }
  }

  // quando premiamo su aggiungi step stiamo selezionando la zona associata e poi lanciamo la funzione che lancia aggiungi step
  getZoneById() {
    const zone = (document.getElementById('inputGroupSelect02') as HTMLInputElement).value;
    this.zoneService.getZoneById(zone).subscribe(data => {
      console.log('Zona da associare allo step', data);
      this.zone = data;
      // aggiunge lo step
      this.addStep();
    });
  }

  // aggiungiamo lo step all'array degli step che poi andremo a salvare definitivamente nel db premendo il tasto salva e completa
  addStep() {
    /*if (this.video != null) {
      console.log(this.video);
      const videoY = this.video.split('watch?v=').join('embed/');
      this.sanitizedImageData = (this.sanitizer.bypassSecurityTrustUrl(videoY));
      console.log(videoY);
      this.attachment = {
        path: videoY,
        type: 'video',
      };
      this.attachmentList.push(this.attachment);
    }*/
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
    this.svuotaForm();
    this.stepList.push(this.step);
  }

  svuotaForm() {
    this.attachmentList = [];
    this.name.nativeElement.value = null;
    (document.getElementById('textAreaDescriptionStep') as HTMLInputElement).value = null;
    (document.getElementById('exampleFormControlFile1') as HTMLInputElement).value = null;
    this.video = null;
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

  // salviamo le foto prese dal pc nell'array degli attachment per poi poterle salvare nel db
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

  // salviamo gli steps nel db
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
}
