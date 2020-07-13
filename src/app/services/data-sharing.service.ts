import { User } from './../models/user';
import { Observable, observable, BehaviorSubject } from 'rxjs';
import { Maintenance } from '../models/maintenance';
import { Injectable } from '@angular/core';
import { Step } from '../models/step';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {

  private user = new BehaviorSubject({} as User);
  private maintenanceName = new BehaviorSubject({} as string);
  private step = new BehaviorSubject({} as Step);
  private maintenace = new BehaviorSubject({} as Maintenance);

  constructor() { }

  setCurrentMaintenance(maintenace: Maintenance): void {
    this.maintenace.next(maintenace);
  }

  setCurrentStep(step: Step): void {
    this.step.next(step);
  }

  setCurrentUser(user: User): void {
    this.user.next(user);
  }

  setMaintenanceChat(maintenaceName: string): void {
    this.maintenanceName.next(maintenaceName);
  }

  getCurrentUser(): BehaviorSubject<User> {
    return this.user;
  }

  getCurrentMaintenanceName(): BehaviorSubject<string> {
    return this.maintenanceName;
  }

  getCurrentMaintenace(): BehaviorSubject<Maintenance> {
    return this.maintenace;
  }

  getCurrentStep(): BehaviorSubject<Step> {
    return this.step;
  }

}

