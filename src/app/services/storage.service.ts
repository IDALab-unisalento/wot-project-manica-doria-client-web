import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  authState = new BehaviorSubject(false);
  email: any;

  constructor(private router: Router) {
    this.ifLoggedIn();
  }

  static setUser(user: User) {
    localStorage.setItem('ID_KEY', String(user.id));
    localStorage.setItem('EMAIL_KEY', user.email);
    localStorage.setItem('NAME_KEY', user.name);
    localStorage.setItem('ROLE_KEY', user.role);
  }

  static getEmail() {
    return localStorage.getItem('EMAIL_KEY');
  }

  static getRole() {
    return localStorage.getItem('ROLE_KEY');
  }

  static getId() {
    return localStorage.getItem('ID_KEY');
  }

  static getValue(key: string) {
    return localStorage.getItem(key);
  }

  ifLoggedIn() {
    this.email = localStorage.getItem('EMAIL_KEY');
    if (this.email !== null) {
      return this.authState.next(true);
    } else {
      return this.authState.next(false);
    }
  }

  login(user: User) {
    StorageService.setUser(user);
    this.authState.next(true);
    this.router.navigateByUrl('home');
  }

  logout() {
    this.authState.next(false);
    localStorage.clear();
    this.router.navigate(['login']);
  }

  isAuthenticated() {
    return this.authState.value;
  }

}
