import { Injectable } from '@angular/core';
import {StorageService} from './storage.service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(public storageService: StorageService, private router: Router) {}

  canActivate(): boolean {
    const value = this.storageService.isAuthenticated();
    if (!value) {
      // initially was just redirecting here, but following the
      // documentation I updated code to return a UrlTree
      // this.router.navigateByUrl("/login", { skipLocationChange: true })

      this.router.navigateByUrl('/login');
    }
    return value;
  }
}
