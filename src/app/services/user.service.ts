import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { User } from '../models/user';
import { ApiVariables } from '../common/ApiVariables';
import { catchError } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private getAllUserUrl = ApiVariables.apiUrlUser + '/getAll';
  private getUserByIdUrl = ApiVariables.apiUrlUser + '/getById/';
  private saveUserUrl = ApiVariables.apiUrlUser + '/save';
  private deleteUserUrl = ApiVariables.apiUrlUser + '/delete/';
  private updateUserUrl = ApiVariables.apiUrlUser + '/update';

  constructor(private http: HttpClient) { }

  getAllUser(): Observable<User[]> {
    return this.http.get<User[]>(this.getAllUserUrl).pipe(
      catchError(this.handleError)
    );
  }

  getUserById(id: string): Observable<User> {
    return this.http.get<User>(this.getUserByIdUrl + id).pipe(
      catchError(this.handleError)
    );
  }

  saveUser(user: User): Observable<User> {
    return this.http.post<User>(this.saveUserUrl, user, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  deleteUser(id: string): Observable<User> {
    return this.http.delete<User>(this.deleteUserUrl + id).pipe(
      catchError(this.handleError)
    );
  }

  cambiaPassword(user: User): Observable<User>{
    return this.http.put<User>(this.updateUserUrl, user, httpOptions).pipe(
        catchError(this.handleError)
    );
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.error.status}\nMessage: ${error.error.message}`;
    }
    return throwError(errorMessage);
  }
}
