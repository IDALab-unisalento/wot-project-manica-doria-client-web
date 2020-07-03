import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { UserMaintenance } from '../models/user-maintenance';
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
export class UserMaintenanceService {

  private getAllUMUrl = ApiVariables.apiUrlUserMaintenance + '/getAll';
  private getUMByIdUrl = ApiVariables.apiUrlUserMaintenance + '/getById/';
  private saveUMUrl = ApiVariables.apiUrlUserMaintenance + '/save';
  private deleteUMUrl = ApiVariables.apiUrlUserMaintenance + '/delete/';
  private getAllUMByStatusUrl = ApiVariables.apiUrlUserMaintenance + '/getAllByStatus/';

  constructor(private http: HttpClient) { }

  getAllUM(): Observable<UserMaintenance[]> {
    return this.http.get<UserMaintenance[]>(this.getAllUMUrl).pipe(
      catchError(this.handleError)
    );
  }

  getAllUMByStatus(status: string): Observable<UserMaintenance[]> {
    return this.http.get<UserMaintenance[]>(this.getAllUMByStatusUrl + status).pipe(
      catchError(this.handleError)
    );
  }

  getUMById(id: string): Observable<UserMaintenance> {
    return this.http.get<UserMaintenance>(this.getUMByIdUrl + id).pipe(
      catchError(this.handleError)
    );
  }

  saveUM(userMaintenance: UserMaintenance): Observable<UserMaintenance> {
    return this.http.post<UserMaintenance>(this.saveUMUrl, userMaintenance, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  deleteUM(id: string): Observable<UserMaintenance> {
    return this.http.delete<UserMaintenance>(this.deleteUMUrl + id).pipe(
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
