import { Component, OnInit, ViewChild } from '@angular/core';
import { BeaconService } from '../../../../services/beacon.service';
import { Beacon } from '../../../../models/beacon';

@Component({
  selector: 'app-beacon',
  templateUrl: './beacon.component.html',
  styleUrls: ['./beacon.component.css']
})
export class BeaconComponent implements OnInit {

  @ViewChild('name') name: any;
  @ViewChild('mac') mac: any;

  beaconList: Beacon[];
  beacon: Beacon;

  isModify = false;
  id: number;
  index: number;

  constructor(private beaconService: BeaconService) { }

  ngOnInit() {
    console.log('init');
    this.getAllBeacon();
  }

  createBeacon(name: string, mac: string) {
    this.beacon = {
      name,
      mac,
    };
    this.beaconService.saveBeacon(this.beacon).subscribe(data => {
      this.beaconList.push(data);
      this.name.nativeElement.value = null;
      this.mac.nativeElement.value = null;
    });
  }

  getAllBeacon() {
    this.beaconService.getAllBeacon().subscribe(data => {
      this.beaconList = data;
      console.log(this.beaconList)
    });
  }

  modifyBeacon(id: number, name: string, mac: string, index: number) {
    console.log('MOD');
    this.id = id;
    this.index = index;
    this.name.nativeElement.value = name;
    this.mac.nativeElement.value = mac;
    this.isModify = true;
    console.log('ID', id);
  }

  deleteBeacon(id: number, index: number) {
    console.log('DEL', id);
    this.beaconService.deleteBeacon(id).subscribe(data => {
      console.log('Eliminato', data);
      this.beaconList.splice(index, 1);
    });
  }

  modify(name: string, mac: string) {
    this.beacon = {
      id: this.id,
      name,
      mac,
    };
    console.log(this.beacon);
    this.beaconService.modifyBeacon(this.beacon).subscribe(data => {
      this.name.nativeElement.value = null;
      this.mac.nativeElement.value = null;
      this.isModify = false;
      this.getAllBeacon();
    });
  }

  annulla() {
    this.name.nativeElement.value = null;
    this.mac.nativeElement.value = null;
    this.isModify = false;
  }
}
