import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, from, throwError } from 'rxjs';
import { UserLogin } from '../models/user';
import { User } from '../models/user';
import { ApiVariables } from '../common/ApiVariables';
import {StorageService} from './storage.service';
import { catchError, map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private loginUrl = ApiVariables.apiUrlUser + '/login/';

  constructor(private http: HttpClient, private storageService: StorageService) { }

  login(user: UserLogin): Observable<User> {
    return this.http.get<User>(this.loginUrl + `${user.email}/${user.password}`).pipe(
        tap( data =>  this.storageService.login(data)),
      catchError(this.handleError)
    );
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      console.log(error);
      errorMessage = `Error Code: ${error.error.status}\nMessage: ${error.error.message}`;
    }
    return throwError(errorMessage);
  }

}
