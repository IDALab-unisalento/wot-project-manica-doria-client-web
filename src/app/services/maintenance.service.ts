import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Maintenance } from '../models/maintenance';
import { Observable, throwError } from 'rxjs';
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
export class MaintenanceService {

  private getAllMaintenanceByUserUrl = ApiVariables.apiUrlMaintenance + '/getMaintenanceFromUser/';
  private getAllMaintenanceUrl = ApiVariables.apiUrlMaintenance + '/getAll';
  private getMaintenanceByIdUrl = ApiVariables.apiUrlMaintenance + '/getById/';
  private getAllMaintenanceByMachineUrl = ApiVariables.apiUrlMaintenance + '/getAllByMachine/';
  private saveMaintenanceUrl = ApiVariables.apiUrlMaintenance + '/save';
  private deleteMaintenanceUrl = ApiVariables.apiUrlMaintenance + '/delete/';
  private getMaintenanceByStatusAndUserUrl = ApiVariables.apiUrlMaintenance + '/getByStatusAndUser/';
  private getAllByStatusUrl = ApiVariables.apiUrlMaintenance + '/getAllByStatus/';

  constructor(private http: HttpClient) { }

  // TODO: va modificato per mettere l'id dell'utente
  getAllMaintenaceByUser(): Observable<Maintenance[]> {
    return this.http.get<Maintenance[]>(this.getAllMaintenanceByUserUrl + '1')
      .pipe(
        catchError(this.handleError)
      );
  }

  getAllMaintenance(): Observable<Maintenance[]> {
    return this.http.get<Maintenance[]>(this.getAllMaintenanceUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  getMaintenanceById(id: number): Observable<Maintenance> {
    return this.http.get<Maintenance>(this.getMaintenanceByIdUrl + id)
      .pipe(
        catchError(this.handleError)
      );
  }

  getMaintenanceByMachine(id: string): Observable<Maintenance[]> {
    return this.http.get<Maintenance[]>(this.getAllMaintenanceByMachineUrl + id)
      .pipe(
        catchError(this.handleError)
      );
  }

  saveMaintenance(maintenance: Maintenance): Observable<Maintenance> {
    return this.http.post<Maintenance>(this.saveMaintenanceUrl, maintenance, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteMaintenance(id: number): Observable<Maintenance> {
    return this.http.delete<Maintenance>(this.deleteMaintenanceUrl + id)
      .pipe(
        catchError(this.handleError)
      );
  }

  getMaintenanceByStatusAndUser(status: string, id: string): Observable<Maintenance[]> {
    return this.http.get<Maintenance[]>(this.getMaintenanceByStatusAndUserUrl + status + '/' + id)
      .pipe(
        catchError(this.handleError)
      );
  }

  getAllByStatus(status: string): Observable<Maintenance[]> {
    return this.http.get<Maintenance[]>(this.getAllByStatusUrl + status)
      .pipe(
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
