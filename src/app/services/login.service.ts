import { DataSharingService } from './data-sharing.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, from, throwError } from 'rxjs';
import { UserLogin } from '../models/user';
import { User } from '../models/user';
import { ApiVariables } from '../common/ApiVariables';
import { StorageService } from './storage.service';
import { catchError, map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private loginUrl = ApiVariables.apiUrlUser + '/login/';

  constructor(private http: HttpClient, private storageService: StorageService, private dataSharing: DataSharingService) { }

  login(user: UserLogin): Observable<User> {
    return this.http.get<User>(this.loginUrl + `${user.email}/${user.password}`).pipe(
      tap(data => {
        if (data.role === 'manager') {
          this.storageService.login(data);
          this.dataSharing.setCurrentUser(data);
        } else {
          throwError(new Error('Permiss Denied'));
        }
      }),
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
