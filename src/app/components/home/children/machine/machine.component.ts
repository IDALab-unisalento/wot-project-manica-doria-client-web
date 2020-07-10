import { ZoneService } from './../../../../services/zone.service';
import { BeaconService } from './../../../../services/beacon.service';
import { MachineService } from './../../../../services/machine.service';
import { Zone } from './../../../../models/zone';
import { Beacon } from './../../../../models/beacon';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Machine } from 'src/app/models/machine';


@Component({
  selector: 'app-machine',
  templateUrl: './machine.component.html',
  styleUrls: ['./machine.component.scss']
})
export class MachineComponent implements OnInit {

  @ViewChild('name') name: any;
  @ViewChild('serialNumber') serialNumber: any;
  @ViewChild('inputGroupSelect01') select: HTMLInputElement;


  machineList: Machine[];
  beaconList: Beacon[];
  zoneList: Zone[] = [];
  machine: Machine;
  zone: Zone;

  isCreate = false;
  isAddZone = false;
  isSelectedMachine = false;
  machineSelected: string;

  constructor(private machineService: MachineService, private beaconService: BeaconService, private zoneService: ZoneService) { }

  ngOnInit() {
    this.getAllMachine();
    this.getAllBeacon();
    this.getAllZoneByMachine();
  }


  getAllMachine() {
    this.machineService.getAllMachine().subscribe(data => {
      this.machineList = data;
    });
  }

  getAllBeacon() {
    this.beaconService.getAllBeacon().subscribe(data => {
      this.beaconList = data;
    });
  }

  getAllZoneByMachine() {
    this.machineSelected = (document.getElementById('inputGroupSelect01') as HTMLInputElement).value;
    this.zoneService.getAllZoneByMachineId(Number(this.machineSelected)).subscribe(data => {
      this.zoneList = data;
      console.log(this.zoneList);
    });
  }

  showAddMachine() {
    this.isCreate = true;
  }

  showAddZone() {
    this.isAddZone = true;
  }

  hideAddZone() {
    this.isAddZone = false;
  }

  hideAddMachine() {
    this.isCreate = false;
  }

  addMachine(name: string, serialNumber: string) {

    this.machine = {
      name,
      serialNumber
    };
    this.machineService.saveMachine(this.machine).subscribe(data => {
      console.log(data);
      this.getAllMachine();
      this.name.nativeElement.value = null;
      this.serialNumber.nativeElement.value = null;
      this.isCreate = false;
    });
  }

  deleteZone(id: any, myindex: number) {
    console.log('DEL', id);
    this.zoneService.deleteZone(id).subscribe(data => {
      console.log('Eliminato', data);
      this.zoneList.splice(myindex, 1);
    });
  }

  deleteMachine() {
    const machine = (document.getElementById('inputGroupSelect01') as HTMLInputElement).value;
    if (machine !== 'Choose a Machine...') {
      this.machineService.deleteMachine(machine).subscribe(data => {
        console.log(data);
        this.zoneList = [];
        this.getAllMachine();
      });
    }
  }

  addZone(name: string) {
    const machine = (document.getElementById('inputGroupSelect01') as HTMLInputElement).value;
    const beacon = (document.getElementById('inputGroupSelect02') as HTMLInputElement).value;
    this.isAddZone = true;
    if (machine !== 'Choose a Machine...' && beacon !== 'Choose a Machine...') {
      this.zone = {
        name,
        beacon: {
          id: Number(beacon),
        },
        machine: {
          id: Number(machine),
        },
      };
      console.log(this.zone);
      this.zoneService.saveZone(this.zone).subscribe(data => {
        console.log(data);
        this.getAllZoneByMachine();
      });
      this.cancelZone();
    }

  }

  cancel() {
    this.name.nativeElement.value = null;
    this.serialNumber.nativeElement.value = null;
    this.isCreate = false;
  }
  cancelZone() {
    this.name.nativeElement.value = null;
    this.isAddZone = false;
  }
}
