import {Component, OnInit, ViewChild} from '@angular/core';
import {Zone} from '../../../models/zone';
import {Machine} from '../../../models/machine';
import {MachineService} from '../../../services/machine.service';
import {BeaconService} from '../../../services/beacon.service';
import {Beacon} from '../../../models/beacon';
import {ZoneService} from '../../../services/zone.service';

@Component({
  selector: 'app-machine',
  templateUrl: './machine.component.html',
  styleUrls: ['./machine.component.css']
})
export class MachineComponent implements OnInit {

  @ViewChild('name') name: any;
  @ViewChild('serialNumber') serialNumber: any;

  machineList: Machine[];
  beaconList: Beacon[];
  zoneList: Zone[] = [];
  machine: Machine;
  zone: Zone;

  isCreate = false;

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
    const machine = document.getElementById('inputGroupSelect01').value;
    if (machine !== 'Choose...') {
      this.zoneService.getAllZoneByMachineId(machine).subscribe(data => {
        this.zoneList = data;
        console.log(this.zoneList);
      });
    }
  }

  showAddMachine() {
    this.isCreate = true;
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
    
  }

  deleteMachine() {
    const machine = document.getElementById('inputGroupSelect01').value;
    if (machine !== 'Choose...') {
      this.machineService.deleteMachine(machine).subscribe(data => {
        console.log(data);
        this.getAllMachine();
      });
    }
  }

  addZone(name: string) {
    const machine = document.getElementById('inputGroupSelect01').value;
    const beacon = document.getElementById('inputGroupSelect02').value;
    if (machine !== 'Choose...' && beacon !== 'Choose...') {
      this.zone = {
        name,
        beacon: {
          id: beacon,
        },
        machine: {
          id: machine,
        },
      };
      console.log(this.zone);
      this.zoneService.saveZone(this.zone).subscribe(data => {
        console.log(data);
        this.getAllZoneByMachine();
      });
    }
  }
}
