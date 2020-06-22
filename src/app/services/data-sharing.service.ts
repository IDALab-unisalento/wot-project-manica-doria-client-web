import { Observable } from 'rxjs';
import { Maintenance } from '../models/maintenance';
import { Injectable } from '@angular/core';
import {Step} from '../models/step';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {

  private maintenace: Maintenance;
  private step: Step;

  constructor() { }

  getCurrentMaintenance(): Observable<Maintenance> {
    return new Observable(observer => {
      observer.next(this.maintenace);
    });
  }

  setCurrentMaintenance(maintenace: Maintenance): void {
    this.maintenace = maintenace;
  }

  getCurrentStep(): Observable<Step> {
    return new Observable(observer => {
      observer.next(this.step);
    });
  }

  setCurrentStep(step: Step): void {
    this.step = step;
  }


}

