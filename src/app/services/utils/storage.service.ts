import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Router} from '@angular/router';
import {User} from '../../models/user';


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
    localStorage.setItem('EMAIL_KEY', user.email);
    localStorage.setItem('NAME_KEY', user.name);
    localStorage.setItem('ROLE_KEY', user.role);
  }

  static getEmail() {
    return localStorage.getItem('EMAIL_KEY');
  }

  static getRole() {
    return localStorage.getItem('NAME_KEY');
  }

  static getId() {
    return localStorage.getItem('ROLE_KEY');
  }

  ifLoggedIn() {
    this.email = localStorage.getItem('EMAIL_KEY');
    return this.email != null;
  }

  login(user: User) {
    StorageService.setUser(user);
    this.authState.next(true);
    this.router.navigateByUrl('home');
  }

  logout() {
    localStorage.clear();
    this.authState.next(false);
    window.location.reload();
  }

  isAuthenticated() {
    return this.authState.value;
  }

}
